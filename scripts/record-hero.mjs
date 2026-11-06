// Grava frames reais do Chrome com MediaRecorder/WebM nativo, sem instalar encoder.
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openBrowser } from './lib/browser.mjs';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const artifacts=join(root,'docs/validacao/etapa-4');
await mkdir(artifacts,{recursive:true});
const browser=await openBrowser(root);
const report=[];
try {
  for(const view of [{name:'desktop',width:1440,height:1160,motion:true},{name:'mobile',width:390,height:960,motion:true}]) {
    const page=await browser.createPage(view);
    await page.evaluate('document.documentElement.style.scrollbarWidth="none"');
    // Métricas emuladas não ampliam a superfície nativa da janela headless.
    // Mede sua moldura e ajusta a janela antes de gravar, sem ampliar pixels.
    let stopProbe;
    const probe=new Promise(resolve=>{
      stopProbe=browser.onEvent(message=>{
        if(message.method!=='Page.screencastFrame')return;
        void page.call('Page.screencastFrameAck',{sessionId:message.params.sessionId});
        resolve(message.params.metadata);
      });
    });
    await page.call('Page.startScreencast',{format:'jpeg',quality:30,everyNthFrame:1});
    const native=await probe;await page.call('Page.stopScreencast');stopProbe();
    const {targetInfos}=await browser.send('Target.getTargets');
    const target=targetInfos.find(target=>target.url===browser.base+'/');
    const {windowId,bounds}=await browser.send('Browser.getWindowForTarget',{targetId:target.targetId});
    await browser.send('Browser.setWindowBounds',{windowId,bounds:{width:bounds.width+view.width-native.deviceWidth,height:bounds.height+view.height-native.deviceHeight}});
    await page.evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))');
    const height=await page.evaluate('Math.ceil(document.querySelector("#inicio").getBoundingClientRect().bottom)');
    const photo=await page.evaluate('(() => { const r=document.querySelector("[data-aperture]").getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}; })()');
    const recorder=await browser.createPage({width:view.width,height:view.height},'/sistema-visual/');
    const codec=await recorder.evaluate(`(() => {
      document.body.replaceChildren();
      const canvas=document.createElement('canvas');canvas.width=${view.width};canvas.height=${height};document.body.append(canvas);
      const stream=canvas.captureStream(0);
      const mime=['video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'].find(type=>MediaRecorder.isTypeSupported(type));
      if(!mime)throw new Error('MediaRecorder WebM indisponível.');
      const recorder=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:3500000});
      const chunks=[];
      recorder.ondataavailable=event=>{if(event.data.size)chunks.push(event.data)};
      window.__recording={canvas,stream,recorder,chunks};
      return mime;
    })()`);
    let frames=0, received=0, processing=false, latest, recordingError;
    const frameTimes=[];
    async function draw(shot) {
      if(shot.metadata.deviceWidth<view.width||shot.metadata.deviceHeight<view.height)throw new Error('Superfície menor que a viewport de gravação.');
      await recorder.evaluate(`(async()=>{
        const img=new Image();img.src='data:image/jpeg;base64,${shot.data}';await img.decode();
        if(img.naturalWidth!==${shot.metadata.deviceWidth}||img.naturalHeight!==${shot.metadata.deviceHeight})throw new Error('Quadro de screencast redimensionado.');
        const {canvas,stream}=window.__recording;canvas.getContext('2d').drawImage(img,0,0,${view.width},${height},0,0,${view.width},${height});stream.getVideoTracks()[0].requestFrame();
      })()`);
    }
    async function consume() {
      processing=true;
      try { while(latest) { const frame=latest;latest=undefined;await draw(frame);frames++;frameTimes.push(performance.now()); } }
      catch(error){recordingError=error;}
      finally {processing=false;}
    }
    const unsubscribe=browser.onEvent(message=>{
      if(message.method!=='Page.screencastFrame')return;
      received++;
      page.call('Page.screencastFrameAck',{sessionId:message.params.sessionId}).catch(error=>{recordingError=error});
      latest=message.params;
      if(!processing)void consume();
    });
    await page.call('Page.bringToFront');
    // No mobile, a janela do Chrome pode ter largura mínima maior que a viewport.
    // Captura a superfície sem escala e recorta só a viewport emulada no canvas.
    await page.call('Page.startScreencast',{format:'jpeg',quality:90,everyNthFrame:1});
    while(!frames&&!recordingError)await new Promise(resolve=>setTimeout(resolve,20));
    if(recordingError)throw recordingError;
    await recorder.evaluate('window.__recording.recorder.start()');
    await recorder.evaluate('window.__recording.stream.getVideoTracks()[0].requestFrame()');
    const start=performance.now();
    let index=0;
    const actions=[{at:750,key:'ArrowRight',code:39},{at:1950,key:'ArrowLeft',code:37},{at:3150,key:'ArrowRight',code:39},{at:4350,key:'ArrowLeft',code:37}];
    const actualActions=[];
    while(performance.now()-start<5600) {
      const elapsed=performance.now()-start;
      if(index<actions.length&&elapsed>=actions[index].at) {
        await page.evaluate('document.querySelector("[data-service-choice]:checked").focus({preventScroll:true})');
        const action=actions[index++];await page.key(action.key,action.key,action.code);
        actualActions.push({key:action.key,at:Math.round(performance.now()-start)});
      }
      if(recordingError)throw recordingError;
      await new Promise(resolve=>setTimeout(resolve,15));
    }
    await page.call('Page.stopScreencast');unsubscribe();
    while(processing)await new Promise(resolve=>setTimeout(resolve,20));
    await recorder.evaluate('window.__recording.stream.getVideoTracks()[0].requestFrame()');
    await new Promise(resolve=>setTimeout(resolve,80));
    const elapsed=performance.now()-start;
    const result=await recorder.evaluate(`new Promise(resolve=>{
      const {recorder,chunks,stream}=window.__recording;
      recorder.onstop=async()=>{
        const blob=new Blob(chunks,{type:recorder.mimeType});const bytes=new Uint8Array(await blob.arrayBuffer());
        let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
        stream.getTracks().forEach(track=>track.stop());resolve({base64:btoa(binary),bytes:blob.size});
      };recorder.stop();
    })`);
    const file=`hero-${view.name}.webm`;
    await writeFile(join(artifacts,file),Buffer.from(result.base64,'base64'));
    await recorder.call('Page.bringToFront');
    // Decodifica o arquivo produzido: a prancha mostra o que está no vídeo,
    // incluindo os estados intermediários, sem interpolar ou recriar quadros.
    const sequence=await recorder.evaluate(`(async()=>{
      const video=document.createElement('video');video.preload='auto';video.muted=true;video.playsInline=true;video.src='data:video/webm;base64,${result.base64}';document.body.append(video);
      await new Promise((resolve,reject)=>{video.onloadeddata=resolve;video.onerror=reject;video.load()});
      const photo=${JSON.stringify(photo)};
      const width=${view.width > 400 ? 480 : 260};const height=Math.round(photo.height/photo.width*width);
      const canvas=document.createElement('canvas');canvas.width=width*3;canvas.height=(height+40)*2;
      const ctx=canvas.getContext('2d');ctx.fillStyle='#eef1f1';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.font='16px Arial';ctx.fillStyle='#253d4a';
      const times=[.65,.95,1.1,1.45,2.12,2.55];
      await video.play();
      for(let i=0;i<times.length;i++) {
        while(video.currentTime<times[i]&&!video.ended)await new Promise(resolve=>requestAnimationFrame(resolve));
        const x=i%3*width,y=Math.floor(i/3)*(height+40);
        ctx.fillText(times[i].toFixed(2)+' s',x+8,y+25);
        ctx.drawImage(video,photo.x,photo.y,photo.width,photo.height,x,y+40,width,height);
      }
      video.pause();
      return {data:canvas.toDataURL('image/png').split(',')[1],videoWidth:video.videoWidth,videoHeight:video.videoHeight};
    })()`);
    if(sequence.videoWidth!==view.width||sequence.videoHeight!==height)throw new Error('Dimensões inesperadas no vídeo.');
    await writeFile(join(artifacts,`hero-sequencia-${view.name}.png`),Buffer.from(sequence.data,'base64'));
    const activeIntervals=frameTimes.slice(1).map((time,i)=>time-frameTimes[i]).filter(delta=>delta<150).sort((a,b)=>a-b);
    const median=activeIntervals[Math.floor(activeIntervals.length/2)];
    report.push({file,width:view.width,height,codec,bytes:result.bytes,frames,received,durationMs:Math.round(elapsed),medianActiveFrameIntervalMs:+median.toFixed(1),capture:'Chrome DevTools screencast; quadros reais, sem interpolação',actions:actualActions});
    await recorder.close();await page.close();
  }
  await writeFile(join(artifacts,'gravacoes.json'),JSON.stringify(report,null,2)+'\n');
  await writeFile(join(artifacts,'interacoes.html'),`<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Entrear — evidências da Etapa 4</title><style>body{margin:0;padding:clamp(20px,4vw,56px);font:16px/1.6 system-ui,sans-serif;background:#eef1f1;color:#253d4a}h1{line-height:1.1;font-size:clamp(28px,4vw,48px)}main{max-width:1440px;margin:auto}video,img{display:block;max-width:100%;height:auto}video{background:#253d4a}a{color:inherit;text-underline-offset:4px}a:focus-visible,video:focus-visible{outline:3px solid #a64b32;outline-offset:5px}.videos{display:grid;grid-template-columns:2fr 1fr;gap:32px;align-items:start}figure{margin:0}figcaption{margin-block:12px 24px}section{margin-block:48px}.note{max-width:80ch}h2{font-size:26px}@media(max-width:760px){.videos{grid-template-columns:1fr}}</style></head><body><main><h1>Entrear — interações da Etapa 4</h1><p class="note">Evidências locais de um site demonstrativo. Os vídeos usam quadros reais do Chrome, sem interpolação. Acione Reproduzir para assistir; não há reprodução automática. A captura tem taxa variável e não substitui a avaliação no site ao vivo.</p><section class="videos"><figure><video controls preload="metadata" poster="hero-instalacao-desktop.png"><source src="hero-desktop.webm" type="video/webm"></video><figcaption>Desktop, 1440px. Instalação → manutenção → instalação, duas vezes.</figcaption></figure><figure><video controls preload="metadata" poster="hero-instalacao-mobile.png"><source src="hero-mobile.webm" type="video/webm"></video><figcaption>Mobile, 390px. A mesma sequência, com geometria própria.</figcaption></figure></section><section><h2>Quadros extraídos dos vídeos</h2><p>Abertura inicial, passagem, abertura completa e retorno.</p><img src="hero-sequencia-desktop.png" alt="Seis quadros do hero desktop durante a abertura e o retorno dos vãos"><img src="hero-sequencia-mobile.png" alt="Seis quadros do hero mobile durante a abertura e o retorno dos vãos"></section><section><h2>Experimentar no navegador</h2><ol><li>Na raiz do projeto, execute <code>npm.cmd run dev</code> e abra <a href="http://127.0.0.1:4321/">a página local</a>.</li><li>Use Tab até Instalação e alterne com as setas. Troque novamente durante a abertura.</li><li>Observe o aparelho, o eixo da fotografia e as orientações abaixo da imagem.</li><li>Teste Menu, Escape, âncoras, perguntas frequentes e orçamento.</li><li>Ative movimento reduzido no sistema ou no DevTools e repita as ações.</li></ol></section></main></body></html>`);
} finally {await browser.close();}
console.log(JSON.stringify(report,null,2));
