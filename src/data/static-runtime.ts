// Runtime estático: o postbuild remove o React do export, então toda a
// interatividade da página vive aqui, em JS puro e inline.
// Menu mobile, seção ativa no HUD/navegação (com odômetro), guarda do formulário e
// carga das cenas de rolagem (GSAP) só em desktop com ponteiro fino e sem reduced-motion.
// As cenas não rodam no `next dev`: o React ainda hidrataria este DOM e os pins do GSAP
// mexem na árvore. Se o import falhar, a página segue com rolagem nativa.
export const staticRuntime = `(function(){
var root=document.documentElement;
root.dataset.js='on';
var bootQuery='(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
// a mão 2D fica oculta até a 3D montar ou cair no fallback (evita o lampejo da 2D no refresh)
if(matchMedia(bootQuery).matches&&!document.querySelector('script[src^="/_next/static/"]')){root.dataset.handPending='on';setTimeout(function(){delete root.dataset.handPending},5000)}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)root.dataset.fx='on';
try{if(!localStorage.getItem('hr-boot-seen')&&!navigator.webdriver&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&['/','/en/','/index.html','/en/index.html'].indexOf(location.pathname)>-1)root.dataset.boot='on'}catch(e){}
function initMenu(){
 var toggle=document.querySelector('[data-menu-toggle]'),menu=document.querySelector('[data-menu]');if(!toggle||!menu)return;
 function focusables(){return [toggle].concat(Array.from(menu.querySelectorAll('a,button')))}
 function set(open){toggle.setAttribute('aria-expanded',String(open));root.toggleAttribute('data-menu-open',open);if(open){var first=menu.querySelector('a');if(first)first.focus()}}
 toggle.addEventListener('click',function(){set(toggle.getAttribute('aria-expanded')!=='true')});
 menu.addEventListener('click',function(event){if(event.target.closest&&event.target.closest('a'))set(false)});
 document.addEventListener('keydown',function(event){
  if(toggle.getAttribute('aria-expanded')!=='true')return;
  if(event.key==='Escape'){set(false);toggle.focus();return}
  if(event.key!=='Tab')return;var items=focusables().filter(function(el){return el.offsetParent!==null});if(!items.length)return;
  var first=items[0],last=items[items.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
 });
 matchMedia('(min-width: 1024px)').addEventListener('change',function(event){if(event.matches)set(false)});
}
function setOdometer(counter,value){
 if(!counter.querySelector('.odo')){counter.textContent='';value.split('').forEach(function(){var digit=document.createElement('span');digit.className='odo';counter.appendChild(digit)})}
 Array.from(counter.querySelectorAll('.odo')).forEach(function(digit,index){var d=value.charAt(index);digit.textContent=d;digit.style.setProperty('--d',d)});
}
function initHeaderHide(){
 var header=document.querySelector('.site-header');if(!header)return;var last=scrollY,frame=0;
 function update(){frame=0;var y=scrollY,menuOpen=root.hasAttribute('data-menu-open'),focused=header.contains(document.activeElement);
  if(menuOpen||focused||y<120)root.removeAttribute('data-header-hidden');else if(y>last+4)root.setAttribute('data-header-hidden','');else if(y<last-4)root.removeAttribute('data-header-hidden');
  last=y}
 addEventListener('scroll',function(){if(!frame)frame=requestAnimationFrame(update)},{passive:true});
 header.addEventListener('focusin',function(){root.removeAttribute('data-header-hidden')});
}
function initHud(){
 var sections=Array.from(document.querySelectorAll('[data-section]'));if(!sections.length)return;
 var counters=Array.from(document.querySelectorAll('[data-hud-section]')),percent=document.querySelector('[data-hud-percent]'),progress=document.querySelector('[data-hud-progress]'),mode=document.querySelector('[data-hud-mode]'),links=Array.from(document.querySelectorAll('[data-nav-link]')),frame=0,current=-1;
 function update(){frame=0;var range=Math.max(1,root.scrollHeight-innerHeight),value=Math.min(1,Math.max(0,scrollY/range)),mark=innerHeight*.4,active=0;
  sections.forEach(function(section,index){if(section.getBoundingClientRect().top<=mark)active=index});
  if(percent)percent.textContent=String(Math.round(value*100)).padStart(3,'0');
  if(progress)progress.style.transform='scaleX('+value.toFixed(4)+')';
  if(active===current)return;current=active;var number=String(active+1).padStart(2,'0'),section=sections[active];
  counters.forEach(function(counter){if(counter.hasAttribute('data-odometer'))setOdometer(counter,number);else counter.textContent=number});
  if(mode&&root.dataset.scenes!=='on')mode.textContent=section.dataset.mode==='horizontal'?'HORIZONTAL':'VERTICAL';
  links.forEach(function(link){if(link.dataset.navLink===section.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});
 }
 function schedule(){if(!frame)frame=requestAnimationFrame(update)}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});update();
}
function initContactForm(){
 var form=document.querySelector('[data-contact-form]');if(!form)return;var status=form.querySelector('[data-form-status]');
 function say(text,tone){if(!status)return;status.textContent=text;status.dataset.tone=tone}
 var pt=root.lang!=='en';
 form.addEventListener('submit',function(event){
  event.preventDefault();var endpoint=form.getAttribute('action');
  if(!endpoint){say(pt?'Formulário ainda não configurado. Use o e-mail.':'Form not configured yet. Please use email.','error');return}
  if(!form.checkValidity()){form.reportValidity();say(pt?'Confira os campos destacados.':'Check the highlighted fields.','error');return}
  var button=form.querySelector('button[type="submit"]');if(button)button.disabled=true;say(pt?'Enviando...':'Sending...','pending');
  fetch(endpoint,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}}).then(function(response){if(!response.ok)throw new Error(String(response.status));form.reset();say(pt?'Mensagem enviada. Obrigado!':'Message sent. Thank you!','success')}).catch(function(){say(pt?'Não foi possível enviar. Tente pelo e-mail.':'Could not send. Please try email.','error')}).finally(function(){if(button)button.disabled=false});
 });
}
function initFeed(){
 var video=document.querySelector('video[data-feed]');if(!video||!('IntersectionObserver' in window))return;
 var still=matchMedia('(prefers-reduced-motion: reduce)').matches;
 var loaded=false;
 new IntersectionObserver(function(entries){entries.forEach(function(entry){
  if(entry.isIntersecting&&!video.poster)video.poster=video.dataset.poster;
  if(still)return;
  if(entry.isIntersecting){if(!loaded){loaded=true;video.querySelectorAll('source[data-src]').forEach(function(source){source.src=source.dataset.src});video.load()}var playing=video.play();if(playing&&playing.catch)playing.catch(function(){})}
  else if(loaded)video.pause();
 })},{rootMargin:'200px 0px'}).observe(video);
}
function setRigAngle(rig,angle){
 var turn=((angle%360)+360)%360;rig.style.setProperty('--rig-angle',angle.toFixed(2)+'deg');
 rig.dataset.face=turn<60||turn>300?'front':turn>=120&&turn<=240?'back':'data';
 rig.dataset.photo=angle>=180?'natural':'duotone';
 var readout=rig.querySelector('[data-rig-angle]');if(readout)readout.textContent=String(Math.round(turn)).padStart(3,'0');
}
function initRig(){
 // Sem cenas (celular): o card gira com a posição dele na tela, sem travar a rolagem.
 var rig=document.querySelector('[data-hero-rig]');if(!rig||matchMedia('(prefers-reduced-motion: reduce)').matches)return;var frame=0;
 function update(){frame=0;if(root.dataset.scenes==='on')return;var rect=rig.getBoundingClientRect(),start=innerHeight*.62,progress=Math.min(1,Math.max(0,(start-rect.top)/Math.max(1,rect.height*.9)));setRigAngle(rig,progress*360)}
 function schedule(){if(!frame)frame=requestAnimationFrame(update)}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});update();
}
function initBoot(){
 if(root.dataset.boot!=='on')return;var boot=document.querySelector('[data-boot-root]');
 if(!boot){delete root.dataset.boot;return}
 try{localStorage.setItem('hr-boot-seen','1')}catch(e){}
 // sem inert na página (forçaria recalcular o estilo da árvore toda): o Tab fica preso no boot
 function holdTab(event){if(event.key==='Tab'&&root.dataset.boot){event.preventDefault()}}document.addEventListener('keydown',holdTab);
 var finished=false,showing=false,done=0,total=4,segments=Array.from(boot.querySelectorAll('.boot__bar i')),percent=boot.querySelector('[data-boot-percent]');
 var scenesEligible=matchMedia(bootQuery).matches;boot.focus({preventScroll:true});
 function paint(){var value=Math.round(done/total*100);if(percent)percent.textContent=String(value).padStart(3,'0');var lit=Math.round(value/5);segments.forEach(function(segment,index){segment.toggleAttribute('data-on',index<lit)})}
 // o log sempre aparece na ordem das linhas, mesmo que as tarefas terminem fora de ordem
 var order=['fonts','media','module','scenes'],results={};
 function reveal(){if(showing||finished)return;var id=order[done];if(!id||!results[id])return;showing=true;var line=boot.querySelector('[data-boot-step="'+id+'"]');if(line){line.dataset.state='done';var status=line.querySelector('[data-boot-status]');if(status)status.textContent=results[id]}done++;paint();setTimeout(function(){showing=false;if(done>=total)finish(false);else reveal()},110)}
 function complete(id,status){if(finished||results[id])return;results[id]=status||boot.dataset.ok;reveal()}
 function waitFor(attribute,eventName){return new Promise(function(resolve){if(root.dataset[attribute]){resolve(root.dataset[attribute]);return}document.addEventListener(eventName,function(event){resolve(event.detail||root.dataset[attribute])},{once:true})})}
 function close(){
  if(root.dataset.boot!=='on')return;root.dataset.boot='closing';
  setTimeout(function(){delete root.dataset.boot;document.removeEventListener('keydown',holdTab);dispatchEvent(new Event('resize'));document.dispatchEvent(new CustomEvent('hr:boot-done'));
   var mark=document.querySelector('.brand__mark');if(mark){mark.classList.add('is-glitching');setTimeout(function(){mark.classList.remove('is-glitching')},400)}},620);
 }
 function finish(skipped){
  if(finished)return;finished=true;clearTimeout(cap);
  boot.querySelectorAll('[data-boot-step]:not([data-state])').forEach(function(line){if(line.dataset.bootStep==='done')return;line.dataset.state='pending';var status=line.querySelector('[data-boot-status]');if(status)status.textContent=boot.dataset.pending});
  var final=boot.querySelector('[data-boot-step="done"]');if(final)final.dataset.state='done';
  if(!skipped){done=total;paint()}
  setTimeout(close,skipped?0:280);
 }
 var cap=setTimeout(function(){finish(false)},2500);
 document.addEventListener('keydown',function(event){if(event.key==='Escape')finish(true)});
 var fonts=document.fonts?Promise.all([document.fonts.load('800 1em Tektur'),document.fonts.load('400 1em Inter'),document.fonts.load('400 1em "JetBrains Mono"')]):Promise.resolve();
 fonts.then(function(){complete('fonts')},function(){complete('fonts',boot.dataset.pending)});
 var images=Array.from(document.querySelectorAll('#inicio img')).filter(function(img){return img.offsetParent!==null||img.closest('.id-card')});
 Promise.all(images.map(function(img){return img.decode?img.decode().catch(function(){}):Promise.resolve()})).then(function(){complete('media')});
 if(scenesEligible){waitFor('handStatus','hr:hand').then(function(status){complete('module',status==='3d'?boot.dataset.ok:boot.dataset.fallback)});waitFor('scenes','hr:scenes').then(function(){complete('scenes')})}
 else{complete('module',boot.dataset.fallback);complete('scenes')}
}
function initFx(){
 // fundo contracorrente + efeitos. No next dev o React ainda hidrataria este DOM: fica estático.
 var dev=document.querySelector('script[src^="/_next/static/"]');
 function release(){delete root.dataset.fx}
 if(dev){release();return}
 var timer=setTimeout(release,4000);
 // começa quando o navegador está ocioso: o fundo já aparece estático no HTML até lá
 var idle=window.requestIdleCallback||function(callback){return setTimeout(callback,200)};
 idle(function(){import('/vendor/scroll/fx.js').then(function(module){clearTimeout(timer);module.initFx()}).catch(function(){clearTimeout(timer);release()})},{timeout:1500});
}
function initScenes(){
 if(!document.querySelector('[data-rail]')||document.querySelector('script[src^="/_next/static/"]')){delete root.dataset.handPending;return}
 var query=bootQuery;
 function load(){import('/vendor/scroll/scroll.js').then(function(module){module.initScrollScenes()}).catch(function(){delete root.dataset.handPending})}
 var media=matchMedia(query);if(media.matches)load();else media.addEventListener('change',function once(event){if(event.matches){media.removeEventListener('change',once);load()}});
}
function ready(){initFx();initBoot();initMenu();initHeaderHide();initHud();initContactForm();initFeed();initRig();initScenes()}
if(document.readyState==='loading')addEventListener('DOMContentLoaded',ready);else ready();
})()`
