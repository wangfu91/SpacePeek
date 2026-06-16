(function () {
    const wrap = document.getElementById("stackWrap");
    const nextBtn = document.getElementById("nextShot");
    const prevBtn = document.getElementById("prevShot");
    const dotsWrap = document.getElementById("galleryDots");

    if (!wrap || !nextBtn || !prevBtn || !dotsWrap) {
        return;
    }

    const cards = Array.from(wrap.querySelectorAll(".shot-card"));
    if (!cards.length) {
        return;
    }

    let offset = 0;
    let timerId;
    const dots = cards.map(function (_, index) {
        const button = document.createElement("button");
        button.className = "gallery-dot";
        button.type = "button";
        button.setAttribute("aria-label", "Show screenshot " + (index + 1));
        button.addEventListener("click", function () {
            offset = index;
            paint();
            resetTimer();
        });
        dotsWrap.appendChild(button);
        return button;
    });

    function paint() {
        cards.forEach((card, idx) => {
            card.classList.toggle("is-active", idx === offset);
        });

        dots.forEach(function (dot, index) {
            dot.classList.toggle("is-active", index === offset);
            dot.setAttribute("aria-current", index === offset ? "true" : "false");
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
