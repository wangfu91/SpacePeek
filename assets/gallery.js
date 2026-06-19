(function () {
    const posterTrack = document.getElementById("posterTrack");
    const posterDotsWrap = document.getElementById("posterDots");

    if (posterTrack && posterDotsWrap) {
        const posterSlides = Array.from(posterTrack.querySelectorAll(".poster-slide"));
        let posterIndex = 0;
        let posterTimer;

        const posterDots = posterSlides.map(function (_, dotIndex) {
            const button = document.createElement("button");
            button.className = "poster-dot";
            button.type = "button";
            button.setAttribute("aria-label", "Show poster " + (dotIndex + 1));
            button.addEventListener("click", function () {
                posterIndex = dotIndex;
                paintPosters();
                resetPosterTimer();
            });
            posterDotsWrap.appendChild(button);
            return button;
        });

        function paintPosters() {
            posterTrack.style.transform = "translateX(" + (-posterIndex * 100) + "%)";
            posterDots.forEach(function (dot, dotIndex) {
                const active = dotIndex === posterIndex;
                dot.classList.toggle("is-active", active);
                dot.setAttribute("aria-current", active ? "true" : "false");
            });
        }

        function nextPoster() {
            posterIndex = (posterIndex + 1) % posterSlides.length;
            paintPosters();
        }

        function resetPosterTimer() {
            window.clearInterval(posterTimer);
            posterTimer = window.setInterval(nextPoster, 4200);
        }

        if (posterSlides.length > 0) {
            paintPosters();
            resetPosterTimer();
        }
    }
})();

(function () {
    const track = document.getElementById("galleryTrack");
    const nextBtn = document.getElementById("nextShot");
    const prevBtn = document.getElementById("prevShot");
    const dotsWrap = document.getElementById("galleryDots");

    if (!track || !nextBtn || !prevBtn || !dotsWrap) {
        return;
    }

    const slides = Array.from(track.querySelectorAll(".gallery-slide"));
    if (!slides.length) {
        return;
    }

    let index = 0;
    let dots = [];

    function visibleCount() {
        return window.matchMedia("(min-width: 900px)").matches ? 2 : 1;
    }

    function maxIndex() {
        return Math.max(0, slides.length - visibleCount());
    }

    function renderDots() {
        dotsWrap.textContent = "";
        dots = Array.from({ length: maxIndex() + 1 }, function (_, dotIndex) {
            const button = document.createElement("button");
            button.className = "gallery-dot";
            button.type = "button";
            button.setAttribute("aria-label", "Show screenshot set " + (dotIndex + 1));
            button.addEventListener("click", function () {
                index = dotIndex;
                paint();
            });
            dotsWrap.appendChild(button);
            return button;
        });
    }

    function paint() {
        const perView = visibleCount();
        index = Math.min(Math.max(index, 0), maxIndex());
        track.style.transform = "translateX(" + (-index * (100 / perView)) + "%)";

        dots.forEach(function (dot, dotIndex) {
            const active = dotIndex === index;
            dot.classList.toggle("is-active", active);
            dot.setAttribute("aria-current", active ? "true" : "false");
        });

        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === maxIndex();
    }

    nextBtn.addEventListener("click", function () {
        index += 1;
        paint();
    });

    prevBtn.addEventListener("click", function () {
        index -= 1;
        paint();
    });

    window.addEventListener("resize", function () {
        renderDots();
        paint();
    });

    renderDots();
    paint();
})();
