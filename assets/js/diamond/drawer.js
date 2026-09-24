/*!
 * Drawers: full-height panels sliding over the page on small screens (see
 * _drawer.scss), opened by any button with data-drawer-toggle and
 * aria-controls. Without JS the panels open through the :target pseudo-class.
 */

(() => {
    'use strict';

    const root = document.documentElement;

    function setUpDrawer(toggle) {
        const panel = document.getElementById(toggle.getAttribute('aria-controls'));

        if (!panel) {
            return;
        }

        const backdrop = panel.nextElementSibling;
        const isOpen = () => panel.classList.contains('show');

        function open() {
            panel.classList.add('show');
            toggle.setAttribute('aria-expanded', 'true');
            root.classList.add('drawer-open');
            // Tab then moves through the panel, whose own focus shows no ring
            panel.focus({ preventScroll: true });
        }

        function close() {
            panel.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
            root.classList.remove('drawer-open');
        }

        function closeAndFocusToggle() {
            close();
            toggle.focus();
        }

        function onToggleClick() {
            if (isOpen()) {
                close();
            } else {
                open();
            }
        }

        // Close links and the backdrop point to "#" for the JS-free fallback
        function onDismissClick(event) {
            event.preventDefault();
            closeAndFocusToggle();
        }

        function onKeydown(event) {
            if (event.key === 'Escape' && isOpen()) {
                closeAndFocusToggle();
            }
        }

        // Tabbing out of the panel onto the page behind it closes the drawer
        function onFocusOut(event) {
            const next = event.relatedTarget;
            if (isOpen() && next && next !== toggle && !panel.contains(next)) {
                close();
            }
        }

        // On large screens the toggle is hidden and drawers are not used
        function onResize() {
            if (isOpen() && toggle.offsetParent === null) {
                close();
            }
        }

        toggle.addEventListener('click', onToggleClick);
        toggle.addEventListener('focusout', onFocusOut);
        panel.addEventListener('focusout', onFocusOut);
        panel.querySelectorAll('[data-drawer-close]').forEach((link) => link.addEventListener('click', onDismissClick));
        if (backdrop && backdrop.classList.contains('drawer-backdrop')) {
            backdrop.addEventListener('click', onDismissClick);
        }
        document.addEventListener('keydown', onKeydown);
        // A dialog opened from the drawer (e.g. search) replaces it
        document.addEventListener('show.bs.modal', close);
        window.addEventListener('resize', onResize);
    }

    document.querySelectorAll('[data-drawer-toggle]').forEach(setUpDrawer);
})();
