// Reliable fake-ending navigation fallback.
(function () {
  const next = document.getElementById('continueAfterFake');
  const close = document.getElementById('closeSurprise');
  if (!next) return;

  function nextPage() {
    const screens = [...document.querySelectorAll('.screen')];
    screens.forEach(s => s.classList.toggle('active', Number(s.dataset.screen) === 5));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.dataset.screen = '5';
    if (typeof window.renderMemories === 'function') window.renderMemories();
  }

  // The curiosity button ALWAYS advances to the next page.
  next.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    nextPage();
  }, true);

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

  // Keyboard fallback while the fake ending is visible: Enter / Space advances.
  document.addEventListener('keydown', function (e) {
    if (!document.querySelector('[data-screen="4"].active')) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      nextPage();
    }
  });
})();
