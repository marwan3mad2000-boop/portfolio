// Intro: hide after the animation, or on click
(function () {
  const intro = document.getElementById("intro");
  if (!intro) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    intro.remove();
    return;
  }
  const dismiss = () => {
    intro.classList.add("done");
    setTimeout(() => intro.remove(), 900);
  };
  setTimeout(dismiss, 2300);
  intro.addEventListener("click", dismiss);
})();

// Mouse-follow glow
(function () {
  const glow = document.getElementById("glow");
  if (!glow || !window.matchMedia("(pointer: fine)").matches) return;
  let x = innerWidth / 2, y = 200, tx = x, ty = y;
  addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
  (function tick() {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    glow.style.left = x + "px";
    glow.style.top = y + "px";
    requestAnimationFrame(tick);
  })();
})();

// Reveal on scroll
(function () {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("visible"), (i % 3) * 90);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  els.forEach((el) => io.observe(el));
})();
