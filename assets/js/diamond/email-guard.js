// Guarded email addresses: puts back in order the parts of each address
// reversed by the guarded-email partial, then turns the guard into a mailto:
// link keeping its classes and content. Without this script the address stays
// shown, as reversed text put back in order by CSS, but cannot be clicked.
(function () {
  // Older browsers keep the reversed text, which still reads correctly
  if (!Array.from || !Element.prototype.replaceWith) {
    return;
  }

  function reverse(text) {
    return Array.from(text).reverse().join('');
  }

  function toLink(guard) {
    const parts = Array.from(guard.querySelectorAll('[data-email-guard-part]'));
    parts.forEach((part) => {
      part.textContent = reverse(part.textContent);
    });

    const link = document.createElement('a');
    link.href = 'mailto:' + parts.map((part) => part.textContent).join('');
    link.className = guard.className;
    link.classList.remove('email-guard');

    const text = guard.dataset.text;
    if (text) {
      guard.querySelector('[data-email-guard-address]').replaceWith(document.createTextNode(text));
    }

    while (guard.firstChild) {
      link.appendChild(guard.firstChild);
    }
    guard.replaceWith(link);
  }

  document.querySelectorAll('[data-email-guard]').forEach(toLink);
})();
