(() => {
  const quiz = document.getElementById('missionQuiz');
  const progress = document.getElementById('missionProgress');
  const progressText = document.getElementById('progressText');
  const feedback = document.getElementById('missionFeedback');
  if (!quiz) return;

  const jokes = [
    '😂 WRONG! The birthday police have been notified.',
    '😭 Nice attempt. Your birthday privileges remain under investigation.',
    '😈 You really thought I would make this that easy?',
    '🤨 Suspicious choice... but I respect the confidence.'
  ];

  quiz.querySelectorAll('.question').forEach((question, qIndex) => {
    const buttons = [...question.querySelectorAll('.option')];
    if (!buttons.length) return;

    // A harmless prank: one option becomes a cheeky "trap" after hovering/tapping.
    if (qIndex === 1 && buttons[1]) {
      const trap = buttons[1];
      let escaped = false;
      const dodge = () => {
        if (escaped || question.dataset.done) return;
        escaped = true;
        trap.textContent = '🏃 Wait... catch me first!';
        trap.animate([
          { transform: 'translateX(0) rotate(0)' },
          { transform: 'translateX(28px) rotate(3deg)' },
          { transform: 'translateX(-18px) rotate(-2deg)' },
          { transform: 'translateX(0) rotate(0)' }
        ], { duration: 500 });
        if (window.sparkBurst) window.sparkBurst(trap.getBoundingClientRect().left, trap.getBoundingClientRect().top, 8);
      };
      trap.addEventListener('mouseenter', dodge);
      trap.addEventListener('touchstart', dodge, { passive: true });
    }

    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        if (question.dataset.done && !button.classList.contains('wrong')) return;
        if (button.classList.contains('wrong')) {
          feedback.textContent = jokes[(qIndex + index) % jokes.length];
          feedback.animate([
            { transform: 'scale(1)' },
            { transform: 'scale(1.05) rotate(-1deg)' },
            { transform: 'scale(1)' }
          ], { duration: 350 });
        }
      });
    });
  });

  // Make the mission ending feel like a tiny victory screen.
  const observer = new MutationObserver(() => {
    if (progressText && progressText.textContent === '100%') {
      feedback.textContent = '🎉 MISSION COMPLETE! You survived the extremely serious birthday test.';
      if (progress) progress.animate([
        { transform: 'scaleX(1)' },
        { transform: 'scaleX(1.04)' },
        { transform: 'scaleX(1)' }
      ], { duration: 450 });
      observer.disconnect();
    }
  });
  if (progressText) observer.observe(progressText, { childList: true, characterData: true, subtree: true });
})();