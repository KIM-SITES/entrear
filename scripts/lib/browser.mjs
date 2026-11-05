// Harness de revisão: servidor estático e Chrome DevTools Protocol, sem dependências.
import { createServer } from 'node:http';
import { access, readFile, mkdtemp, rm } from 'node:fs/promises';
import { resolve, extname, sep, join } from 'node:path';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';

export async function openBrowser(root, edge = false) {
  const output = resolve(root, 'dist');
  const executable = process.env.ENTREAR_BROWSER_PATH || (edge
    ? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
    : 'C:/Program Files/Google/Chrome/Application/chrome.exe');
  await access(executable); await access(join(output, 'index.html'));
  const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.avif': 'image/avif', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
  const server = createServer(async (req, res) => {
    try {
      let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      if (pathname.endsWith('/')) pathname += 'index.html';
      const path = resolve(output, '.' + pathname);
      if (!path.startsWith(output + sep)) { res.writeHead(403).end(); return; }
      const data = await readFile(path);
      res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' }); res.end(data);
    } catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const profile = await mkdtemp(join(tmpdir(), 'entrear-comercial-'));
  const browser = spawn(executable, ['--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check', '--disable-background-networking', '--disable-sync', '--force-color-profile=srgb', 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] });
  let ws;
  async function close() {
    ws?.close(); browser.kill(); server.close();
    const checked = resolve(profile);
    if (checked.startsWith(resolve(tmpdir()) + sep) && checked.includes('entrear-comercial-')) {
      for (let i = 0; i < 10; i++) {
        try { await rm(checked, { recursive: true, force: true }); break; }
        catch { await new Promise(r => setTimeout(r, 200)); }
      }
    }
  }
  try {
    const endpoint = await new Promise((resolve, reject) => {
      let output = '';
      const timer = setTimeout(() => reject(new Error('Navegador não iniciou.')), 20000);
      browser.on('error', error => { clearTimeout(timer); reject(error); });
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
    const errors = [], requests = [];
    ws.addEventListener('message', event => {
      const message = JSON.parse(event.data);
      if (pending.has(message.id)) {
        const { resolve, reject, timer } = pending.get(message.id);
        clearTimeout(timer); pending.delete(message.id);
        message.error ? reject(new Error(JSON.stringify(message.error))) : resolve(message.result);
      }
      if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
      if (message.method === 'Network.responseReceived' && message.params.response.status >= 400) errors.push(`${message.params.response.status} ${message.params.response.url}`);
      if (message.method === 'Network.requestWillBeSent') requests.push({ method: message.params.request.method, url: message.params.request.url });
    });
    const send = (method, params = {}, sessionId) => new Promise((resolve, reject) => {
      const id = ++next;
      const timer = setTimeout(() => { pending.delete(id); reject(new Error(`Timeout: ${method}`)); }, 20000);
      pending.set(id, { resolve, reject, timer });
      ws.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
    async function createPage(view, path = '/', noScript = false) {
      const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
      const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
      const call = (method, params = {}) => send(method, params, sessionId);
      const evaluate = async expression => {
        const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
        if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
        return result.result.value;
      };
      await call('Page.bringToFront'); await call('Page.enable'); await call('Runtime.enable'); await call('Network.enable');
      await call('Emulation.setDeviceMetricsOverride', { width: view.width, height: view.height, deviceScaleFactor: 1, mobile: view.width <= 390 && !view.textScale });
      await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: view.motion ? 'no-preference' : 'reduce' }] });
      if (noScript) await call('Emulation.setScriptExecutionDisabled', { value: true });
      async function navigate(path) {
        await call('Page.navigate', { url: base + path });
        const commercial = path.split(/[?#]/)[0] === '/';
        let ready = false;
        for (let i = 0; i < 150; i++) {
          ready = await evaluate('document.readyState === "complete"') && (noScript || !commercial || await evaluate('document.documentElement.dataset.commercialReady === "true"'));
          if (ready) break;
          await new Promise(r => setTimeout(r, 40));
        }
        if (!ready) throw new Error(`Página não ficou pronta: ${path}`);
        await evaluate('document.querySelectorAll("img").forEach(i => i.loading = "eager")');
        if (noScript) {
          // Callbacks JS ficam suspensos nesta emulação; consulte o DOM sem promessas.
          for (let i = 0; i < 150; i++) {
            if (await evaluate('document.fonts.status === "loaded" && [...document.images].every(i => i.complete && i.naturalWidth > 0)')) break;
            await new Promise(r => setTimeout(r, 40));
          }
        } else {
          await evaluate('document.fonts.ready.then(() => Promise.all([...document.images].map(i => i.decode())))');
          await evaluate('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))');
        }
      }
      await navigate(path);
      if (view.textScale) await evaluate('document.documentElement.style.fontSize = "200%"');
      async function key(key, code, number, text) {
        await call('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: number, ...(text ? { text } : {}) });
        await call('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: number });
      }
      async function click(selector) {
        await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({behavior:'instant',block:'center'})`);
        await evaluate('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))');
        const point = await evaluate(`(() => { const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
        await call('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
        await call('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
        await call('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
      }
      async function waitFor(expression) {
        for (let i=0; i<50; i++) {
          if (await evaluate(expression)) return;
          await new Promise(r=>setTimeout(r,40));
        }
        throw new Error(`Condição não atingida: ${expression}`);
      }
      return { call, evaluate, navigate, key, click, waitFor, close: () => send('Target.closeTarget', { targetId }) };
    }
    return { base, send, createPage, errors, requests, close };
  } catch (error) { await close(); throw error; }
}
