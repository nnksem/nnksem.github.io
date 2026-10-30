(function () {
  var root = document.documentElement;

  // Theme toggle: system by default, remembers a manual choice.
  var toggle = document.getElementById("theme-toggle");
  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  toggle.addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("apsis-theme", next); } catch (e) {}
  });

  // Launch film: preload="none" keeps the page quiet until someone presses play.
  // If launch.mp4 isn't there yet, the cover stays and says so.
  var frame = document.getElementById("film");
  var video = document.getElementById("film-video");
  var cover = document.getElementById("film-play");
  var label = document.getElementById("film-label");
  function missing() {
    frame.classList.remove("is-playing");
    frame.classList.add("is-missing");
    label.textContent = "Launch film coming soon";
    cover.setAttribute("aria-label", "Launch film coming soon");
  }
  cover.addEventListener("click", function () {
    if (frame.classList.contains("is-missing")) return;
    frame.classList.add("is-playing");
    var p = video.play();
    if (p && p.catch) p.catch(missing);
  });
  video.querySelector("source").addEventListener("error", missing);

  // Copy button for the build snippet.
  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = btn.getAttribute("data-copy");
      var done = function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
    });
  });
})();
