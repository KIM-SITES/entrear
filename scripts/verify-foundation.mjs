// Navegador real sobre o build estático. Apenas módulos nativos do Node.
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, mkdtemp, rm, access } from 'node:fs/promises';
import { dirname, resolve, extname, sep, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, 'dist');
const artifacts = resolve(root, 'docs/validacao/etapa-1');
await access(resolve(output, 'index.html'));
const edge = process.argv.includes('--edge');
const browserPath = process.env.ENTREAR_BROWSER_PATH || (edge
  ? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
  : 'C:/Program Files/Google/Chrome/Application/chrome.exe');
await access(browserPath);

const mime = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.avif': 'image/avif', '.webp': 'image/webp',
  '.jpg': 'image/jpeg', '.txt': 'text/plain; charset=utf-8',
};
const server = createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';
    const path = resolve(output, '.' + pathname);
    if (!path.startsWith(output + sep)) { res.writeHead(403).end(); return; }
    const data = await readFile(path);
    res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const profile = await mkdtemp(join(tmpdir(), 'entrear-fundacao-'));
const browser = spawn(browserPath, [
  '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
  '--no-first-run', '--no-default-browser-check', '--disable-background-networking',
  '--disable-sync', '--force-color-profile=srgb', 'about:blank',
], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
let ws;

try {
  const endpoint = await new Promise((resolve, reject) => {
    let output = '';
    const timer = setTimeout(() => reject(new Error('O navegador não iniciou em 20 segundos.')), 20000);
    browser.on('error', error => { clearTimeout(timer); reject(error); });
    browser.stderr.on('data', data => {
      output += data;
      const found = output.match(/DevTools listening on (ws:\/\/[^\s]+)/);
      if (found) { clearTimeout(timer); resolve(found[1]); }
    });
  });
  ws = new WebSocket(endpoint);
  await new Promise((resolve, reject) => {
    ws.addEventListener('open', resolve, { once: true });
    ws.addEventListener('error', reject, { once: true });
  });
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
  await mkdir(artifacts, { recursive: true });
  for (const view of [
    { name: 'desktop', width: 1440, height: 1000 },
    { name: 'mobile', width: 390, height: 844 },
    { name: 'estreito', width: 320, height: 740 },
    { name: 'tablet', width: 820, height: 1180 },
    { name: 'reflow-200-equivalente', width: 720, height: 450 },
    { name: 'texto-200', width: 390, height: 844, textScale: true },
  ]) {
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
    const call = (method, params) => send(method, params, sessionId);
    const evaluate = async expression => {
      const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
      return result.result.value;
    };
    await call('Page.bringToFront');
    await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
    await call('Emulation.setDeviceMetricsOverride', { width: view.width, height: view.height, deviceScaleFactor: 1, mobile: view.width <= 390 && !view.textScale });
    await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    await call('Page.navigate', { url: base });
    for (let tries = 0; tries < 100; tries++) {
      if (await evaluate('document.readyState') === 'complete') break;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    const photosWereLazy = await evaluate('[...document.images].every(i => i.loading === "lazy")');
    // Carrega as fotos abaixo da dobra exclusivamente para as capturas integrais.
    await evaluate('document.querySelectorAll("img").forEach(i => i.loading = "eager"); document.fonts.ready.then(() => Promise.all([...document.images].map(i => i.decode())))');
    if (view.textScale) await evaluate('document.documentElement.style.fontSize = "200%"');
    await evaluate('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))');
    const facts = await evaluate(`(() => ({
      width: innerWidth,
      height: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
      headings: document.querySelectorAll('h1').length,
      imagesLoaded: [...document.images].every(i => i.complete && i.naturalWidth > 0),
      imagesDescribed: [...document.images].every(i => i.hasAttribute('alt') && i.width > 0 && i.height > 0),
      fontsLoaded: [...document.fonts].every(f => f.status === 'loaded'),
      linksHaveTargets: [...document.querySelectorAll('a[href^="#"]')].every(a => document.getElementById(a.hash.slice(1))),
      regions: ['Cotia', 'Itapevi', 'Barueri', 'Jandira'].every(city => document.body.textContent.includes(city)),
      demoVisible: document.body.textContent.includes('Projeto demonstrativo · empresa fictícia'),
      robots: document.querySelector('meta[name="robots"]').content,
      noClientRuntime: document.scripts.length === 0,
      noBusinessForms: document.querySelectorAll('form, input, select, textarea').length === 0,
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      reducedTokens: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--motion-duration-aperture')) === 0,
      animations: document.getAnimations().length,
      enlargedText: getComputedStyle(document.documentElement).fontSize,
      paletteMatchesTokens: [...document.querySelectorAll('[data-color-hex]')].every(s => {
        const hex = s.dataset.colorHex;
        const rgb = [1,3,5].map(i => parseInt(hex.slice(i, i+2), 16));
        return getComputedStyle(s).backgroundColor === 'rgb(' + rgb.join(', ') + ')';
      })
    }))()`);
    facts.photosWereLazy = photosWereLazy;
    facts.correctViewportWidth = facts.width === view.width;
    if (facts.overflow) {
      facts.overflowingElements = await evaluate('[...document.querySelectorAll("body *")].filter(e => e.getBoundingClientRect().right > innerWidth + 1).slice(0,12).map(e => ({tag:e.tagName, class:e.className, right:e.getBoundingClientRect().right}))');
    }
    if (!edge && ['desktop', 'mobile'].includes(view.name)) {
      const viewport = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      await writeFile(join(artifacts, `${view.name}.png`), Buffer.from(viewport.data, 'base64'));
      const full = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: view.width, height: facts.height, scale: 1 } });
      await writeFile(join(artifacts, `${view.name}-completo.png`), Buffer.from(full.data, 'base64'));
    }
    if (!edge && process.argv.includes('--extras')) {
      const { data } = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: view.width, height: facts.height, scale: 1 } });
      await writeFile(join(tmpdir(), `entrear-fundacao-${view.name}.png`), Buffer.from(data, 'base64'));
    }
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 });
    facts.skipByKeyboard = await evaluate('document.activeElement.classList.contains("skip-link")');
    facts.focusVisible = await evaluate('getComputedStyle(document.activeElement).outlineStyle !== "none"');
    await evaluate('document.querySelector("a[href=\\"#cores\\"]").focus()');
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13, text: '\r' });
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
    facts.anchorByKeyboard = await evaluate('location.hash === "#cores" && document.getElementById("cores").getBoundingClientRect().top >= -1');
    report.scenarios.push({ view: view.name, ...facts });
    await send('Target.closeTarget', { targetId });
  }
  report.prototypeRoutesExcluded = (await fetch(`${base}/prototipos/conceito-c.html`)).status === 404;
  const failed = report.scenarios.filter(s => s.overflow || !s.correctViewportWidth || s.headings !== 1 || !s.imagesLoaded || !s.imagesDescribed || !s.fontsLoaded || !s.linksHaveTargets || !s.regions || !s.demoVisible || s.robots !== 'noindex, nofollow' || !s.noClientRuntime || !s.noBusinessForms || !s.reducedMotion || !s.reducedTokens || s.animations || !s.paletteMatchesTokens || !s.skipByKeyboard || !s.focusVisible || !s.anchorByKeyboard || !s.photosWereLazy);
  await writeFile(join(artifacts, `verificacao-${report.browser.toLowerCase()}.json`), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ browser: report.browser, scenarios: report.scenarios.length, failed, errors, prototypeRoutesExcluded: report.prototypeRoutesExcluded }, null, 2));
  if (failed.length || errors.length || !report.prototypeRoutesExcluded) process.exitCode = 1;
  await send('Browser.close');
} finally {
  ws?.close();
  browser.kill();
  server.close();
  const checkedProfile = resolve(profile);
  if (checkedProfile.startsWith(resolve(tmpdir()) + sep) && checkedProfile.includes('entrear-fundacao-')) {
    for (let tries = 0; tries < 5; tries++) {
      try { await rm(checkedProfile, { recursive: true, force: true }); break; }
      catch { await new Promise(resolve => setTimeout(resolve, 200)); }
    }
  }
}
