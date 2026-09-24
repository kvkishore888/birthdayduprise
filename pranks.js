// Tiny harmless prank interactions.
(function(){
  function toast(msg){const el=document.getElementById('toast');if(!el)return;el.textContent=msg;el.classList.add('show');clearTimeout(window.__prankToast);window.__prankToast=setTimeout(()=>el.classList.remove('show'),1800)}
  function dodge(btn,messages){
    if(!btn)return;
    let count=0;
    const move=()=>{
      if(btn.classList.contains('hidden'))return;
      count++;
      const rect=btn.getBoundingClientRect();
      const pad=20;
      // Keep the button inside the CURRENT visible viewport, including mobile safe space.
      const maxX=Math.max(pad,window.innerWidth-rect.width-pad);
      const maxY=Math.max(pad,window.innerHeight-rect.height-pad);
      const x=Math.min(maxX,Math.max(pad,pad+Math.random()*(maxX-pad)));
      const y=Math.min(maxY,Math.max(pad,pad+Math.random()*(maxY-pad)));
      btn.style.position='fixed';btn.style.left=x+'px';btn.style.top=y+'px';btn.style.right='auto';btn.style.bottom='auto';btn.style.margin='0';btn.style.zIndex='9999';
      btn.animate([{transform:'rotate(0) scale(1)'},{transform:'rotate(-6deg) scale(1.05)'},{transform:'rotate(6deg) scale(1)'},{transform:'rotate(0) scale(1)'}],{duration:300});
      toast(messages[(count-1)%messages.length]);
    };
    btn.addEventListener('pointerenter',move);
    btn.addEventListener('click',e=>{
      if(count<3){e.preventDefault();e.stopPropagation();move();return;}
      // Return to normal flow only after the prank is completed.
      btn.style.position='';btn.style.left='';btn.style.top='';btn.style.right='';btn.style.bottom='';btn.style.margin='';btn.style.zIndex='';
      toast('Okay! You finally caught me 😂');
    });
    // Never allow a viewport resize/orientation change to leave the button outside the screen.
    window.addEventListener('resize',()=>{
      if(btn.style.position==='fixed'){
        const r=btn.getBoundingClientRect(),pad=20;
        btn.style.left=Math.min(Math.max(pad,r.left),Math.max(pad,innerWidth-r.width-pad))+'px';
        btn.style.top=Math.min(Math.max(pad,r.top),Math.max(pad,innerHeight-r.height-pad))+'px';
      }
    });
  }
  // IMPORTANT: the Close Surprise button is kept as a reliable, catchable prank button.
  dodge(document.getElementById('dontClick'),['I warned you! 😭','WHY ARE YOU CHASING ME? 😂','Fine... keep trying 👀']);
  dodge(document.getElementById('closeSurprise'),['Wait! Not so fast 😈','You thought you could escape? 😂','Okay okay, catch me! 👀']);
})();
