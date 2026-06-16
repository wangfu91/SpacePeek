(function () {
    const header = document.getElementById("siteHeader");
    const appStoreLinks = document.querySelectorAll("[data-app-store-link]");

    function openAppStore() {
        if (navigator.userAgent.includes("Macintosh")) {
            window.location.href = "macappstore://itunes.apple.com/app/id6777129953";
            return;
        }

        const locale = navigator.language || navigator.userLanguage || "en-US";
        const appStoreUrl = locale === "zh-CN"
            ? "https://apps.apple.com/cn/app/spacepeek/id6777129953"
            : "https://apps.apple.com/us/app/spacepeek/id6777129953";

        window.location.assign(appStoreUrl);
    }

    if (appStoreLinks.length > 0) {
        appStoreLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                openAppStore();
            });
        });
    }

    if (!header) {
        return;
    }

    function syncHeader() {
        header.classList.toggle("is-compact", window.scrollY > 24);
    }

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
})();
