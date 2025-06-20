(() => {
  'use strict';

  document.addEventListener('click', function (e) {
        var btn = e.target.closest('.btn-copy');
        if (!btn) return;
        var codeBlock = btn.closest('.highlight');
        if (!codeBlock) return;
        var pre = codeBlock.querySelector('pre');
        var firstLine = pre ? pre.textContent.trim().split(/\r?\n/)[0] : '';
        var match = firstLine.match(/^apptainer pull ([a-z0-9_-]+)\.sif/);
        if (match) {
            var groupClass = match[1];
            if (typeof gtag === 'function') {
                gtag('event', 'copy_apptainer_pull_test', {
                    event_category: 'copy',
                    event_label: groupClass,
                    send_to: window.analyticsSettings?.gaId || undefined
                });
            } else if (typeof ga === 'function') {
                ga('send', 'event', 'copy', 'apptainer_pull_test', groupClass);
            }
        }
    });
})();