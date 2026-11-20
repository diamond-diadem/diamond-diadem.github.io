/*!
 * Header submenus are native <details> disclosures, which open and close
 * without JS. On large screens they float as dropdowns, so this closes them
 * the way a dropdown is expected to: on a click elsewhere, on Escape, or when
 * focus moves on, and plays the panel's closing transition first (the
 * .is-closing class, see _section-dropdown-navbar.scss). Inside the
 * small-screen drawer they stay put, expanded inline.
 */

(() => {
    'use strict';

    const disclosures = document.querySelectorAll('details.nav-disclosure');

    if (disclosures.length === 0) {
        return;
    }

    // Longer than the CSS transition, in case transitionend never comes
    const CLOSING_FALLBACK_MS = 250;

    const panelOf = (disclosure) => disclosure.querySelector('.dropdown-menu');

    const isFloatingOpen = (disclosure) =>
        disclosure.open && getComputedStyle(panelOf(disclosure)).position === 'absolute';

    const floatingOpen = () => Array.from(disclosures).filter(isFloatingOpen);

    function hasTransition(element) {
        return getComputedStyle(element)
            .transitionDuration.split(',')
            .some((duration) => parseFloat(duration) > 0);
    }

    function close(disclosure) {
        const panel = panelOf(disclosure);
        if (!hasTransition(panel)) {
            disclosure.open = false;
            return;
        }

        let done = false;
        const finish = () => {
            if (done) {
                return;
            }
            done = true;
            disclosure.classList.remove('is-closing');
            disclosure.open = false;
        };
        panel.addEventListener('transitionend', finish, { once: true });
        setTimeout(finish, CLOSING_FALLBACK_MS);
        disclosure.classList.add('is-closing');
    }

    function onSummaryClick(event) {
        const disclosure = event.currentTarget.parentElement;
        if (isFloatingOpen(disclosure)) {
            event.preventDefault();
            close(disclosure);
        }
    }

    function onDocumentClick(event) {
        floatingOpen()
            .filter((disclosure) => !disclosure.contains(event.target))
            .forEach(close);
    }

    function onKeydown(event) {
        if (event.key !== 'Escape') {
            return;
        }
        floatingOpen().forEach((disclosure) => {
            close(disclosure);
            disclosure.querySelector('summary').focus();
        });
    }

    function onFocusOut(event) {
        const disclosure = event.currentTarget;
        const next = event.relatedTarget;
        if (next && !disclosure.contains(next) && isFloatingOpen(disclosure)) {
            close(disclosure);
        }
    }

    document.addEventListener('click', onDocumentClick);
    document.addEventListener('keydown', onKeydown);
    disclosures.forEach((disclosure) => {
        disclosure.querySelector('summary').addEventListener('click', onSummaryClick);
        disclosure.addEventListener('focusout', onFocusOut);
    });
})();
