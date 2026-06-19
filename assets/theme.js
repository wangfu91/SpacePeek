(function () {
    const root = document.documentElement;
    const toggle = document.getElementById("themeToggle");
    const key = "spacepeek-theme";

    if (!toggle) {
        return;
    }

    function getSystemTheme() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }

    function updateButton(themeChoice) {
        const nextTheme = themeChoice === "dark" ? "light" : "dark";
        toggle.setAttribute("aria-label", "Switch to " + nextTheme + " theme");
        toggle.setAttribute("title", "Switch to " + nextTheme + " theme");
        toggle.setAttribute("aria-pressed", themeChoice === "dark" ? "true" : "false");
    }

    function applyTheme(themeChoice) {
        root.setAttribute("data-theme", themeChoice);
        updateButton(themeChoice);
    }

    function getStoredThemeOrNull() {
        const stored = window.localStorage.getItem(key);
        if (stored === "dark" || stored === "light") {
            return stored;
        }
        return null;
    }

    const stored = getStoredThemeOrNull();
    const followSystem = stored === null;
    let themeChoice = stored || getSystemTheme();
    applyTheme(themeChoice);

    toggle.addEventListener("click", function () {
        themeChoice = themeChoice === "dark" ? "light" : "dark";

        window.localStorage.setItem(key, themeChoice);
        applyTheme(themeChoice);
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        if (followSystem && window.localStorage.getItem(key) === null) {
            themeChoice = getSystemTheme();
            applyTheme(themeChoice);
        }
    });
})();
