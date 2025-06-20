import Clipboard from 'clipboard';

(() => {
    'use strict';

    var cb = document.getElementsByClassName('highlight');

    for (var i = 0; i < cb.length; ++i) {
        var element = cb[i];
        element.insertAdjacentHTML('afterbegin', '<div class="copy"><button title="Copy to clipboard" class="btn-copy" aria-label="Clipboard button"><div></div></button></div>');
    }

    var clipboard = new Clipboard('.btn-copy', {
        target: function (trigger) {
            return trigger.parentNode.nextElementSibling;
        }
    });

    clipboard.on('success', function (e) {
        // Send click event to Google Analytics for apptainer-pull blocks only
        // Look for 'apptainer-pull' and the next class (e.g. 'abinit')
        var codeBlock = e.trigger.closest('.highlight');
        if (codeBlock && codeBlock.classList.contains('apptainer-pull')) {
            // Find all classes
            var clist = Array.from(codeBlock.classList);
            var idx = clist.indexOf('apptainer-pull');
            // The grouping class is the next one after 'apptainer-pull'
            if (idx !== -1 && idx < clist.length - 1) {
                var groupClass = clist[idx + 1];
                // Send event to Google Analytics
                if (typeof gtag === 'function') {
                    gtag('event', 'copy_apptainer_pull', {
                        'event_category': 'copy',
                        'event_label': groupClass
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

// /*!
//  * clipboard.js for Bootstrap based Thulite sites
//  * Copyright 2021-2024 Thulite
//  * Licensed under the MIT License
//  */

// import Clipboard from 'clipboard';

// (() => {
//     'use strict';

//     var cb = document.getElementsByClassName('highlight');

//     for (var i = 0; i < cb.length; ++i) {
//         var element = cb[i];
//         element.insertAdjacentHTML('afterbegin', '<div class="copy"><button title="Copy to clipboard" class="btn-copy" aria-label="Clipboard button"><div></div></button></div>');
//     }

//     var clipboard = new Clipboard('.btn-copy', {
//         target: function (trigger) {
//             return trigger.parentNode.nextElementSibling;
//         }
//     });

//     clipboard.on('success', function (e) {
//         /*
//       console.info('Action:', e.action);
//       console.info('Text:', e.text);
//       console.info('Trigger:', e.trigger);
//       */

//         e.clearSelection();
//     });

//     clipboard.on('error', function (e) {
//         console.error('Action:', e.action);
//         console.error('Trigger:', e.trigger);
//     });
// })();
