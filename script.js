const cfg = window.BIRTHDAY_CONFIG;
const screens = [...document.querySelectorAll('.screen')];
let current = 1;
let starClicks = 0, cakeClicks = 0, typedDone = false, musicOn = false, giftOpened = false;
const music = document.getElementById('bgMusic');

function goTo(n){
  if(n < 1 || n > 9) return;
  current = n;
  screens.forEach(s => s.classList.toggle('active', Number(s.dataset.screen) === n));
  window.scrollTo({top:0, behavior:'smooth'});
  document.body.dataset.screen = n;
  if(n === 5) renderMemories();
  if(n === 6) renderQuiz(cfg.selfQuiz, 'selfQuiz', 'selfFeedback', () => toast("Okay... we have collected enough evidence. You're officially awesome. ✅"));
  if(n === 9) celebrationBurst();
}

document.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click', () => goTo(current + 1)));
function toast(text){const el=document.getElementById('toast');el.textContent=text;el.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>el.classList.remove('show'),2400)}

const particles=document.getElementById('particles');
for(let i=0;i<65;i++){const p=document.createElement('i');p.className='particle';p.style.left=Math.random()*100+'vw';p.style.top=Math.random()*100+'vh';p.style.animationDelay=Math.random()*4+'s';p.style.animationDuration=2+Math.random()*5+'s';particles.appendChild(p)}
const decor=document.getElementById('floatingDecor');
['✦','✧','·','♡','✨','•'].forEach(symbol=>{for(let j=0;j<3;j++){const d=document.createElement('span');d.className='drifter';d.textContent=symbol;d.style.left=(5+Math.random()*90)+'%';d.style.top=(5+Math.random()*90)+'%';d.style.animationDelay=(-Math.random()*7)+'s';d.style.animationDuration=(6+Math.random()*6)+'s';decor.appendChild(d)}});

if(window.matchMedia('(pointer:fine)').matches){document.querySelectorAll('.tilt-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*3}deg) translateY(-2px)`});card.addEventListener('pointerleave',()=>card.style.transform='')})}

const star=document.getElementById('starEgg');
star.addEventListener('click',e=>{e.stopPropagation();starClicks++;sparkBurst(e.clientX,e.clientY,8);if(starClicks>=5){const egg=document.getElementById('eggMessage');egg.textContent='You found the secret! 👀✨';egg.classList.add('show');setTimeout(()=>egg.classList.remove('show'),2500);starClicks=0;confetti(35)}});

const yes=document.getElementById('yesBtn'),no=document.getElementById('noBtn'),check=document.getElementById('checkMessage');
no.addEventListener('click',()=>{check.textContent='Nice try 😂 You literally clicked this website.';yes.animate([{transform:'scale(1)'},{transform:'scale(1.1)'},{transform:'scale(1)'}],{duration:500})});
yes.addEventListener('click',()=>{check.textContent='Hmm... suspiciously confident. 😌';sparkBurst(innerWidth/2,innerHeight/2,14);setTimeout(()=>goTo(3),900)});

function renderQuiz(questions,mountId,feedbackId,onDone){
  const mount=document.getElementById(mountId);mount.innerHTML='';let answered=0;
  questions.forEach((item,qi)=>{const box=document.createElement('div');box.className='question';const title=document.createElement('div');title.className='question-title';title.textContent=`${qi+1}. ${item.q}`;box.appendChild(title);const opts=document.createElement('div');opts.className='options';item.options.forEach((option,oi)=>{const btn=document.createElement('button');btn.className='option';btn.textContent=option;btn.addEventListener('click',()=>{if(box.dataset.done)return;box.dataset.done='1';answered++;[...opts.children].forEach(b=>b.disabled=true);if(oi===item.correct){btn.classList.add('correct');sparkBurst(btn.getBoundingClientRect().left+btn.offsetWidth/2,btn.getBoundingClientRect().top+btn.offsetHeight/2,10)}else{btn.classList.add('wrong');opts.children[item.correct].classList.add('correct')}if(mountId==='missionQuiz'){const pct=Math.round(answered/questions.length*100);document.querySelector('#missionProgress span').style.width=pct+'%';document.getElementById('progressText').textContent=pct+'%'}if(answered===questions.length){setTimeout(()=>{if(mountId==='missionQuiz'){document.getElementById(feedbackId).textContent='MISSION COMPLETE ✅';confetti(45);setTimeout(()=>goTo(4),650)}else onDone?.()},500)}});opts.appendChild(btn)});box.appendChild(opts);mount.appendChild(box)});
}
renderQuiz(cfg.missionQuiz,'missionQuiz','missionFeedback');

document.getElementById('closeSurprise').addEventListener('click',e=>{e.currentTarget.classList.add('hidden');const card=document.querySelector('.fake-ending');card.animate([{transform:'translateX(0)'},{transform:'translateX(-9px)'},{transform:'translateX(9px)'},{transform:'translateX(-5px)'},{transform:'translateX(0)'}],{duration:480});document.getElementById('fakeReveal').classList.remove('hidden');sparkBurst(innerWidth/2,innerHeight/2,18)});

function renderMemories(){const wall=document.getElementById('memoryWall');if(wall.children.length)return;cfg.memories.forEach((m,i)=>{const card=document.createElement('article');card.className='memory-card';card.style.setProperty('--r',i%2?'1deg':'-1deg');card.innerHTML=`<img loading="lazy" src="${m.image}" alt="Birthday memory ${i+1}"><div class="memory-caption"><strong>${m.caption}</strong><small>${m.date}</small></div>`;card.addEventListener('click',()=>{card.animate([{transform:'scale(1)'},{transform:'scale(1.04) rotate(0)'},{transform:'scale(1)'}],{duration:450});sparkBurst(innerWidth/2,innerHeight/2,12)});wall.appendChild(card)})}

document.getElementById('dontClick').addEventListener('click',()=>{toast('WHY DID YOU CLICK IT?! 😂');confetti(30);sparkBurst(innerWidth/2,innerHeight/2,25)});

const giftAction=document.querySelector('.gift-card .primary-btn');giftAction.addEventListener('click',openGift);document.getElementById('giftBtn').addEventListener('click',openGift);
function openGift(){if(giftOpened)return;giftOpened=true;const gift=document.getElementById('giftBtn');gift.animate([{transform:'scale(1) rotate(0)'},{transform:'scale(1.12) rotate(-6deg)'},{transform:'scale(.88) rotate(6deg)'},{transform:'scale(1.2) rotate(0)'}],{duration:850});document.body.classList.add('reveal-loading');setTimeout(()=>{document.body.classList.remove('reveal-loading');confetti(220);sparkBurst(innerWidth/2,innerHeight/2,65);goTo(8);startReveal()},850)}
function startReveal(){document.getElementById('birthdayName').textContent=`Happy Birthday, ${cfg.name}! ❤️`;typeMessage(cfg.message)}
function typeMessage(text){if(typedDone)return;typedDone=true;const el=document.getElementById('typedMessage');el.textContent='';let i=0;const timer=setInterval(()=>{el.textContent+=text[i++]||'';if(i>=text.length){clearInterval(timer);document.querySelector('.cursor').classList.add('hidden');document.getElementById('letterFooter').classList.remove('hidden');document.getElementById('lastThing').classList.remove('hidden');confetti(55)}},cfg.typingSpeed||24)}

document.getElementById('lastThing').addEventListener('click',()=>{confetti(260);sparkBurst(innerWidth/2,innerHeight/2,80);goTo(9)});
document.getElementById('cake').addEventListener('click',e=>{cakeClicks++;sparkBurst(e.clientX,e.clientY,10);if(cakeClicks>=3){toast('The cake is officially dancing. 🎂🕺');e.currentTarget.animate([{transform:'rotate(0) scale(1)'},{transform:'rotate(-15deg) scale(1.15)'},{transform:'rotate(15deg) scale(1.15)'},{transform:'rotate(0) scale(1)'}],{duration:800});confetti(45);cakeClicks=0}});

const musicBtn=document.getElementById('musicBtn');
musicBtn.addEventListener('click',async()=>{try{if(musicOn){music.pause();musicOn=false;musicBtn.textContent='🔇 Music'}else{music.src=cfg.music||'assets/birthday-music.mp3';await music.play();musicOn=true;musicBtn.textContent='🔊 Music'}}catch{toast('Add your MP3 at the configured music path, then try again 🎵')}});

let keys='';window.addEventListener('keydown',e=>{if(e.key.length===1){keys=(keys+e.key.toLowerCase()).slice(-8);if(keys.endsWith('birthday')){confetti(100);sparkBurst(innerWidth/2,innerHeight/2,50);toast('Secret birthday mode unlocked! 🎊');keys=''}}});
function sparkBurst(x,y,count=15){for(let i=0;i<count;i++){const s=document.createElement('span');s.className='spark';s.textContent=['✦','✧','✨','·'][i%4];s.style.left=x+'px';s.style.top=y+'px';s.style.setProperty('--x',(Math.random()*220-110)+'px');s.style.setProperty('--y',(Math.random()*220-110)+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),950)}}
function confetti(count=100){for(let i=0;i<count;i++){const c=document.createElement('i');c.className='confetti-piece';c.style.left=Math.random()*100+'vw';c.style.animationDuration=(2.4+Math.random()*2.8)+'s';c.style.animationDelay=(Math.random()*.5)+'s';c.style.setProperty('--dx',(Math.random()*360-180)+'px');c.style.transform=`rotate(${Math.random()*360}deg)`;c.style.background=cfg.confettiColors?.[i%cfg.confettiColors.length]||['#ff6b9a','#ffc98e','#a78bfa','#fff','#75e6c2'][i%5];document.getElementById('confetti').appendChild(c);setTimeout(()=>c.remove(),6000)}}
function celebrationBurst(){confetti(140);sparkBurst(innerWidth/2,innerHeight*.42,60);for(let i=0;i<8;i++)setTimeout(()=>confetti(35),i*300)}
document.getElementById('restartBtn').addEventListener('click',()=>location.reload());
