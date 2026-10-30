// Language switch: Russian browsers start in Russian; the choice is remembered.
(function () {
  const root = document.documentElement;
  const button = document.getElementById("lang");
  let saved = null;
  try {
    saved = localStorage.getItem("lang");
  } catch (e) {}
  const fromUrl = new URLSearchParams(location.search).get("lang");
  const initial =
    fromUrl === "ru" || fromUrl === "en"
      ? fromUrl
      : saved || ((navigator.language || "").toLowerCase().startsWith("ru") ? "ru" : "en");

  function apply(lang) {
    root.dataset.lang = lang;
    root.lang = lang;
    button.textContent = lang === "en" ? "RU" : "EN";
  }

  apply(initial);
  button.addEventListener("click", function () {
    const next = root.dataset.lang === "en" ? "ru" : "en";
    apply(next);
    try {
      localStorage.setItem("lang", next);
    } catch (e) {}
  });
})();
