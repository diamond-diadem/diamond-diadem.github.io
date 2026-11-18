// Drives the contents rail beside the text:
//
// - .is-stuck once it pins under the header, so the stylesheet can fade it
//   while the reader is deep in the text. Measured against the text beside it
//   rather than against the CSS `top`: the two share a grid row, so the rail
//   sits level with the text until sticky starts holding it back, and any gap
//   means it is pinned. That keeps the offset in the stylesheet alone.
// - .is-yielding while a wide figure or block, which reaches across the rail's column,
//   passes beside it, so the rail steps aside instead of covering it.
(function () {
  const rail = document.querySelector("[data-rail]");
  const body = rail && rail.parentElement.querySelector(".article-split__body");
  if (!body) return;

  const wideFigures = body.querySelectorAll(".content-figure--wide, .content-wide");

  // A figure only gets in the way if it actually reaches into the rail, which
  // it does not when the column leaves it little room to grow
  const overlaps = (a, b) =>
    a.top < b.bottom && b.top < a.bottom && a.left < b.right && b.left < a.right;

  let queued = false;
  const apply = () => {
    queued = false;
    if (getComputedStyle(rail).position !== "sticky") return;
    const railBox = rail.getBoundingClientRect();
    rail.classList.toggle("is-stuck", railBox.top - body.getBoundingClientRect().top > 0.5);
    rail.classList.toggle(
      "is-yielding",
      [...wideFigures].some((figure) => overlaps(railBox, figure.getBoundingClientRect())),
    );
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(apply);
  };

  apply();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
})();
