(() => {
  'use strict';

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.btn-copy');
    if (!btn) return;
    var codeBlock = btn.closest('.highlight');
    if (!codeBlock || !codeBlock.classList.contains('apptainer-pull')) return;
    var clist = Array.from(codeBlock.classList);
    var idx = clist.indexOf('apptainer-pull');
    if (idx !== -1 && idx < clist.length - 1) {
      var groupClass = clist[idx + 1];
      if (typeof gtag === 'function') {
        gtag('event', 'copy_apptainer_pull_test', {
          event_category: 'copy',
          event_label: groupClass,
          send_to: window.analyticsSettings?.gaId || undefined,
        });
      } else if (typeof ga === 'function') {
        ga('send', 'event', 'copy', 'apptainer_pull_test', groupClass);
      }
    }
  });
})();