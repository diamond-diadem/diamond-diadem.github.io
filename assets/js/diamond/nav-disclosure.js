/*!
 * Header submenus are native <details> disclosures, which open and close
 * without JS. On large screens they float as dropdowns, so this closes them
 * the way a dropdown is expected to: on a click elsewhere, on Escape, or when
 * focus moves on. Inside the small-screen drawer they stay put, expanded inline.
 */

(() => {
    'use strict';

    const disclosures = document.querySelectorAll('details.nav-disclosure');

    if (disclosures.length === 0) {
        return;
    }

    const isFloatingOpen = (disclosure) =>
        disclosure.open && getComputedStyle(disclosure.querySelector('.dropdown-menu')).position === 'absolute';

    const floatingOpen = () => Array.from(disclosures).filter(isFloatingOpen);

    function onDocumentClick(event) {
        floatingOpen()
            .filter((disclosure) => !disclosure.contains(event.target))
            .forEach((disclosure) => {
                disclosure.open = false;
            });
    }

    function onKeydown(event) {
        if (event.key !== 'Escape') {
            return;
        }
        floatingOpen().forEach((disclosure) => {
            disclosure.open = false;
            disclosure.querySelector('summary').focus();
        });
    }

    function onFocusOut(event) {
        const disclosure = event.currentTarget;
        const next = event.relatedTarget;
        if (next && !disclosure.contains(next) && isFloatingOpen(disclosure)) {
            disclosure.open = false;
        }
    }

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeydown);
    disclosures.forEach((disclosure) => disclosure.addEventListener('focusout', onFocusOut));
})();
