import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { openBrowser } from './lib/browser.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const artifacts = join(root, 'docs/validacao/etapa-4/comercial');
const edge = process.argv.includes('--edge');
await mkdir(artifacts, { recursive: true });
const report = { browser: edge ? 'Edge' : 'Chrome', scenarios: [], behavior: {} };
const protectedFiles = JSON.parse(await readFile(join(root, 'docs/referencias/etapa-1.sha256.json'), 'utf8'));
for (const [path, hash] of Object.entries(protectedFiles)) assert.equal(createHash('sha256').update(await readFile(join(root, path))).digest('hex'), hash, `Arquivo da etapa 1 alterado: ${path}`);
report.preservedFiles = Object.keys(protectedFiles).length;
const browser = await openBrowser(root, edge);
async function captureQuote(page, name) {
  const bounds = await page.evaluate(`(() => {
    const section=document.querySelector('#orcamento');
    const offset=0;
    scrollTo({top:section.getBoundingClientRect().top+scrollY-offset,behavior:'instant'});
    return {x:0,y:scrollY,width:innerWidth,height:section.getBoundingClientRect().height+offset,scale:1};
  })()`);
  const shot = await page.call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: bounds });
  await writeFile(join(artifacts, name), Buffer.from(shot.data, 'base64'));
}
try {
  report.version = await browser.send('Browser.getVersion');
  for (const view of [
    { name: 'desktop', width: 1440, height: 1000 },
    { name: 'mobile', width: 390, height: 844 },
    { name: 'estreito', width: 320, height: 740 },
    { name: 'tablet', width: 820, height: 1180 },
    { name: 'amplo', width: 1920, height: 1080 },
    { name: 'texto-200', width: 390, height: 844, textScale: true },
  ]) {
    const page = await browser.createPage(view);
    const facts = await page.evaluate(`(() => ({
      width: innerWidth, height: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
      headings: document.querySelectorAll('h1').length,
      imagesLoaded: [...document.images].every(i => i.complete && i.naturalWidth > 0),
      imagesDescribed: [...document.images].every(i => i.alt && i.hasAttribute('width') && i.hasAttribute('height')),
      fontsLoaded: [...document.fonts].every(f => f.status === 'loaded'),
      linksValid: [...document.querySelectorAll('a')].every(a => !a.hash || new URL(a.href).origin !== location.origin || document.getElementById(a.hash.slice(1))),
      fieldsEnabled: !document.querySelector('[data-quote-fields]').disabled,
      editorialIntegrated: ['aplicacoes','entrear','atendimento','regiao','duvidas'].every(id => document.getElementById(id)),
      demoVisible: document.body.textContent.includes('Projeto demonstrativo · empresa fictícia'),
      robots: document.querySelector('meta[name=robots]').content,
      reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
      transitionDuration: getComputedStyle(document.querySelector('.plane')).transitionDuration,
      enlargedText: getComputedStyle(document.documentElement).fontSize
    }))()`);
    report.scenarios.push({ view: view.name, ...facts });
    if (facts.overflow) console.log(await page.evaluate('[...document.querySelectorAll("body *")].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>({tag:e.tagName,class:e.className,right:e.getBoundingClientRect().right})).slice(0,15)'));
    assert.equal(facts.width, view.width, view.name);
    assert.equal(facts.overflow, false, view.name);
    assert.equal(facts.headings, 1);
    for (const field of ['imagesLoaded', 'imagesDescribed', 'fontsLoaded', 'linksValid', 'fieldsEnabled', 'editorialIntegrated', 'demoVisible', 'reducedMotion']) assert.ok(facts[field], `${view.name}: ${field}`);
    assert.equal(facts.transitionDuration, '0s');
    assert.equal(facts.robots, 'noindex, nofollow');
    if (!edge && ['desktop', 'mobile'].includes(view.name)) {
      await page.evaluate('scrollTo({top:0,behavior:"instant"})');
      const shot = await page.call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
      await writeFile(join(artifacts, `${view.name}.png`), Buffer.from(shot.data, 'base64'));
      const full = await page.call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: view.width, height: facts.height, scale: 1 } });
      await writeFile(join(artifacts, `${view.name}-completo.png`), Buffer.from(full.data, 'base64'));
    }
    if (!edge && process.argv.includes('--extras')) {
      const shot = await page.call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: view.width, height: Math.min(facts.height, view.height * 2), scale: 1 } });
      await writeFile(join(tmpdir(), `entrear-etapa-2-${view.name}.png`), Buffer.from(shot.data, 'base64'));
    }
    await page.key('Tab', 'Tab', 9);
    assert.ok(await page.evaluate('document.activeElement.classList.contains("skip-link")'));
    assert.ok(await page.evaluate('getComputedStyle(document.activeElement).outlineStyle !== "none"'));
    await page.key('Enter', 'Enter', 13, '\r');
    assert.ok(await page.evaluate('document.activeElement.id === "conteudo"'));
    if (view.name === 'mobile') {
      await page.click('[data-menu-toggle]');
      assert.ok(await page.evaluate('!document.querySelector("[data-navigation]").hidden && document.querySelector("[data-menu-toggle]").getAttribute("aria-expanded") === "true"'));
      await page.key('Escape', 'Escape', 27);
      assert.ok(await page.evaluate('document.querySelector("[data-navigation]").hidden && document.activeElement.matches("[data-menu-toggle]")'));
      await page.click('[data-menu-toggle]'); await page.click('[data-navigation] a');
      assert.ok(await page.evaluate('document.querySelector("[data-navigation]").hidden && location.hash === "#instalacao"'));
      await page.call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
      await page.evaluate('new Promise(r=>setTimeout(r,100))');
      assert.ok(await page.evaluate('!document.querySelector("[data-navigation]").hidden'));
      report.behavior.mobileNavigation = 'abertura, Escape, retorno de foco, âncora e resize aprovados';
      await page.call('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
      await page.evaluate(`(() => { for (const [id,value] of [['quote-environment','residencia'],['quote-city','cotia']]) { const el=document.getElementById(id); el.value=value; el.dispatchEvent(new Event('change',{bubbles:true})); } })()`);
      await page.click('button[type=submit]');
      assert.ok(await page.evaluate('!document.querySelector("[data-message-preview]").hidden && document.activeElement.id === "mensagem-titulo"'));
      if (!edge) await captureQuote(page, 'orcamento-mobile.png');
    }
    await page.close();
  }
  const page = await browser.createPage({ width: 1440, height: 1000, motion: true });
  const e = page.evaluate;
  await e('document.querySelector("[data-service-choice][value=instalacao]").focus()');
  await page.key('ArrowRight', 'ArrowRight', 39);
  assert.ok(await e('document.querySelector("[data-service-stage]").dataset.service === "manutencao" && document.querySelector("#quote-service").value === "manutencao" && location.search.includes("manutencao")'));
  assert.equal(await e('getComputedStyle(document.querySelector(".plane")).transitionDuration'), '0.42s');
  await page.waitFor('document.getAnimations().length === 0');
  assert.equal(await e('document.getAnimations().length'), 0);
  await page.click('[data-service-link=instalacao]');
  assert.ok(await e('document.activeElement.id === "orcamento" && document.querySelector("#quote-service").value === "instalacao" && location.hash === "#orcamento"'));
  await e('history.back()');
  await e('new Promise(r=>setTimeout(r,150))');
  assert.equal(await e('location.hash'), '');
  await e('history.forward()');
  await e('new Promise(r=>setTimeout(r,150))');
  assert.equal(await e('location.hash'), '#orcamento');
  // Foco e submissão por teclado, sem chamadas a form.submit().
  await e('document.querySelector("button[type=submit]").focus()'); await page.key('Enter', 'Enter', 13, '\r');
  assert.ok(await e('document.activeElement.id === "quote-environment" && document.querySelector("#quote-environment").getAttribute("aria-invalid") === "true" && document.querySelector("#quote-city").getAttribute("aria-invalid") === "true" && document.querySelector("[data-message-preview]").hidden'));
  assert.ok(await e('getComputedStyle(document.activeElement).outlineWidth === "3px" && getComputedStyle(document.activeElement).outlineOffset === "5px"'), 'Campo inválido mantém o foco de teclado visível');
  await e(`(() => { for (const [id,value] of [['quote-environment','pequeno-negocio'],['quote-city','barueri'],['quote-notes','Sala de exemplo, aparelho instalado.']]) { const el=document.getElementById(id); el.value=value; el.dispatchEvent(new Event(id==='quote-notes'?'input':'change',{bubbles:true})); } })()`);
  await page.click('button[type=submit]');
  assert.ok(await e('!document.querySelector("[data-message-preview]").hidden && document.activeElement.id === "mensagem-titulo" && document.querySelector("[data-message-output]").value.includes("Barueri") && document.querySelector("[data-message-output]").value.includes("Sala de exemplo")'));
  await e('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async text=>{window.__copied=text}}})');
  await page.click('[data-copy-message]');
  await page.waitFor('document.querySelector("[data-quote-status]").textContent.includes("Mensagem copiada")');
  assert.ok(await e('window.__copied === document.querySelector("[data-message-output]").value && document.querySelector("[data-quote-status]").textContent.includes("Mensagem copiada")'));
  await e('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async()=>{throw new Error("Negado no teste")}}})');
  await page.click('[data-copy-message]');
  await page.waitFor('document.querySelector("[data-quote-status]").textContent.includes("manualmente")');
  assert.ok(await e('document.activeElement.matches("[data-message-output]") && document.activeElement.selectionEnd === document.activeElement.value.length && document.querySelector("[data-quote-status]").textContent.includes("manualmente")'));
  await e('const s=document.querySelector("#quote-service");s.value="manutencao";s.dispatchEvent(new Event("change",{bubbles:true}))');
  assert.ok(await e('document.querySelector("[data-message-output]").value.includes("manutenção") && document.querySelector("[data-service-choice][value=manutencao]").checked'));
  if (!edge) await captureQuote(page, 'orcamento-desktop.png');
  await e('document.querySelector("#quote-notes").value="Novo exemplo";document.querySelector("#quote-notes").dispatchEvent(new Event("input",{bubbles:true}))');
  assert.ok(await e('document.querySelector("[data-message-preview]").hidden && !document.querySelector("[data-message-output]").value'));
  assert.ok(await e('localStorage.length === 0 && sessionStorage.length === 0 && !document.cookie && !location.href.includes("exemplo")'));
  // Uma nova navegação de documento, mantendo apenas o serviço público na URL.
  await page.navigate('/?servico=manutencao&revisao=reload#orcamento');
  assert.ok(await e('document.querySelector("#quote-service").value === "manutencao" && !document.querySelector("#quote-notes").value && !document.querySelector("#quote-city").value && document.querySelector("[data-message-preview]").hidden'));
  await page.navigate('/?servico=invalido');
  assert.equal(await e('document.querySelector("#quote-service").value'), 'instalacao');
  report.behavior.quote = 'validação, foco, geração, cópia simulada, cópia negada, edição, URL e descarte aprovados';
  report.behavior.motion = 'planos de 420/560 ms por escolha, interrompíveis, sem loop; movimento reduzido sem transição';
  await page.close();
  const noScript = await browser.createPage({ width: 390, height: 844 }, '/', true);
  assert.ok(await noScript.evaluate('document.querySelector("[data-quote-fields]").disabled && document.querySelector("[data-service-fields]").disabled && !document.querySelector("[data-quote-fallback]").hidden && !document.querySelector("[data-navigation]").hidden'));
  report.behavior.noJavaScript = 'conteúdo e navegação acessíveis; formulário desabilitado com explicação';
  await noScript.close();
  assert.equal((await fetch(browser.base + '/sistema-visual/')).status, 200);
  assert.equal((await fetch(browser.base + '/prototipos/conceito-c.html')).status, 404);
  assert.ok(browser.requests.every(r => r.method === 'GET' && r.url.startsWith(browser.base)));
  assert.deepEqual(browser.errors, []);
  report.requests = { total: browser.requests.length, external: 0, nonGet: 0 };
  report.errors = browser.errors;
  report.passed = true;
} finally {
  await writeFile(join(artifacts, `verificacao-${report.browser.toLowerCase()}.json`), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
