// Verificação visual local, sem bibliotecas. Requer Node 22+ e Chrome ou Edge.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, mkdtemp, rm } from 'node:fs/promises';
import { dirname, resolve, extname, sep, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';

const root = dirname(fileURLToPath(import.meta.url));
const edge = process.argv.includes('--edge');
const screenshots = !process.argv.includes('--sem-capturas');
const conceptC = process.argv.includes('--conceito-c');
const pages = conceptC ? ['conceito-c'] : ['conforto-construido', 'o-ar-desenha'];
const browserPath = edge
  ? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  : 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const mime = { '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };
const server = createServer(async (req, res) => {
  try {
    const path = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const data = await readFile(path);
    res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const profile = await mkdtemp(join(tmpdir(), 'entrear-prototipos-'));
const browser = spawn(browserPath, [
  '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--disable-background-networking',
  '--disable-sync', '--force-color-profile=srgb', 'about:blank'
], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
let ws;
try {
  const endpoint = await new Promise((resolve, reject) => {
    let output = '';
    const timer = setTimeout(() => reject(new Error('Navegador não iniciou em 20s.')), 20000);
    browser.on('error', reject);
    browser.stderr.on('data', data => {
      output += data;
      const found = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (found) { clearTimeout(timer); resolve(found[1]); }
    });
  });
  ws = new WebSocket(endpoint);
  await new Promise((resolve, reject) => { ws.addEventListener('open', resolve, { once: true }); ws.addEventListener('error', reject, { once: true }); });
  let next = 0;
  const pending = new Map();
  const errors = [];
  ws.addEventListener('message', event => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject, timer } = pending.get(message.id);
      clearTimeout(timer); pending.delete(message.id);
      message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result);
    }
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
    if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) errors.push(`${message.params.response.status} ${message.params.response.url}`);
  });
  const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
    const id = ++next;
    const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 20000);
    pending.set(id, { resolve, reject, timer });
    ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
  });
  const report = { browser: edge ? 'Edge' : 'Chrome', version: await send('Browser.getVersion'), scenarios: [], errors };
  await mkdir(join(root, 'capturas'), { recursive: true });
  for (const page of pages) {
    for (const view of [ { name: 'desktop', width: 1440, height: 900 }, { name: 'mobile', width: 390, height: 844 }, { name: 'estreito', width: 320, height: 740 }, { name: 'tablet', width: 820, height: 1180 }, { name: 'reflow-200-equivalente', width: 720, height: 450 } ]) {
      const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
      const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
      const call = (method, params) => send(method, params, sessionId);
      await call('Page.bringToFront');
      await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
      await call('Emulation.setDeviceMetricsOverride', { width: view.width, height: view.height, deviceScaleFactor: 1, mobile: view.width <= 390 });
      await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
      await call('Page.navigate', { url: `${base}/${page}.html` });
      for (let tries = 0; tries < 100; tries++) {
        const r = await call('Runtime.evaluate', { expression: 'document.readyState', returnByValue: true });
        if (r.result.value === 'complete') break;
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      await call('Runtime.evaluate', { expression: 'document.fonts.ready.then(() => Promise.all([...document.images].map(i => i.decode())))', awaitPromise: true });
      await call('Runtime.evaluate', { expression: 'new Promise(r => requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(r))))', awaitPromise: true });
      const evaluate = async expression => {
        const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
        if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
        return result.result.value;
      };
      const facts = await evaluate(`(() => ({
        title: document.title,
        viewport: innerWidth,
        overflow: document.documentElement.scrollWidth > innerWidth,
        fonts: [...document.fonts].map(f => ({ family: f.family, status: f.status })),
        image: [...document.images].every(i => i.complete && i.naturalWidth > 0),
        headings: document.querySelectorAll('h1').length,
        buttonVisible: document.querySelector('button').getBoundingClientRect().bottom < innerHeight,
        reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
        runningAnimations: document.getAnimations().filter(a => a.playState === 'running').length,
        height: document.documentElement.scrollHeight
      }))()`);
      facts.titleWithinComposition = await evaluate(`(() => {
        const heading = document.querySelector('h1');
        const range = document.createRange(); range.selectNodeContents(heading);
        const text = range.getBoundingClientRect();
        const intro = document.querySelector('.intro');
        return text.left >= 0 && text.right <= (intro ? intro.getBoundingClientRect().right : innerWidth);
      })()`);
      if (screenshots && ['desktop', 'mobile'].includes(view.name)) {
        const { data } = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: view.width, height: Math.max(view.height, facts.height), scale: 1 } });
        await writeFile(join(root, 'capturas', `${page}-${view.name}.png`), Buffer.from(data, 'base64'));
      }
      if (process.argv.includes('--extras') && ['tablet', 'reflow-200-equivalente'].includes(view.name)) {
        const { data } = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: view.width, height: Math.max(view.height, facts.height), scale: 1 } });
        await writeFile(join(tmpdir(), `entrear-${page}-${view.name}.png`), Buffer.from(data, 'base64'));
      }
      await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
      await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
      facts.skipLinkByKeyboard = await evaluate(`document.activeElement.classList.contains('skip')`);
      await evaluate(`document.querySelector('button').focus()`);
      facts.focusVisible = await evaluate(`getComputedStyle(document.activeElement).outlineStyle !== 'none'`);
      await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13, text: '\r' });
      await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
      facts.contactByKeyboard = await evaluate(`document.querySelector('[role="status"]').textContent.includes('Nenhuma mensagem foi enviada')`);
      if (conceptC) {
        facts.contactByKeyboard = await evaluate(`document.querySelector('#mensagem-demo').textContent.includes('Nenhuma mensagem foi enviada')`);
        facts.installationPreview = await evaluate(`document.querySelector('#mensagem-demo').textContent.includes('orçamento de instalação')`);
        const shutterBefore = await evaluate(`getComputedStyle(document.querySelector('.shutter-a')).transform`);
        await evaluate(`document.querySelector('input[name="servico"][value="instalacao"]').focus()`);
        await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 39 });
        await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 39 });
        facts.serviceByKeyboard = await evaluate(`document.querySelector('input[name="servico"]:checked').value === 'manutencao' && document.querySelector('main').dataset.service === 'manutencao'`);
        facts.radioFocusVisible = await evaluate(`getComputedStyle(document.activeElement.closest('.choice')).outlineStyle !== 'none'`);
        facts.summaryMatchesService = await evaluate(`document.querySelector('#service-title').textContent.includes('Cuidar')`);
        facts.previewMatchesService = await evaluate(`document.querySelector('#mensagem-demo').textContent.includes('orçamento de manutenção')`);
        facts.apertureResponds = shutterBefore !== await evaluate(`getComputedStyle(document.querySelector('.shutter-a')).transform`);
        facts.reducedTransitions = await evaluate(`[...document.querySelectorAll('.shutter')].every(s => getComputedStyle(s).transitionDuration === '0s')`);
        facts.choiceTargets = await evaluate(`[...document.querySelectorAll('.choice')].every(l => l.getBoundingClientRect().height >= 44)`);
        facts.overflowAfterService = await evaluate(`document.documentElement.scrollWidth > innerWidth`);
        facts.shareableService = await evaluate(`new URL(location.href).searchParams.get('servico') === 'manutencao'`);
        if (process.argv.includes('--extras') && ['desktop', 'mobile'].includes(view.name)) {
          const height = await evaluate('document.documentElement.scrollHeight');
          const { data } = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: view.width, height: Math.max(view.height, height), scale: 1 } });
          await writeFile(join(tmpdir(), `entrear-conceito-c-${view.name}-manutencao.png`), Buffer.from(data, 'base64'));
        }
      }
      facts.overflowAfterContact = await evaluate(`document.documentElement.scrollWidth > innerWidth`);
      if (view.name === 'desktop') {
        await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
        await call('Page.reload');
        await new Promise(resolve => setTimeout(resolve, 1100));
        facts.finiteMotion = await evaluate(`document.getAnimations().every(a => Number.isFinite(a.effect.getTiming().iterations))`);
        if (conceptC) {
          facts.restoredService = await evaluate(`document.querySelector('main').dataset.service === 'manutencao' && document.querySelector('input[value="manutencao"]').checked`);
          await evaluate(`document.querySelector('input[value="instalacao"]').click()`);
          await new Promise(resolve => setTimeout(resolve, 650));
          await evaluate(`document.querySelector('input[value="manutencao"]').click(); getComputedStyle(document.querySelector('.shutter-a')).transform`);
          facts.normalMotionResponds = await evaluate(`document.getAnimations().some(a => a.playState === 'running')`);
          await new Promise(resolve => setTimeout(resolve, 650));
          facts.normalMotionSettles = await evaluate(`document.getAnimations().every(a => a.playState !== 'running')`);
          facts.alignedApertures = await evaluate(`(() => { const bottoms = [...document.querySelectorAll('.shutter')].map(s => s.getBoundingClientRect().bottom); return Math.max(...bottoms) - Math.min(...bottoms) < 1.5; })()`);
        }
      }
      report.scenarios.push({ page, view: view.name, ...facts });
      await send('Target.closeTarget', { targetId });
    }
  }
  await writeFile(join(root, 'capturas', `verificacao-${conceptC ? 'conceito-c-' : ''}${report.browser.toLowerCase()}.json`), JSON.stringify(report, null, 2) + '\n');
  const failed = report.scenarios.filter(s => s.overflow || s.overflowAfterContact || !s.titleWithinComposition || !s.image || s.headings !== 1 || !s.focusVisible || !s.contactByKeyboard || !s.skipLinkByKeyboard || s.runningAnimations || s.fonts.some(f => f.status !== 'loaded') || (conceptC && (!s.installationPreview || !s.serviceByKeyboard || !s.radioFocusVisible || !s.summaryMatchesService || !s.previewMatchesService || !s.apertureResponds || !s.reducedTransitions || !s.choiceTargets || !s.shareableService || s.overflowAfterService || (s.view === 'desktop' && (!s.restoredService || !s.normalMotionResponds || !s.normalMotionSettles || !s.alignedApertures)))));
  console.log(JSON.stringify({ browser: report.browser, scenarios: report.scenarios.length, failures: failed, errors, screenshots: screenshots ? pages.length * 2 : 0 }, null, 2));
  if (failed.length || errors.length) process.exitCode = 1;
  await send('Browser.close');
} finally {
  ws?.close();
  browser.kill();
  server.close();
  // Perfil efêmero criado acima, sempre dentro do diretório temporário do sistema.
  if (profile.startsWith(resolve(tmpdir()) + sep) && profile.includes('entrear-prototipos-')) {
    for (let tries = 0; tries < 5; tries++) {
      try { await rm(profile, { recursive: true, force: true }); break; }
      catch { await new Promise(resolve => setTimeout(resolve, 200)); }
    }
  }
}
