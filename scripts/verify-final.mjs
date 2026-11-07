import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openBrowser } from './lib/browser.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const artifacts=join(root,'docs/validacao/etapa-5');
const edge=process.argv.includes('--edge');
await mkdir(artifacts,{recursive:true});
const report={browser:edge?'Edge':'Chrome',scenarios:[],keyboard:[],limitations:['Auditoria parcial por DOM, árvore de acessibilidade e interação; não equivale a certificação WCAG ou teste com leitor de tela.']};

const factsScript=`(() => {
  const luminance=c=>{const v=c.slice(0,3).map(n=>{n/=255;return n<=.04045?n/12.92:((n+.055)/1.055)**2.4});return v[0]*.2126+v[1]*.7152+v[2]*.0722};
  const rgb=c=>c.match(/[\\d.]+/g).map(Number);
  const ratio=(a,b)=>{const v=[luminance(a),luminance(b)].sort((a,b)=>b-a);return (v[0]+.05)/(v[1]+.05)};
  const background=el=>{for(let node=el;node;node=node.parentElement){const c=rgb(getComputedStyle(node).backgroundColor);if(c.length===3||c[3]===1)return c;}return [238,241,241]};
  const visible=el=>el.getClientRects().length&&getComputedStyle(el).visibility==='visible'&&getComputedStyle(el).display!=='none';
  const contrastFailures=[];let checked=0,min=100;
  for(const el of document.querySelectorAll('body *')){
    if(!visible(el)||!Array.from(el.childNodes).some(n=>n.nodeType===3&&n.textContent.trim()))continue;
    const style=getComputedStyle(el),fg=rgb(style.color),bg=background(el);const value=ratio(fg,bg);
    const large=parseFloat(style.fontSize)>=24||(parseFloat(style.fontSize)>=18.666&&parseInt(style.fontWeight)>=700);
    checked++;min=Math.min(min,value);
    if(value+.01<(large?3:4.5))contrastFailures.push({text:el.textContent.trim().slice(0,65),value,fg,bg});
  }
  const smallTargets=[...document.querySelectorAll('a,button,input,select,textarea,summary')].filter(el=>visible(el)&&!el.disabled).map(el=>{
    const target=el.matches('input[type=radio]')?el.closest('label'):el;
    const r=target.getBoundingClientRect();return {text:(el.textContent||el.id).trim().slice(0,55),width:r.width,height:r.height};
  }).filter(r=>r.width<24||r.height<24);
  const notes=document.querySelector('#quote-notes');
  return {width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,headings:document.querySelectorAll('h1').length,fontsLoaded:document.fonts.status==='loaded',imagesLoaded:[...document.images].every(i=>i.complete&&i.naturalWidth>0),captionMinimum:Math.min(...[...document.querySelectorAll('.photo-credit,main figcaption,.demo-line')].filter(visible).map(el=>parseFloat(getComputedStyle(el).fontSize))),contrast:{checked,min:+min.toFixed(2),failures:contrastFailures,placeholder:+ratio(rgb(getComputedStyle(notes,'::placeholder').color),background(notes)).toFixed(2)},smallTargets,mainWords:document.querySelector('main').innerText.split(/\\s+/).length,pageHeight:document.documentElement.scrollHeight};
})()`;

async function keyboard(page,name){
  await page.call('Page.bringToFront');
  const result={view:name,forward:0,reverse:0,obscured:[],noFocus:[]};
  for(const reverse of [false,true]){
    await page.evaluate(reverse?'document.querySelector(".credits summary").focus()':'document.querySelector(".skip-link").focus()');
    const seen=new Set();
    for(let i=0;i<110;i++){
      for(const type of ['keyDown','keyUp'])await page.call('Input.dispatchKeyEvent',{type,key:'Tab',code:'Tab',windowsVirtualKeyCode:9,modifiers:reverse?8:0});
      const fact=await page.evaluate(`(() => {const el=document.activeElement,r=el.getBoundingClientRect(),header=document.querySelector('[data-site-header]');const owner=el.matches('input[type=radio]')?el.closest('label'):el;return {index:[...document.querySelectorAll('a,button,input,select,textarea,summary')].indexOf(el),text:(el.textContent||el.id||el.tagName).trim().slice(0,65),top:r.top,bottom:r.bottom,insideHeader:header.contains(el)||el.classList.contains('skip-link'),header:getComputedStyle(header).position==='sticky'?header.getBoundingClientRect().bottom:0,outline:getComputedStyle(owner).outlineStyle,tag:el.tagName};})()`);
      if(fact.tag==='BODY')continue;
      if(seen.has(fact.index))break;seen.add(fact.index);
      result[reverse?'reverse':'forward']++;
      if(!fact.insideHeader&&fact.top<fact.header-.5&&fact.bottom>0)result.obscured.push(fact);
      if(fact.outline==='none')result.noFocus.push(fact);
    }
  }
  assert.ok(result.forward>=30&&result.reverse>=30,`${name}: percurso de teclado incompleto`);
  assert.deepEqual(result.obscured,[],`${name}: foco encoberto`);
  assert.deepEqual(result.noFocus,[],`${name}: foco sem contorno`);
  return result;
}

const browser=await openBrowser(root,edge);
try{
  report.version=await browser.send('Browser.getVersion');
  for(const view of [
    {name:'estreito',width:320,height:740},{name:'mobile',width:390,height:844},
    {name:'tablet',width:768,height:1024},{name:'intermediario',width:1024,height:900},
    {name:'desktop',width:1440,height:1000},{name:'amplo',width:1920,height:1080},
    {name:'texto-200',width:390,height:844,textScale:true},
  ]){
    const page=await browser.createPage(view);await page.evaluate('document.documentElement.style.scrollbarWidth="none"');
    const facts=await page.evaluate(factsScript);report.scenarios.push({view:view.name,...facts});
    assert.equal(facts.overflow,false,view.name);assert.equal(facts.headings,1);
    assert.ok(facts.fontsLoaded&&facts.imagesLoaded&&facts.captionMinimum>=13);
    assert.deepEqual(facts.contrast.failures,[],view.name);assert.ok(facts.contrast.placeholder>=4.5);
    assert.deepEqual(facts.smallTargets,[],view.name);
    report.keyboard.push(await keyboard(page,view.name));
    // Espaçamento de texto da referência WCAG 1.4.12, sem cortar conteúdo.
    await page.evaluate(`(() => {const style=document.createElement('style');style.textContent='body *{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}';document.head.append(style);})()`);
    assert.ok(await page.evaluate('document.documentElement.scrollWidth<=innerWidth'),`${view.name}: espaçamento de texto`);
    await page.close();
  }

  const page=await browser.createPage({width:1440,height:1000});
  report.metadata=await page.evaluate(`({title:document.title,description:document.querySelector('meta[name=description]').content,robots:document.querySelector('meta[name=robots]').content,ogTitle:document.querySelector('meta[property="og:title"]').content,hasFabricatedBusinessSchema:!!document.querySelector('script[type="application/ld+json"]'),hasPlaceholderCanonical:!!document.querySelector('link[rel=canonical]')})`);
  assert.equal(report.metadata.robots,'noindex, nofollow');
  assert.equal(report.metadata.ogTitle,report.metadata.title);assert.equal(report.metadata.hasFabricatedBusinessSchema,false);assert.equal(report.metadata.hasPlaceholderCanonical,false);
  const local=await page.evaluate(`[...new Set([...document.querySelectorAll('[href],[src],[srcset]')].flatMap(el=>[el.getAttribute('href'),el.getAttribute('src'),...(el.getAttribute('srcset')||'').split(',').map(v=>v.trim().split(' ')[0])]).filter(Boolean).map(path=>new URL(path,location.href).href).filter(url=>url.startsWith(location.origin))) ]`);
  const responses=await Promise.all(local.map(async url=>({path:new URL(url).pathname,status:(await fetch(url)).status})));
  assert.ok(responses.every(r=>r.status===200));
  report.localFiles={checked:responses.length,failures:responses.filter(r=>r.status!==200)};
  const robots=await fetch(browser.base+'/robots.txt');assert.equal(robots.status,200);assert.ok((await robots.text()).includes('Allow: /'));
  report.robots='Rastreamento permitido para leitura de noindex, nofollow; sem domínio ou sitemap fictício.';
  await page.call('Emulation.setEmulatedMedia',{features:[{name:'forced-colors',value:'active'},{name:'prefers-reduced-motion',value:'reduce'}]});
  await page.evaluate('document.querySelector("#quote-environment").focus()');
  report.forcedColors=await page.evaluate('({active:matchMedia("(forced-colors: active)").matches,outline:getComputedStyle(document.activeElement).outlineStyle,width:getComputedStyle(document.activeElement).outlineWidth})');
  assert.ok(report.forcedColors.active&&report.forcedColors.outline==='solid');
  await page.close();
  assert.deepEqual(browser.errors,[]);assert.ok(browser.requests.every(r=>r.method==='GET'&&r.url.startsWith(browser.base)));
  report.errors=browser.errors;
}finally{await writeFile(join(artifacts,`auditoria-${report.browser.toLowerCase()}.json`),JSON.stringify(report,null,2)+'\n');await browser.close();}

// Zoom de página real no perfil descartável do navegador; não muda o perfil pessoal.
const zoomBrowser=await openBrowser(root,edge);
try{
  const page=await zoomBrowser.createPage({width:1440,height:1000});await page.call('Emulation.clearDeviceMetricsOverride');
  const {targetInfos}=await zoomBrowser.send('Target.getTargets');const target=targetInfos.find(t=>t.url===zoomBrowser.base+'/');
  const {windowId}=await zoomBrowser.send('Browser.getWindowForTarget',{targetId:target.targetId});
  await zoomBrowser.send('Browser.setWindowBounds',{windowId,bounds:{width:1456,height:1151}});
  const settings=await zoomBrowser.createPage({width:900,height:700},'/sistema-visual/');
  await settings.call('Page.navigate',{url:edge?'edge://settings/appearance':'chrome://settings/appearance'});
  await settings.waitFor('typeof chrome!=="undefined" && !!chrome.settingsPrivate?.setDefaultZoom');
  const before=await page.evaluate('({width:innerWidth,dpr:devicePixelRatio})');
  await settings.evaluate('new Promise(resolve=>chrome.settingsPrivate.setDefaultZoom(2,resolve))');
  await page.call('Page.reload');await page.waitFor('document.documentElement.dataset.commercialReady === "true"');await page.evaluate('document.fonts.ready');
  const after=await page.evaluate('({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,overflow:document.documentElement.scrollWidth>innerWidth})');
  assert.ok(Math.abs(before.width/after.width-2)<.02&&Math.abs(after.dpr/before.dpr-2)<.02&&!after.overflow);
  report.zoom200={supported:true,before,after,keyboard:await keyboard(page,'zoom-real-200')};
  if(!edge){const shot=await page.call('Page.captureScreenshot',{format:'png',captureBeyondViewport:false});await writeFile(join(artifacts,'zoom-real-200.png'),Buffer.from(shot.data,'base64'));}
  await settings.evaluate('new Promise(resolve=>chrome.settingsPrivate.setDefaultZoom(1,resolve))');
}catch(error){
  report.zoom200={supported:false,error:String(error)};
  if(!edge)throw error;
  report.limitations.push('Zoom nativo não disponível pela API privada do Edge neste ambiente; reflow e texto ampliado foram verificados separadamente.');
}finally{await zoomBrowser.close();}
report.passed=true;
await writeFile(join(artifacts,`auditoria-${report.browser.toLowerCase()}.json`),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
