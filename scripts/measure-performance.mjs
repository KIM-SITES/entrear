// Medições de navegação reais e locais via PerformanceObserver; não são Lighthouse.
import { mkdir, writeFile, readFile, readdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { dirname,join,resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openBrowser } from './lib/browser.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const artifacts=join(root,'docs/validacao/etapa-5');await mkdir(artifacts,{recursive:true});
const report={tool:'Chrome DevTools Protocol + PerformanceObserver',lighthouse:{available:false,reason:'CLI e módulo não encontrados no projeto, PATH ou cache npx; não instalados.'},conditions:{origin:'localhost HTTP, servidor estático sem gzip',cache:'desabilitado e limpo em cada execução',samples:3,windowMs:6500,production:false},runs:[],bundles:[]};
for(const profile of [{name:'desktop',width:1440,height:1000,cpu:1,latency:0,download:-1,upload:-1},{name:'mobile-simulado',width:390,height:844,cpu:4,latency:150,download:209715,upload:96000}]){
 for(let sample=1;sample<=3;sample++){
  const browser=await openBrowser(root);
  try{
   report.version=await browser.send('Browser.getVersion');
   const page=await browser.createPage(profile,'/robots.txt');
   const {targetInfos}=await browser.send('Target.getTargets');
   const target=targetInfos.find(target=>target.url===browser.base+'/robots.txt');
   const {windowId}=await browser.send('Browser.getWindowForTarget',{targetId:target.targetId});
   await browser.send('Browser.setWindowBounds',{windowId,bounds:{width:Math.max(800,profile.width+100),height:profile.height+200}});
   await page.evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
   await page.call('Network.setCacheDisabled',{cacheDisabled:true});await page.call('Network.clearBrowserCache');
   await page.call('Emulation.setCPUThrottlingRate',{rate:profile.cpu});
   await page.call('Network.emulateNetworkConditions',{offline:false,latency:profile.latency,downloadThroughput:profile.download,uploadThroughput:profile.upload,connectionType:profile.latency?'cellular4g':'ethernet'});
   await page.call('Page.addScriptToEvaluateOnNewDocument',{source:`window.__metrics={lcp:[],shifts:[],longTasks:[]};for(const type of ['largest-contentful-paint','layout-shift','longtask'])new PerformanceObserver(list=>{for(const entry of list.getEntries()){if(type==='largest-contentful-paint')window.__metrics.lcp.push({time:entry.startTime,size:entry.size,element:entry.element?.tagName,url:entry.url});if(type==='layout-shift'&&!entry.hadRecentInput)window.__metrics.shifts.push({time:entry.startTime,value:entry.value});if(type==='longtask')window.__metrics.longTasks.push({time:entry.startTime,duration:entry.duration})}}).observe({type,buffered:true});`});
   const errorStart=browser.errors.length;
   await page.call('Page.navigate',{url:browser.base+'/'});
   await new Promise(resolve=>setTimeout(resolve,6500));
   const facts=await page.evaluate(`(() => {
    const m=window.__metrics,paints=performance.getEntriesByType('paint'),nav=performance.getEntriesByType('navigation')[0];let cls=0,sum=0,start=0,last=0;
    for(const shift of m.shifts){if(shift.time-last>1000||shift.time-start>5000){sum=0;start=shift.time;}sum+=shift.value;last=shift.time;cls=Math.max(cls,sum);}
    return {ready:document.documentElement.dataset.commercialReady==='true',fcp:paints.find(e=>e.name==='first-contentful-paint')?.startTime,lcp:m.lcp.at(-1),cls,domContentLoaded:nav.domContentLoadedEventEnd,load:nav.loadEventEnd,transferBytes:nav.transferSize+performance.getEntriesByType('resource').reduce((sum,e)=>sum+e.transferSize,0),longTasks:m.longTasks,resources:performance.getEntriesByType('resource').map(e=>({path:new URL(e.name).pathname,type:e.initiatorType,bytes:e.transferSize,duration:e.duration})),fontsLoaded:document.fonts.status==='loaded',heroLoaded:document.querySelector('[data-aperture] img').complete,images:[...document.images].map(i=>({source:new URL(i.currentSrc||i.src).pathname,loading:i.loading,loaded:i.complete&&i.naturalWidth>0}))};})()`);
   if(!facts.ready||!facts.fontsLoaded||!facts.heroLoaded||!facts.fcp||!facts.lcp)throw new Error('Janela de medição insuficiente.');
   const appErrors=browser.errors.slice(errorStart);
   if(appErrors.length)throw new Error(JSON.stringify(appErrors));
   report.runs.push({profile:profile.name,sample,conditions:{viewport:[profile.width,profile.height],cpu:profile.cpu,latencyMs:profile.latency,downloadBytesPerSecond:profile.download,uploadBytesPerSecond:profile.upload},setupErrors:browser.errors.slice(0,errorStart),errors:appErrors,...facts});
   await page.close();
  }finally{await browser.close();}
 }
}
report.medians={};
for(const name of ['desktop','mobile-simulado']){
 const runs=report.runs.filter(r=>r.profile===name);const median=values=>values.sort((a,b)=>a-b)[Math.floor(values.length/2)];
 report.medians[name]={fcpMs:Math.round(median(runs.map(r=>r.fcp))),lcpMs:Math.round(median(runs.map(r=>r.lcp.time))),cls:+median(runs.map(r=>r.cls)).toFixed(4),transferBytes:median(runs.map(r=>r.transferBytes))};
}
for(const file of (await readdir(join(root,'dist/_astro'))).filter(file=>file.endsWith('.js'))){const data=await readFile(join(root,'dist/_astro',file));report.bundles.push({file,bytes:data.length,gzipBytes:gzipSync(data).length});}
report.limitations=['Medições de laboratório em localhost, sem hospedagem/CDN/TLS de produção.','CPU 4x é relativa à máquina local, não corresponde a um aparelho específico.','Sem pontuação Lighthouse, INP de campo ou certificação de acessibilidade.','Observação da navegação inicial por 6,5s; métricas podem variar entre execuções.'];
await writeFile(join(artifacts,'performance.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({medians:report.medians,bundles:report.bundles,conditions:report.conditions},null,2));
