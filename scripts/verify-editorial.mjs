import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openBrowser } from './lib/browser.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const artifacts = join(root, 'docs/validacao/etapa-4/editorial');
const edge = process.argv.includes('--edge');
await mkdir(artifacts, { recursive: true });
const report = { browser: edge ? 'Edge' : 'Chrome', scenarios: [], behavior: {} };
const protectedFiles = JSON.parse(await readFile(join(root, 'docs/referencias/etapa-3.sha256.json'), 'utf8'));
for (const [path, hash] of Object.entries(protectedFiles)) {
  assert.equal(createHash('sha256').update(await readFile(join(root, path))).digest('hex'), hash, `Regressão dos conteúdos aprovados: ${path}`);
}
report.preservedFiles = Object.keys(protectedFiles).length;
const browser = await openBrowser(root, edge);
const sectionIds = ['inicio', 'servicos', 'aplicacoes', 'entrear', 'atendimento', 'regiao', 'duvidas', 'orcamento'];

async function capture(page, name, selector) {
  const bounds = await page.evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    const header = document.querySelector('[data-site-header]');
    const offset = getComputedStyle(header).position === 'sticky' && !el.matches('footer') ? header.offsetHeight : 0;
    const top = Math.max(0, el.getBoundingClientRect().top + scrollY - offset);
    scrollTo({top, behavior: 'instant'});
    document.activeElement?.blur();
    return {x: 0, y: top, width: innerWidth, height: Math.min(el.getBoundingClientRect().height + offset, document.documentElement.scrollHeight - top), scale: 1};
  })()`);
  await page.evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
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
    { name: 'limite-menu', width: 1024, height: 900 },
    { name: 'texto-200', width: 390, height: 844, textScale: true },
  ]) {
    const page = await browser.createPage(view);
    const e = page.evaluate;
    const facts = await e(`(() => ({
      width: innerWidth,
      height: document.documentElement.scrollHeight,
      overflow: document.documentElement.scrollWidth > innerWidth,
      uniqueIds: new Set([...document.querySelectorAll('[id]')].map(el => el.id)).size === document.querySelectorAll('[id]').length,
      sectionOrder: [...document.querySelectorAll('[data-commercial] > section')].map(el => el.id),
      applicationCount: document.querySelectorAll('#aplicacoes article').length,
      applicationPhotos: [...document.querySelectorAll('#aplicacoes figure')].every(el => el.querySelector('figcaption').textContent.includes('Não é um projeto da Entrear') && el.querySelector('a').href.startsWith('https://')),
      processSteps: document.querySelectorAll('#atendimento ol > li').length,
      coverage: [...document.querySelectorAll('#regiao li')].map(el => el.firstChild.textContent),
      faqCount: document.querySelectorAll('#duvidas details').length,
      allPhotosLoaded: [...document.images].every(el => el.complete && el.naturalWidth > 0),
      inverseFocus: getComputedStyle(document.querySelector('.site-footer')).getPropertyValue('--focus-color').trim(),
      animatedEditorial: [...document.querySelectorAll('.applications *, .about *, .process *, .coverage *, .faq *, .site-footer *')].some(el => getComputedStyle(el).animationName !== 'none'),
      fonts: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family)
    }))()`);
    report.scenarios.push({ view: view.name, ...facts });
    assert.equal(facts.overflow, false, view.name);
    assert.ok(facts.uniqueIds && facts.applicationPhotos && facts.allPhotosLoaded);
    assert.deepEqual(facts.sectionOrder, sectionIds);
    assert.equal(facts.applicationCount, 3); assert.equal(facts.processSteps, 4); assert.equal(facts.faqCount, 7);
    assert.deepEqual(facts.coverage, ['Cotia', 'Itapevi', 'Barueri', 'Jandira']);
    assert.equal(facts.animatedEditorial, false);

    // Interação nativa, incluindo duas respostas abertas e foco com Tab.
    await e('document.querySelector("#duvidas summary").focus()');
    await page.key('Enter', 'Enter', 13, '\r');
    assert.ok(await e('document.querySelector("#duvidas details").open'));
    assert.ok(await e('getComputedStyle(document.activeElement).outlineStyle === "solid"'));
    const focus = await e('(() => { const r=document.activeElement.getBoundingClientRect(); const h=document.querySelector("[data-site-header]"); return {top:r.top, bottom:r.bottom, header:getComputedStyle(h).position === "sticky" ? h.getBoundingClientRect().bottom : 0}; })()');
    assert.ok(focus.top >= focus.header && focus.bottom <= view.height, `${view.name}: foco obstruído`);
    await page.key('Tab', 'Tab', 9);
    assert.ok(await e('document.activeElement === document.querySelectorAll("#duvidas summary")[1]'));
    await page.key(' ', 'Space', 32, ' ');
    assert.ok(await e('[...document.querySelectorAll("#duvidas details")].filter(el => el.open).length === 2'));
    await page.key(' ', 'Space', 32, ' ');
    assert.ok(await e('!document.querySelectorAll("#duvidas details")[1].open'));
    await e('document.querySelector("#duvidas details").open = false');

    if (!edge && ['desktop', 'mobile'].includes(view.name)) {
      await e('document.activeElement?.blur(); scrollTo({top:0,behavior:"instant"})');
      await e('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
      const full = await page.call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: 0, width: view.width, height: facts.height, scale: 1 } });
      await writeFile(join(artifacts, `${view.name}-completo.png`), Buffer.from(full.data, 'base64'));
      for (const id of ['inicio', 'servicos', 'aplicacoes', 'entrear', 'atendimento', 'regiao', 'duvidas', 'orcamento']) await capture(page, `${id}-${view.name}.png`, `#${id}`);
      await capture(page, `rodape-${view.name}.png`, '.site-footer');
      await e('document.querySelector("#duvidas details").open = true');
      await capture(page, `duvidas-abertas-${view.name}.png`, '#duvidas');
    }
    await page.close();
  }
  report.behavior.faq = 'Enter, Espaço, Tab, foco visível, respostas simultâneas e ausência de obstrução aprovados nos seis cenários';

  const page = await browser.createPage({ width: 1440, height: 1000 }, '/?servico=manutencao');
  const e = page.evaluate;
  // Cada destino permanece navegável com o estado comercial e o rascunho presentes.
  await e(`for (const [id,value] of [['quote-environment','residencia'],['quote-city','jandira'],['quote-notes','Ambiente de demonstração.']]) { const el=document.getElementById(id); el.value=value; el.dispatchEvent(new Event(id==='quote-notes'?'input':'change',{bubbles:true})); }`);
  await page.click('button[type=submit]');
  const message = await e('document.querySelector("[data-message-output]").value');
  for (const id of sectionIds) {
    const selector = id === 'servicos' ? null : `.site-footer a[href="#${id}"]`;
    if (!selector) continue;
    await page.click(selector);
    assert.equal(await e('location.hash'), `#${id}`);
    const destination = await e(`(() => { const target=document.getElementById('${id}'); const header=document.querySelector('[data-site-header]'); return {top:target.getBoundingClientRect().top, header:header.getBoundingClientRect().bottom}; })()`);
    assert.ok(destination.top >= destination.header - 1, `${id}: âncora sob cabeçalho`);
    assert.equal(await e('document.querySelector("#quote-service").value'), 'manutencao');
    assert.equal(await e('document.querySelector("[data-message-output]").value'), message);
    assert.ok(await e('location.search === "?servico=manutencao"'));
  }
  await page.click('.credits summary');
  assert.ok(await e('document.querySelector(".credits").open'));
  for (const font of ['archivo', 'instrument-sans']) assert.equal((await fetch(`${browser.base}/fonts/licenses/${font}-OFL.txt`)).status, 200);
  const ax = await page.call('Accessibility.getFullAXTree');
  report.accessibility = ax.nodes.filter(n => !n.ignored && ['navigation', 'main', 'contentinfo'].includes(n.role?.value)).map(n => ({role: n.role.value, name: n.name?.value}));
  assert.equal(report.accessibility.filter(n => n.role === 'navigation').length, 3);
  assert.equal(report.accessibility.filter(n => n.role === 'main').length, 1);
  report.behavior.anchors = 'Destinos do rodapé sem sobreposição; serviço, URL, rascunho e mensagem preservados durante a navegação';
  await page.close();

  const mobile = await browser.createPage({ width: 390, height: 844 }, '/?servico=manutencao');
  await mobile.click('[data-menu-toggle]');
  await mobile.click('[data-navigation] a[href="#atendimento"]');
  assert.ok(await mobile.evaluate('location.hash === "#atendimento" && location.search === "?servico=manutencao" && document.querySelector("[data-navigation]").hidden && document.activeElement.id === "atendimento"'));
  await mobile.key('Tab', 'Tab', 9);
  assert.ok(await mobile.evaluate('document.activeElement.matches("#atendimento a")'));
  report.behavior.mobile = 'Menu ampliado fecha ao navegar, transfere foco ao destino e mantém serviço e URL; Tab continua a partir da seção';
  await mobile.close();

  const noScript = await browser.createPage({ width: 390, height: 844 }, '/', true);
  // A emulação sem JS suspende callbacks; clique CDP sem a espera de rAF do helper.
  const point = await noScript.evaluate('(() => { const el=document.querySelector("#duvidas summary"); el.scrollIntoView({behavior:"instant",block:"center"}); const r=el.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()');
  await noScript.call('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
  await noScript.call('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
  assert.ok(await noScript.evaluate('document.querySelector("#duvidas details").open && !document.querySelector("[data-navigation]").hidden && document.querySelector("[data-quote-fields]").disabled'));
  report.behavior.noJavaScript = 'Dúvidas nativas e navegação funcionam; orçamento mantém fallback e campos desabilitados';
  await noScript.close();
  assert.deepEqual(browser.errors, []);
  assert.ok(browser.requests.every(r => r.method === 'GET' && r.url.startsWith(browser.base)));
  report.requests = { total: browser.requests.length, external: 0, nonGet: 0 };
  report.errors = browser.errors;
  report.passed = true;
} finally {
  await writeFile(join(artifacts, `verificacao-${report.browser.toLowerCase()}.json`), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
}
console.log(JSON.stringify(report, null, 2));
