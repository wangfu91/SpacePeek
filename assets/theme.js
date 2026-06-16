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
    if (themeChoice === "auto") {
      toggle.textContent = "Theme: Auto";
      return;
    }
    toggle.textContent = "Theme: " + (themeChoice === "dark" ? "Dark" : "Light");
  }

  function applyTheme(themeChoice) {
    if (themeChoice === "auto") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", themeChoice);
    }
    updateButton(themeChoice);
  }

  function getStoredTheme() {
    const stored = window.localStorage.getItem(key);
    if (stored === "dark" || stored === "light" || stored === "auto") {
      return stored;
    }
    return "auto";
  }

  let themeChoice = getStoredTheme();
  applyTheme(themeChoice);

  toggle.addEventListener("click", function () {
    if (themeChoice === "auto") {
      themeChoice = getSystemTheme() === "dark" ? "light" : "dark";
    } else if (themeChoice === "dark") {
      themeChoice = "light";
    } else {
      themeChoice = "auto";
    }

    window.localStorage.setItem(key, themeChoice);
    applyTheme(themeChoice);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (themeChoice === "auto") {
      applyTheme("auto");
    }
  });
})();
