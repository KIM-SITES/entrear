import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openBrowser } from './lib/browser.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const artifacts = join(root, 'docs/validacao/etapa-4');
const edge = process.argv.includes('--edge');
await mkdir(artifacts, { recursive: true });
const report = { browser: edge ? 'Edge' : 'Chrome', scenarios: [], behavior: {} };
const browser = await openBrowser(root, edge);
const settled = 'document.querySelectorAll(".plane").length === 4 && [...document.querySelectorAll(".plane")].every(el => el.getAnimations().length === 0)';

async function capture(page, name) {
  const clip = await page.evaluate(`(() => {
    document.activeElement?.blur(); scrollTo({top:0,behavior:'instant'});
    return {x:0,y:0,width:innerWidth,height:Math.ceil(document.querySelector('#inicio').getBoundingClientRect().bottom),scale:1};
  })()`);
  const { data } = await page.call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip });
  await writeFile(join(artifacts, name), Buffer.from(data, 'base64'));
}

try {
  report.version = await browser.send('Browser.getVersion');
  for (const view of [
    { name: 'desktop', width: 1440, height: 1160, motion: true },
    { name: 'mobile', width: 390, height: 960, motion: true },
    { name: 'tablet', width: 820, height: 1180, motion: true },
    { name: 'intermediario', width: 1024, height: 1100, motion: true },
    { name: 'estreito', width: 320, height: 960, motion: true },
    { name: 'amplo', width: 1920, height: 1250, motion: true },
    { name: 'texto-200', width: 390, height: 1160, motion: true, textScale: true },
  ]) {
    const page = await browser.createPage(view);
    const e = page.evaluate;
    await page.waitFor('document.querySelector("[data-service-stage]").dataset.ready === "true"');
    // A captura CDP alterna a reserva de 15px da barra no Windows. Normaliza
    // somente a aba de evidência; a página publicada mantém a barra nativa.
    await e('document.documentElement.style.scrollbarWidth = "none"');
    if (!edge) await capture(page, `hero-instalacao-${view.name}.png`);
    const before = await e(`(() => {
      const frame=document.querySelector('[data-aperture]'); const img=frame.querySelector('img');
      const r=img.getBoundingClientRect();
      return {height:document.querySelector('#inicio').offsetHeight, frameHeight:frame.offsetHeight, imageRect:JSON.stringify({x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height}), imageTransform:getComputedStyle(img).transform, imageCount:frame.querySelectorAll('img').length, durations:[...document.querySelectorAll('.plane')].map(el=>getComputedStyle(el).transitionDuration), initialAnimations:document.getAnimations().length};
    })()`);
    assert.equal(before.imageCount, 1); assert.equal(before.imageTransform, 'none');
    assert.deepEqual(before.durations, ['0.42s', '0.42s', '0.56s', '0.56s']);
    assert.equal(before.initialAnimations, 0, 'Hero sem entrada automática');
    const requestsBefore = browser.requests.filter(request => request.url.includes('ambiente-horizontal')).length;
    await e('document.querySelector("[data-service-choice][value=instalacao]").focus()');
    await page.key('ArrowRight', 'ArrowRight', 39);
    const during = await e(`(() => ({state:document.querySelector('[data-service-stage]').dataset.service, form:document.querySelector('#quote-service').value, search:location.search, animations:document.querySelector('.plane').getAnimations().length, matrix:getComputedStyle(document.querySelector('.plane')).transform, height:document.querySelector('#inicio').offsetHeight}))()`);
    assert.equal(during.state, 'manutencao'); assert.equal(during.form, 'manutencao');
    assert.ok(during.search.includes('manutencao')); assert.ok(during.animations > 0);
    assert.equal(during.height, before.height, `${view.name}: seleção deslocou o layout`);
    if (!edge && ['desktop', 'mobile'].includes(view.name)) {
      await e('new Promise(r=>setTimeout(r,120))');
      await capture(page, `hero-passagem-${view.name}.png`);
    }
    await page.waitFor(settled);
    const after = await e(`(() => { const r=document.querySelector('[data-aperture] img').getBoundingClientRect();return {height:document.querySelector('#inicio').offsetHeight, imageRect:JSON.stringify({x:r.x+scrollX,y:r.y+scrollY,width:r.width,height:r.height}), scales:[...document.querySelectorAll('.plane')].map(el=>new DOMMatrixReadOnly(getComputedStyle(el).transform).m22), overflow:document.documentElement.scrollWidth>innerWidth};})()`);
    assert.equal(after.height, before.height); assert.equal(after.imageRect, before.imageRect);
    assert.deepEqual(after.scales, [0,0,0,0]); assert.equal(after.overflow, false);
    assert.equal(browser.requests.filter(request => request.url.includes('ambiente-horizontal')).length, requestsBefore, 'Trocar serviço não baixa outra imagem do hero');
    if (!edge) await capture(page, `hero-manutencao-${view.name}.png`);

    // Reversão sem aguardar o primeiro movimento: o CSS parte do estado interpolado.
    const rapid = await e(`(async () => {
      const samples=[];
      for(let i=0;i<8;i++) {
        const input=document.querySelector('[data-service-choice][value='+ (i%2?'manutencao':'instalacao') +']');
        const plane=document.querySelector('.plane');
        const previous=new DOMMatrixReadOnly(getComputedStyle(plane).transform).m22;
        input.checked=true;input.dispatchEvent(new Event('change',{bubbles:true}));
        const next=new DOMMatrixReadOnly(getComputedStyle(plane).transform).m22;
        samples.push({previous,next,service:input.value});
        await new Promise(r=>setTimeout(r,65));
      }
      return samples;
    })()`);
    assert.ok(rapid.every(s=>Math.abs(s.previous-s.next)<.04), 'Reversão não deve saltar para um extremo');
    await page.waitFor(settled);
    assert.ok(await e('document.querySelector("#quote-service").value === "manutencao" && document.querySelector("[data-service-choice][value=manutencao]").checked && location.search.includes("manutencao")'));
    report.scenarios.push({ view:view.name, width:view.width, frameHeight:before.frameHeight, durations:before.durations, oneStationaryImage:true, noLayoutMovement:true, noExtraHeroRequests:true, rapidReversals:rapid.length, noOverflow:!after.overflow });
    await page.close();
  }

  const page = await browser.createPage({width:1440,height:1160,motion:true});
  const e = page.evaluate;
  await e('document.querySelector("[data-service-choice][value=manutencao]").click()');
  await page.call('Emulation.setDeviceMetricsOverride',{width:390,height:960,deviceScaleFactor:1,mobile:true});
  await page.waitFor(settled);
  assert.ok(await e('document.querySelector("#quote-service").value === "manutencao" && document.documentElement.scrollWidth === innerWidth'));
  await e('document.querySelector("[data-service-choice][value=instalacao]").click()');
  await page.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await page.waitFor(settled);
  assert.ok(await e('[...document.querySelectorAll(".plane")].every(el=>getComputedStyle(el).transitionDuration === "0s" && new DOMMatrixReadOnly(getComputedStyle(el).transform).m22 === 1)'));
  report.behavior.interruption = 'Reversões rápidas, resize durante a abertura e ativação de movimento reduzido no meio da transição aprovados';

  await page.click('[data-menu-toggle]');
  assert.equal(await e('document.querySelector("[data-navigation]").getAnimations().length'),0);
  await page.key('Escape','Escape',27);
  assert.ok(await e('document.querySelector("[data-navigation]").hidden && document.activeElement.matches("[data-menu-toggle]")'));
  await page.call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await page.click('[data-menu-toggle]');
  assert.ok(await e('!document.querySelector("[data-navigation]").hidden && document.querySelector("[data-navigation]").getAnimations().length === 1'));
  await page.key('Escape','Escape',27);
  assert.ok(await e('document.querySelector("[data-navigation]").hidden && document.querySelector("[data-navigation]").getAnimations().length === 0'));
  await page.click('[data-menu-toggle]');
  await page.click('[data-navigation] a[href="#aplicacoes"]');
  await page.waitFor('document.querySelector("[data-navigation] a[href=\\"#aplicacoes\\"]").getAttribute("aria-current") === "location"');
  assert.ok(await e('document.activeElement.id === "aplicacoes" && location.search.includes("instalacao") && document.querySelector("[data-navigation]").hidden'));
  report.behavior.navigation = 'Estado atual por observação da seção; URL preservada; menu disponível imediatamente, animação cancelada por Escape, foco no destino';

  await page.click('#duvidas summary');
  const faq = await e('(() => { const el=document.querySelector("#duvidas details > p"); return {open:el.parentElement.open,opacity:+getComputedStyle(el).opacity,height:el.offsetHeight,animations:el.getAnimations().length}; })()');
  assert.ok(faq.open && faq.opacity >= .92 && faq.animations === 1);
  await page.waitFor('document.querySelector("#duvidas details > p").getAnimations().length === 0');
  assert.equal(await e('document.querySelector("#duvidas details > p").offsetHeight'),faq.height);
  await page.close();
  report.behavior.faq = 'Resposta disponível desde a abertura, feedback de 220 ms sem animar altura; teclado e fallback cobertos pela regressão editorial';

  const reduced = await browser.createPage({width:390,height:960});
  await reduced.click('#duvidas summary');
  assert.equal(await reduced.evaluate('document.querySelector("#duvidas details > p").getAnimations().length'),0);
  await reduced.evaluate('document.querySelector("[data-service-choice][value=manutencao]").click()');
  assert.ok(await reduced.evaluate('[...document.querySelectorAll(".plane")].every(el=>el.getAnimations().length === 0 && new DOMMatrixReadOnly(getComputedStyle(el).transform).m22 === 0)'));
  if (!edge) await capture(reduced,'hero-manutencao-movimento-reduzido.png');
  await reduced.close();
  const noScript = await browser.createPage({width:390,height:960,motion:true},'/',true);
  assert.ok(await noScript.evaluate('document.querySelector("[data-service-fields]").disabled && document.querySelector("[data-aperture] img").naturalWidth > 0 && document.getAnimations().length === 0'));
  await noScript.close();
  report.behavior.fallback = 'Movimento reduzido sem animações; hero e conteúdo disponíveis sem JavaScript';
  assert.deepEqual(browser.errors,[]);
  report.errors=browser.errors;
  report.passed=true;
} finally {
  await writeFile(join(artifacts,`motion-${report.browser.toLowerCase()}.json`),JSON.stringify(report,null,2)+'\n');
  await browser.close();
}
console.log(JSON.stringify(report,null,2));
