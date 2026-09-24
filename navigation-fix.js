// Reliable fake-ending navigation fallback.
(function () {
  const next = document.getElementById('continueAfterFake');
  const fakeNext = document.getElementById('fakeNextBtn');
  if (!next && !fakeNext) return;

  function nextPage() {
    const screens = [...document.querySelectorAll('.screen')];
    screens.forEach(s => s.classList.toggle('active', Number(s.dataset.screen) === 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.dataset.screen = '5';
    document.body.dataset.fakeEndingPassed = 'true';
    if (typeof window.renderMemories === 'function') window.renderMemories();
    if (typeof window.renderGangMemories === 'function') window.renderGangMemories();
  }

  // Main curiosity button ALWAYS advances to the next page.
  [next, fakeNext].filter(Boolean).forEach(btn => btn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    nextPage();
  }, true));

  // Extra escape hatch: double-click/tap the fake ending card to continue.
  const card = document.querySelector('.fake-ending');
  if (card) {
    let taps = 0, timer;
    card.addEventListener('dblclick', function () {
      if (!document.querySelector('[data-screen="4"].active')) return;
      nextPage();
    });
    card.addEventListener('click', function (e) {
      if (e.target.closest('button')) return;
      taps++;
      clearTimeout(timer);
      timer = setTimeout(() => taps = 0, 700);
      if (taps >= 3) nextPage();
    });
  }

  // No Enter/Space shortcut: the visible button is the reliable fallback.
})();