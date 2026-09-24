// Tiny harmless prank interactions: selected buttons dodge briefly, but NEVER leave the visible viewport.
(function(){
  function toast(msg){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(window.__prankToast);window.__prankToast=setTimeout(()=>el.classList.remove('show'),1800)}
  function dodge(btn,messages){
    if(!btn)return;
    let count=0;
    const move=()=>{
      if(btn.classList.contains('hidden'))return;
      count++;
      const rect=btn.getBoundingClientRect(),pad=24;
      const maxX=Math.max(pad,window.innerWidth-rect.width-pad),maxY=Math.max(pad,window.innerHeight-rect.height-pad);
      const x=pad+Math.random()*(maxX-pad),y=pad+Math.random()*(maxY-pad);
      btn.style.position='fixed';btn.style.left=x+'px';btn.style.top=y+'px';btn.style.right='auto';btn.style.bottom='auto';btn.style.zIndex='200';
      btn.animate([{transform:'rotate(0) scale(1)'},{transform:'rotate(-7deg) scale(1.06)'},{transform:'rotate(7deg) scale(1)'},{transform:'rotate(0) scale(1)'}],{duration:300});
      toast(messages[(count-1)%messages.length]);
    };
    btn.addEventListener('pointerenter',move);
    btn.addEventListener('click',()=>{if(count<3){move();return;}btn.style.position='';btn.style.left='';btn.style.top='';btn.style.right='';btn.style.bottom='';btn.style.zIndex='';toast('Okay! You finally caught me 😂')});
  }
  dodge(document.getElementById('dontClick'),['I warned you! 😭','WHY ARE YOU CHASING ME? 😂','Fine... keep trying 👀']);
  dodge(document.getElementById('closeSurprise'),['Wait! Not so fast 😈','You thought you could escape? 😂','Okay okay, catch me! 👀']);
})();
