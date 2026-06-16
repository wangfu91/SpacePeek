(function () {
  const wrap = document.getElementById("stackWrap");
  const nextBtn = document.getElementById("nextShot");
  const prevBtn = document.getElementById("prevShot");

  if (!wrap || !nextBtn || !prevBtn) {
    return;
  }

  const cards = Array.from(wrap.querySelectorAll(".shot-card"));
  if (!cards.length) {
    return;
  }

  const stateClasses = ["state-top", "state-mid", "state-low", "state-hidden"];

  // Shuffle once on load so the stack feels less static.
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  let offset = 0;
  let timerId;

  function paint() {
    cards.forEach((card, idx) => {
      stateClasses.forEach((name) => card.classList.remove(name));
      const pos = (idx - offset + cards.length) % cards.length;
      card.classList.add(stateClasses[Math.min(pos, stateClasses.length - 1)]);
    });
  }

  function next() {
    offset = (offset + 1) % cards.length;
    paint();
  }

  function prev() {
    offset = (offset - 1 + cards.length) % cards.length;
    paint();
  }

  function resetTimer() {
    window.clearInterval(timerId);
    timerId = window.setInterval(next, 3200);
  }

  nextBtn.addEventListener("click", function () {
    next();
    resetTimer();
  });

  prevBtn.addEventListener("click", function () {
    prev();
    resetTimer();
  });

  wrap.addEventListener("mouseenter", function () {
    window.clearInterval(timerId);
  });

  wrap.addEventListener("mouseleave", function () {
    resetTimer();
  });

  paint();
  resetTimer();
})();
