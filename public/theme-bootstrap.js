(() => {
  try {
    const stored = localStorage.getItem("evidence-studio-theme");
    const allowed = stored === "light" || stored === "dark" ? stored : null;
    const preferred = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    document.documentElement.dataset.theme = allowed || preferred;
  } catch {
    document.documentElement.dataset.theme = "dark";
  }
})();
