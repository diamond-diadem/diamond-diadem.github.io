document.addEventListener('DOMContentLoaded', function () {
    const videoContainers = document.querySelectorAll('.youtube-video');
    const popupOverlay = document.querySelector('.popup-overlay');
    const acceptButton = document.querySelector('.popup-dialog .accept');
    const declineButton = document.querySelector('.popup-dialog .decline');

    // Vérifier si le consentement a déjà été donné
    const hasConsented = localStorage.getItem('youtubeConsent') === 'true';

    // Fonction pour charger une vidéo
    function loadYouTubeVideo(container, videoId, language) {
        container.innerHTML = `
            <iframe
                class="tuto-video"
                src="https://www.youtube-nocookie.com/embed/${videoId}&cc_lang_pref=${language}&cc_load_policy=1"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
        `;
    }

    // Fonction pour ajuster la taille de la police du bouton en fonction de la largeur du placeholder
    function adjustFontSize(placeholder) {
        const button = placeholder.querySelector('.popup-button');
        const containerWidth = placeholder.offsetWidth; // Largeur réelle du conteneur
        const fontSize = containerWidth * 0.04; // Taille de la police : 4% de la largeur
        button.style.fontSize = `${fontSize}px`;
    }

    // Gestion des placeholders
    videoContainers.forEach(container => {
        const videoId = container.getAttribute('data-video-id');
        const language = container.getAttribute('language');
        const placeholder = container.querySelector('.youtube-placeholder');
        const popupButton = placeholder.querySelector('.popup-button');

        // Ajuster dynamiquement la taille du bouton
        adjustFontSize(placeholder);
        window.addEventListener('resize', () => adjustFontSize(placeholder));

        if (hasConsented) {
            // Si le consentement est déjà donné, chargez directement les vidéos
            loadYouTubeVideo(container, videoId, language);
        } else {
            // Sinon, affichez le bouton dans le placeholder
            popupButton.addEventListener('click', () => {
                // Afficher la fenêtre popup
                popupOverlay.style.display = 'block';
            });
        }
    });

    // Gérer l'acceptation
    acceptButton.addEventListener('click', () => {
        // Enregistrer le consentement
        localStorage.setItem('youtubeConsent', 'true');

        // Charger toutes les vidéos
        videoContainers.forEach(container => {
            const videoId = container.getAttribute('data-video-id');
            const language = container.getAttribute('language');
            loadYouTubeVideo(container, videoId, language);
        });

        // Fermer la popup
        popupOverlay.style.display = 'none';
    });

    // Gérer le refus
    declineButton.addEventListener('click', () => {
        // Fermer la popup sans action
        popupOverlay.style.display = 'none';
    });
});


// document.addEventListener('DOMContentLoaded', function () {
//     const videoContainers = document.querySelectorAll('.youtube-video');
//     const popupOverlay = document.querySelector('.popup-overlay');
//     const acceptButton = document.querySelector('.popup-dialog .accept');
//     const declineButton = document.querySelector('.popup-dialog .decline');

//     // Vérifier si le consentement a déjà été donné
//     const hasConsented = localStorage.getItem('youtubeConsent') === 'true';

//     // Fonction pour charger une vidéo
//     function loadYouTubeVideo(container, videoId) {
//         container.innerHTML = `
//             <iframe
//                 class="tuto-video"
//                 src="https://www.youtube-nocookie.com/embed/${videoId}"
//                 frameborder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
//             </iframe>
//         `;
//     }

//     // Gestion des placeholders
//     videoContainers.forEach(container => {
//         const videoId = container.getAttribute('data-video-id');
//         const placeholder = container.querySelector('.youtube-placeholder');
//         const popupButton = placeholder.querySelector('.popup-button');

//         if (hasConsented) {
//             // Si le consentement est déjà donné, chargez directement les vidéos
//             loadYouTubeVideo(container, videoId);
//         } else {
//             // Sinon, affichez le bouton dans le placeholder
//             popupButton.addEventListener('click', () => {
//                 // Afficher la fenêtre popup
//                 popupOverlay.style.display = 'block';
//             });
//         }
//     });

//     // Gérer l'acceptation
//     acceptButton.addEventListener('click', () => {
//         // Enregistrer le consentement
//         localStorage.setItem('youtubeConsent', 'true');

//         // Charger toutes les vidéos
//         videoContainers.forEach(container => {
//             const videoId = container.getAttribute('data-video-id');
//             loadYouTubeVideo(container, videoId);
//         });

//         // Fermer la popup
//         popupOverlay.style.display = 'none';
//     });

//     // Gérer le refus
//     declineButton.addEventListener('click', () => {
//         // Fermer la popup sans action
//         popupOverlay.style.display = 'none';
//     });
// });

// // document.addEventListener('DOMContentLoaded', function () {
// //   const videoContainers = document.querySelectorAll('.youtube-video');
// //   const popupOverlay = document.querySelector('.popup-overlay');
// //   const acceptButton = document.querySelector('.popup-dialog .accept');
// //   const declineButton = document.querySelector('.popup-dialog .decline');

// //   // Vérifier si le consentement a déjà été donné
// //   const hasConsented = localStorage.getItem('youtubeConsent') === 'true';

// //   // Fonction pour charger une vidéo
// //   function loadYouTubeVideo(container, videoId) {
// //       container.innerHTML = `
// //           <iframe
// //              class="tuto-video"
// //               src="https://www.youtube-nocookie.com/embed/${videoId}"
// //               frameborder="0"
// //               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
// //           </iframe>
// //       `;
// //   }

// //   // Gestion des placeholders
// //   videoContainers.forEach(container => {
// //       const videoId = container.getAttribute('data-video-id');
// //       const placeholder = container.querySelector('.youtube-placeholder');

// //       if (hasConsented) {
// //           // Si le consentement est déjà donné, chargez directement les vidéos
// //           loadYouTubeVideo(container, videoId);
// //       } else {
// //           // Sinon, affichez le placeholder
// //           placeholder.addEventListener('click', () => {
// //               // Afficher la fenêtre popup
// //               popupOverlay.style.display = 'block';
// //           });
// //       }
// //   });

// //   // Gérer l'acceptation
// //   acceptButton.addEventListener('click', () => {
// //       // Enregistrer le consentement
// //       localStorage.setItem('youtubeConsent', 'true');

// //       // Charger toutes les vidéos
// //       videoContainers.forEach(container => {
// //           const videoId = container.getAttribute('data-video-id');
// //           loadYouTubeVideo(container, videoId);
// //       });

// //       // Fermer la popup
// //       popupOverlay.style.display = 'none';
// //   });

// //   // Gérer le refus
// //   declineButton.addEventListener('click', () => {
// //       // Fermer la popup sans action
// //       popupOverlay.style.display = 'none';
// //   });
// // });
