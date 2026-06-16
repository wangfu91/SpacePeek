(function () {
    const header = document.getElementById("siteHeader");

    if (!header) {
        return;
    }

    function syncHeader() {
        header.classList.toggle("is-compact", window.scrollY > 24);
    }

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
})();
