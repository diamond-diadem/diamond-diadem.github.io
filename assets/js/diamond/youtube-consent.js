document.addEventListener('DOMContentLoaded', function () {
    const videoContainers = document.querySelectorAll('.youtube-video');
    const popupOverlay = document.querySelector('.popup-overlay');
    const acceptPopupButton = popupOverlay?.querySelector('.popup-dialog .accept');
    const declinePopupButton = popupOverlay?.querySelector('.popup-dialog .decline');
    const closePopupButton = popupOverlay?.querySelector('.popup-dialog .close-popup');
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptBannerButton = cookieBanner?.querySelector('.accept');
    const declineBannerButton = cookieBanner?.querySelector('.decline');
    const closeBannerButton = cookieBanner?.querySelector('.close-banner');

    // Vérifier si le consentement a déjà été donné
    const hasConsented = localStorage.getItem('youtubeConsent') === 'true';

    // Fonction pour charger une vidéo
    function loadYouTubeVideo(container, videoId, language) {
        container.innerHTML = `
            <iframe
                class="tuto-video"
                src="https://www.youtube-nocookie.com/embed/${videoId}?cc_lang_pref=${language}&cc_load_policy=1"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
        `;
    }

    // Fonction pour ajuster la taille de la police du bouton en fonction de la largeur du placeholder
    function adjustFontSize(placeholder) {
        const button = placeholder.querySelector('.popup-button');
        if (button) {
            const containerWidth = placeholder.offsetWidth; // Largeur réelle du conteneur
            const fontSize = Math.max(containerWidth * 0.04, 14); // Taille de la police : 4% de la largeur, minimum 14px
            button.style.fontSize = `${fontSize}px`;
            button.style.padding = `${fontSize * 0.4}px ${fontSize * 0.8}px`; // Padding proportionnel
        }
    }

    // Fonction pour afficher la bannière de cookies si nécessaire (page d'accueil)
    function showCookieBanner() {
        if (cookieBanner && !hasConsented) {
            cookieBanner.style.display = 'flex'; // Affiche la bannière
        }
    }

    // Fonction pour initialiser les placeholders
    function initializePlaceholders() {
        videoContainers.forEach(container => {
            const videoId = container.getAttribute('data-video-id');
            const language = container.getAttribute('language') || 'en';
            const placeholder = container.querySelector('.youtube-placeholder');
            const popupButton = placeholder?.querySelector('.popup-button');

            // Ajuster dynamiquement la taille du bouton
            adjustFontSize(placeholder);
            window.addEventListener('resize', () => adjustFontSize(placeholder));

            if (hasConsented) {
                // Si le consentement est déjà donné, chargez directement les vidéos
                loadYouTubeVideo(container, videoId, language);
            } else if (popupButton) {
                // Sinon, affichez le bouton dans le placeholder
                popupButton.addEventListener('click', () => {
                    if (popupOverlay) popupOverlay.style.display = 'block';
                });
            }
        });
    }

    // Initialisation des placeholders au chargement
    initializePlaceholders();

    // Afficher la bannière de cookies si elle est présente
    showCookieBanner();

    // Gérer les actions de la bannière (page d'accueil uniquement)
    if (cookieBanner) {
        acceptBannerButton?.addEventListener('click', () => {
            localStorage.setItem('youtubeConsent', 'true');
            cookieBanner.style.display = 'none'; // Masquer la bannière

            // Charger toutes les vidéos
            videoContainers.forEach(container => {
                const videoId = container.getAttribute('data-video-id');
                const language = container.getAttribute('language') || 'en';
                loadYouTubeVideo(container, videoId, language);
            });
        });

        declineBannerButton?.addEventListener('click', () => {
            localStorage.setItem('youtubeConsent', 'false');
            cookieBanner.style.display = 'none'; // Masquer la bannière
        });

        closeBannerButton?.addEventListener('click', () => {
            cookieBanner.style.display = 'none'; // Masquer la bannière
        });
    }

    // Gérer les actions de la popup (section "documentation" uniquement)
    if (popupOverlay) {
        acceptPopupButton?.addEventListener('click', () => {
            localStorage.setItem('youtubeConsent', 'true');
            popupOverlay.style.display = 'none'; // Masquer la popup

            // Charger toutes les vidéos
            videoContainers.forEach(container => {
                const videoId = container.getAttribute('data-video-id');
                const language = container.getAttribute('language') || 'en';
                loadYouTubeVideo(container, videoId, language);
            });
        });

        declinePopupButton?.addEventListener('click', () => {
            localStorage.setItem('youtubeConsent', 'false');
            popupOverlay.style.display = 'none'; // Masquer la popup
        });

        closePopupButton?.addEventListener('click', () => {
            popupOverlay.style.display = 'none'; // Masquer la bannière
        });
    }
});


// document.addEventListener('DOMContentLoaded', function () {
//     const videoContainers = document.querySelectorAll('.youtube-video');
//     const popupOverlay = document.querySelector('.popup-overlay');
//     const acceptPopupButton = document.querySelector('.popup-dialog .accept');
//     const declinePopupButton = document.querySelector('.popup-dialog .decline');
//     const cookieBanner = document.querySelector('.cookie-banner');
//     const acceptBannerButton = document.querySelector('.cookie-banner .accept');
//     const declineBannerButton = document.querySelector('.cookie-banner .decline');
//     const closeBannerButton = document.querySelector('.cookie-banner .close-banner');

//     // Vérifier si le consentement a déjà été donné
//     const hasConsented = localStorage.getItem('youtubeConsent') === 'true';

//     // Fonction pour charger une vidéo
//     function loadYouTubeVideo(container, videoId, language) {
//         container.innerHTML = `
//             <iframe
//                 class="tuto-video"
//                 src="https://www.youtube-nocookie.com/embed/${videoId}?cc_lang_pref=${language}&cc_load_policy=1"
//                 frameborder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
//             </iframe>
//         `;
//     }

//     // Fonction pour ajuster la taille de la police du bouton en fonction de la largeur du placeholder
//     function adjustFontSize(placeholder) {
//         const button = placeholder.querySelector('.popup-button');
//         if (button) {
//             const containerWidth = placeholder.offsetWidth; // Largeur réelle du conteneur
//             const fontSize = Math.max(containerWidth * 0.04, 14); // Taille de la police : 4% de la largeur, minimum 14px
//             button.style.fontSize = `${fontSize}px`;
//             button.style.padding = `${fontSize * 0.4}px ${fontSize * 0.8}px`; // Padding proportionnel
//         }
//     }

//     // Fonction pour afficher la bannière de cookies si nécessaire
//     function showCookieBanner() {
//         if (!hasConsented) {
//             cookieBanner.style.display = 'flex'; // Affiche la bannière
//         }
//     }

//     // Fonction pour initialiser les placeholders
//     function initializePlaceholders() {
//         videoContainers.forEach(container => {
//             const videoId = container.getAttribute('data-video-id');
//             const language = container.getAttribute('language') || 'en';
//             const placeholder = container.querySelector('.youtube-placeholder');
//             const popupButton = placeholder.querySelector('.popup-button');

//             // Ajuster dynamiquement la taille du bouton
//             adjustFontSize(placeholder);
//             window.addEventListener('resize', () => adjustFontSize(placeholder));

//             if (hasConsented) {
//                 // Si le consentement est déjà donné, chargez directement les vidéos
//                 loadYouTubeVideo(container, videoId, language);
//             } else if (popupButton) {
//                 // Sinon, affichez le bouton dans le placeholder
//                 popupButton.addEventListener('click', () => {
//                     // Afficher la fenêtre popup
//                     popupOverlay.style.display = 'block';
//                 });
//             }
//         });
//     }

//     // Initialisation des placeholders au chargement
//     initializePlaceholders();

//     // Afficher la bannière de cookies
//     showCookieBanner();

//     // Gérer les actions de la bannière
//     acceptBannerButton.addEventListener('click', () => {
//         localStorage.setItem('youtubeConsent', 'true');
//         cookieBanner.style.display = 'none'; // Masquer la bannière

//         // Charger toutes les vidéos
//         videoContainers.forEach(container => {
//             const videoId = container.getAttribute('data-video-id');
//             const language = container.getAttribute('language') || 'en';
//             loadYouTubeVideo(container, videoId, language);
//         });
//     });

//     declineBannerButton.addEventListener('click', () => {
//         localStorage.setItem('youtubeConsent', 'false');
//         cookieBanner.style.display = 'none'; // Masquer la bannière
//     });

//     closeBannerButton.addEventListener('click', () => {
//         cookieBanner.style.display = 'none'; // Masquer la bannière
//     });

//     // Gérer les actions de la popup
//     if (acceptPopupButton) {
//         acceptPopupButton.addEventListener('click', () => {
//             localStorage.setItem('youtubeConsent', 'true');
//             popupOverlay.style.display = 'none'; // Masquer la popup

//             // Charger toutes les vidéos
//             videoContainers.forEach(container => {
//                 const videoId = container.getAttribute('data-video-id');
//                 const language = container.getAttribute('language') || 'en';
//                 loadYouTubeVideo(container, videoId, language);
//             });
//         });
//     }

//     if (declinePopupButton) {
//         declinePopupButton.addEventListener('click', () => {
//             localStorage.setItem('youtubeConsent', 'false');
//             popupOverlay.style.display = 'none'; // Masquer la popup
//         });
//     }
// });



// document.addEventListener('DOMContentLoaded', function () {
//     const videoContainers = document.querySelectorAll('.youtube-video');
//     const popupOverlay = document.querySelector('.popup-overlay');
//     const acceptPopupButton = document.querySelector('.popup-dialog .accept');
//     const declinePopupButton = document.querySelector('.popup-dialog .decline');
//     const cookieBanner = document.querySelector('.cookie-banner');
//     const acceptBannerButton = document.querySelector('.cookie-banner .accept');
//     const declineBannerButton = document.querySelector('.cookie-banner .decline');
//     const closeBannerButton = document.querySelector('.cookie-banner .close-banner');

//     // Vérifier si le consentement a déjà été donné
//     const hasConsented = localStorage.getItem('youtubeConsent') === 'true';

//     // Fonction pour charger une vidéo
//     function loadYouTubeVideo(container, videoId, language) {
//         container.innerHTML = `
//             <iframe
//                 class="tuto-video"
//                 src="https://www.youtube-nocookie.com/embed/${videoId}?cc_lang_pref=${language}&cc_load_policy=1"
//                 frameborder="0"
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                 referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
//             </iframe>
//         `;
//     }

//     // Fonction pour ajuster la taille de la police du bouton en fonction de la largeur du placeholder
//     function adjustFontSize(placeholder) {
//         const button = placeholder.querySelector('.popup-button');
//         if (button) {
//             const containerWidth = placeholder.offsetWidth; // Largeur réelle du conteneur
//             const fontSize = Math.max(containerWidth * 0.04, 14); // Taille de la police : 4% de la largeur, minimum 14px
//             button.style.fontSize = `${fontSize}px`;
//             button.style.padding = `${fontSize * 0.4}px ${fontSize * 0.8}px`; // Padding proportionnel
//         }
//     }

//     // Fonction pour afficher la bannière de cookies si nécessaire
//     function showCookieBanner() {
//         if (!hasConsented) {
//             cookieBanner.style.display = 'flex'; // Affiche la bannière
//         }
//     }

//     // Fonction pour initialiser les placeholders
//     function initializePlaceholders() {
//         videoContainers.forEach(container => {
//             const videoId = container.getAttribute('data-video-id');
//             const language = container.getAttribute('language') || 'en';
//             const placeholder = container.querySelector('.youtube-placeholder');
//             const popupButton = placeholder.querySelector('.popup-button');

//             // Ajuster dynamiquement la taille du bouton
//             adjustFontSize(placeholder);
//             window.addEventListener('resize', () => adjustFontSize(placeholder));

//             if (hasConsented) {
//                 // Si le consentement est déjà donné, chargez directement les vidéos
//                 loadYouTubeVideo(container, videoId, language);
//             } else if (popupButton) {
//                 // Sinon, affichez le bouton dans le placeholder
//                 popupButton.addEventListener('click', () => {
//                     // Afficher la fenêtre popup
//                     popupOverlay.style.display = 'block';
//                 });
//             }
//         });
//     }

//     // Initialisation des placeholders au chargement
//     initializePlaceholders();

//     // Afficher la bannière de cookies
//     showCookieBanner();

//     // Gérer les actions de la bannière
//     acceptBannerButton.addEventListener('click', () => {
//         localStorage.setItem('youtubeConsent', 'true');
//         cookieBanner.style.display = 'none'; // Masquer la bannière

//         // Charger toutes les vidéos
//         videoContainers.forEach(container => {
//             const videoId = container.getAttribute('data-video-id');
//             const language = container.getAttribute('language') || 'en';
//             loadYouTubeVideo(container, videoId, language);
//         });
//     });

//     declineBannerButton.addEventListener('click', () => {
//         localStorage.setItem('youtubeConsent', 'false');
//         cookieBanner.style.display = 'none'; // Masquer la bannière
//     });

//     closeBannerButton.addEventListener('click', () => {
//         cookieBanner.style.display = 'none'; // Masquer la bannière
//     });

//     // Gérer les actions de la popup
//     acceptPopupButton.addEventListener('click', () => {
//         localStorage.setItem('youtubeConsent', 'true');
//         popupOverlay.style.display = 'none'; // Masquer la popup

//         // Charger toutes les vidéos
//         videoContainers.forEach(container => {
//             const videoId = container.getAttribute('data-video-id');
//             const language = container.getAttribute('language') || 'en';
//             loadYouTubeVideo(container, videoId, language);
//         });
//     });

//     declinePopupButton.addEventListener('click', () => {
//         localStorage.setItem('youtubeConsent', 'false');
//         popupOverlay.style.display = 'none'; // Masquer la popup
//     });
// });




