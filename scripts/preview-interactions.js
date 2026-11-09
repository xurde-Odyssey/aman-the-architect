const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
let ticking=false;
addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{document.querySelector('header').classList.toggle('scrolled',scrollY>50);if(!reduced.matches)document.documentElement.style.setProperty('--scroll',Math.min(scrollY,1100)+'px');ticking=false;});},{passive:true});
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
function toggleMenu(open){nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');menu.textContent=open?'Close −':'Menu +';document.body.style.overflow=open?'hidden':'';}
menu.addEventListener('click',()=>toggleMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
addEventListener('keydown',e=>{if(e.key==='Escape')toggleMenu(false)});
document.querySelectorAll('.service > button').forEach(button=>button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';document.querySelectorAll('.service > button').forEach(b=>{b.setAttribute('aria-expanded','false');b.querySelector('.service-icon').textContent='+';b.nextElementSibling.classList.remove('expanded')});button.setAttribute('aria-expanded',String(open));button.querySelector('.service-icon').textContent=open?'−':'+';button.nextElementSibling.classList.toggle('expanded',open);}));
const works=[['Project 01 — Design','Architectural visualization','The vision for a contemporary residence.','Design'],['Project 01 — Reality','Construction in progress','The same vision, taking shape on site.','In progress'],['The Garden Retreat','Architecture & interiors','An open conversation with nature.','2025']];
let active=0;
const imgs=[...document.querySelectorAll('.gallery > img')];
document.querySelectorAll('.gallery-controls button').forEach((b,i)=>b.addEventListener('click',()=>{active=(active+(i?1:2))%3;imgs.forEach((img,n)=>img.classList.toggle('active',n===active));const copy=document.querySelector('.gallery-copy');copy.querySelector('span').textContent=works[active][1];copy.querySelector('h2').textContent=works[active][0];copy.querySelector('p').textContent=works[active][2];document.querySelector('.gallery-controls > span').innerHTML=`0${active+1} <span class="muted">/ 03</span>`;}));
const dialog=document.querySelector('dialog');
function closeDialog(){dialog.close();document.body.style.overflow='';}
function showDialog(content){dialog.innerHTML='<button class="dialog-close" aria-label="Close dialog">Close ×</button>'+content;dialog.querySelector('.dialog-close').onclick=closeDialog;dialog.showModal();document.body.style.overflow='hidden';}
dialog.addEventListener('click',e=>{if(e.target===dialog)closeDialog()});dialog.addEventListener('close',()=>{document.body.style.overflow=''});
let stage=0;
const stageImages=[...document.querySelectorAll('.stage-image')];
const stageButtons=[...document.querySelectorAll('.stage-controls button')];
stageButtons.forEach((button,i)=>button.addEventListener('click',()=>{stage=i;stageButtons.forEach((b,n)=>b.setAttribute('aria-pressed',String(n===i)));stageImages.forEach((img,n)=>{img.classList.toggle('is-active',n===i);img.setAttribute('aria-hidden',String(n!==i));});document.querySelector('.stage-status').textContent=i===0?'Design visualization':'Reality · Construction in progress';}));
document.querySelector('.stage-image-button').addEventListener('click',()=>showDialog(`<img class="dialog-image" src="${stageImages[stage].src}" alt="${works[stage][0]}"><div class="dialog-copy"><span class="eyebrow">${works[stage][1]}</span><h2>Project 01</h2><p>${works[stage][2]}</p><small>Project 01 · Design and construction progress.</small></div>`));
document.querySelectorAll('.contact button').forEach(b=>b.addEventListener('click',()=>showDialog('<div class="dialog-copy contact-dialog"><span class="eyebrow">A new beginning</span><h2>Every space starts<br>with a <em>conversation.</em></h2><p>Studio contact details are coming soon.</p><p class="secondary">This is the first look at our portfolio. We’re making room for what comes next.</p></div>')));
