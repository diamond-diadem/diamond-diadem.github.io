import Clipboard from 'clipboard';

(() => {
    'use strict';

    var cb = document.getElementsByClassName('highlight');

    for (var i = 0; i < cb.length; ++i) {
        var element = cb[i];
        element.insertAdjacentHTML(
            'afterbegin',
            '<div class="copy"><button title="Copy to clipboard" class="btn-copy" aria-label="Clipboard button"><div></div></button></div>'
        );
    }

    var clipboard = new Clipboard('.btn-copy', {
        target: function (trigger) {
            return trigger.parentNode.nextElementSibling;
        }
    });

    clipboard.on('success', function (e) {
        var codeBlock = e.trigger.closest('.highlight');
        if (codeBlock) {
            var pre = codeBlock.querySelector('pre');
            var firstLine = pre ? pre.textContent.trim().split(/\r?\n/)[0] : '';
            var match = firstLine.match(/^apptainer pull ([a-z0-9_-]+)\.sif/);
            if (match) {
                var groupClass = match[1];
                if (typeof gtag === 'function') {
                    gtag('event', 'copy_apptainer_pull', {
                        event_category: 'copy',
                        event_label: groupClass,
                        send_to: window.analyticsSettings?.gaId || undefined
                    });
                } else if (typeof ga === 'function') {
                    ga('send', 'event', 'copy', 'apptainer_pull', groupClass);
                }
            }
        }
        e.clearSelection();
    });

    clipboard.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
})();