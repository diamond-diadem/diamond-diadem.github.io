// Sets .is-receded on the section sidebar as soon as the reader scrolls, so
// the stylesheet can fade it like the contents rail (see _section-sidebar.scss);
// back at the top of the page it returns to full strength.
(function () {
  const sidebar = document.querySelector(".section-sidebar .docs-sidebar");
  if (!sidebar) return;

  // A few pixels of slack, so the rubber band of a touchpad at the top of
  // the page does not make it flicker
  const TOP_SLACK_PX = 4;

  let queued = false;
  const apply = () => {
    queued = false;
    sidebar.classList.toggle("is-receded", window.scrollY > TOP_SLACK_PX);
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  };

  apply();
  window.addEventListener("scroll", schedule, { passive: true });
})();
