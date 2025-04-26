// cookies-consent-final.js

document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const videoContainers = document.querySelectorAll('.youtube-video');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupCustomization = document.querySelector('.popup-customization-overlay');
    const cookieBanner = document.querySelector('.cookie-banner');

    // Buttons
    const acceptBannerButton = cookieBanner?.querySelector('.accept');
    const declineBannerButton = cookieBanner?.querySelector('.decline');
    const closeBannerButton = cookieBanner?.querySelector('.close-banner');
    const acceptAllButton = document.querySelector('.accept-all');
    const declineAllButton = document.querySelector('.decline-all');
    const customizeButton = document.querySelector('.customize');
    const acceptPopupButton = popupOverlay?.querySelector('.popup-dialog .accept');
    const declinePopupButton = popupOverlay?.querySelector('.popup-dialog .decline');
    const closePopupButton = popupOverlay?.querySelector('.popup-dialog .close-popup');
    const validatePreferencesButton = document.querySelector('.validate-preferences');
    const cancelPreferencesButton = document.querySelector('.cancel-preferences');
    const closePopupCustomizationButton = document.querySelector('.close-popup-customization');

    const siteLanguage = document.documentElement.lang;

    // Consent status
    const hasYouTubeConsented = localStorage.getItem('youtubeConsent') === 'true';
    const hasYouTubeRefused = localStorage.getItem('youtubeConsent') === 'false';
    const hasAnalyticsConsented = localStorage.getItem('analyticsConsent') === 'true';

    // Functions
    function loadYouTubeVideo(container, videoId, siteLanguage) {
        container.innerHTML = `
            <iframe
                class="tuto-video"
                src="https://www.youtube-nocookie.com/embed/${videoId}?cc_lang_pref=${siteLanguage}&cc_load_policy=1"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
            </iframe>
        `;
    }

    function loadGoogleAnalytics() {
        if (window.gtagLoaded) return;
        window.gtagLoaded = true;

        const script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=:G-1G3K8JZG98'; // Remplacer TON-ID-GA
        script.async = true;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', ':G-1G3K8JZG98'); // Remplacer aussi ici
    }

    function adjustFontSize(placeholder) {
        const button = placeholder.querySelector('.popup-button');
        if (button) {
            const containerWidth = placeholder.offsetWidth;
            const fontSize = Math.max(containerWidth * 0.04, 14);
            button.style.fontSize = `${fontSize}px`;
            button.style.padding = `${fontSize * 0.4}px ${fontSize * 0.8}px`;
        }
    }

    function initializePlaceholders() {
        videoContainers.forEach(container => {
            const videoId = container.getAttribute('data-video-id');
            const language = container.getAttribute('language') || 'en';
            const placeholder = container.querySelector('.youtube-placeholder');
            const popupButton = placeholder?.querySelector('.popup-button');

            adjustFontSize(placeholder);
            window.addEventListener('resize', () => adjustFontSize(placeholder));

            if (localStorage.getItem('youtubeConsent') === 'true') {
                loadYouTubeVideo(container, videoId, language);
            } else if (popupButton) {
                popupButton.addEventListener('click', () => {
                    if (popupOverlay) popupOverlay.style.display = 'block';
                });
            }
        });
    }

    function showCookieBanner() {
        if (cookieBanner && !hasYouTubeConsented && !hasYouTubeRefused) {
            cookieBanner.style.display = 'flex';
        }
    }

    // Actions sur la bannière
    acceptAllButton?.addEventListener('click', () => {
        localStorage.setItem('analyticsConsent', 'true');
        localStorage.setItem('youtubeConsent', 'true');
        cookieBanner.style.display = 'none';
        loadGoogleAnalytics();
        initializePlaceholders();
    });

    declineAllButton?.addEventListener('click', () => {
        localStorage.setItem('analyticsConsent', 'false');
        localStorage.setItem('youtubeConsent', 'false');
        cookieBanner.style.display = 'none';
    });

    customizeButton?.addEventListener('click', () => {
        popupCustomization.style.display = 'flex';
    });

    closeBannerButton?.addEventListener('click', () => {
        cookieBanner.style.display = 'none';
    });
    

    cancelPreferencesButton?.addEventListener('click', () => {
        popupCustomization.style.display = 'none';
    });

    closePopupCustomizationButton?.addEventListener('click', () => {
        popupCustomization.style.display = 'none';
    });

    validatePreferencesButton?.addEventListener('click', (e) => {
        e.preventDefault();
        const form = document.getElementById('cookie-preferences');
        const analyticsConsent = form.analyticsConsent.checked;
        const youtubeConsent = form.youtubeConsent.checked;

        localStorage.setItem('analyticsConsent', analyticsConsent ? 'true' : 'false');
        localStorage.setItem('youtubeConsent', youtubeConsent ? 'true' : 'false');

        popupCustomization.style.display = 'none';

        if (analyticsConsent) loadGoogleAnalytics();
        if (youtubeConsent) initializePlaceholders();
    });

    // Actions sur le popup pour cliquer sur la vidéo (popupOverlay)
    acceptPopupButton?.addEventListener('click', () => {
        localStorage.setItem('youtubeConsent', 'true');
        popupOverlay.style.display = 'none';
        initializePlaceholders();
    });

    declinePopupButton?.addEventListener('click', () => {
        localStorage.setItem('youtubeConsent', 'false');
        popupOverlay.style.display = 'none';
    });

    closePopupButton?.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });

    // Initialisation
    if (hasAnalyticsConsented) loadGoogleAnalytics();
    initializePlaceholders();
    showCookieBanner();
});

// document.addEventListener('DOMContentLoaded', function () {
//     const videoContainers = document.querySelectorAll('.youtube-video');
//     const popupOverlay = document.querySelector('.popup-overlay');
//     const acceptPopupButton = popupOverlay?.querySelector('.popup-dialog .accept');
//     const declinePopupButton = popupOverlay?.querySelector('.popup-dialog .decline');
//     const closePopupButton = popupOverlay?.querySelector('.popup-dialog .close-popup');
//     const cookieBanner = document.querySelector('.cookie-banner');
//     const acceptBannerButton = cookieBanner?.querySelector('.accept');
//     const declineBannerButton = cookieBanner?.querySelector('.decline');
//     const closeBannerButton = cookieBanner?.querySelector('.close-banner');
//     const siteLanguage = document.documentElement.lang;

//     const customizeButton = document.querySelector('.customize');
//     const popupCustomization = document.querySelector('.popup-customization-overlay');
//     const validatePreferencesButton = document.querySelector('.validate-preferences');
//     const cancelPreferencesButton = document.querySelector('.cancel-preferences');
//     const closePopupCustomizationButton = document.querySelector('.close-popup-customization');

//     const acceptAllButton = document.querySelector('.accept-all');
//     const declineAllButton = document.querySelector('.decline-all');
//     // const customizeButton = document.querySelector('.customize'); // ça tu avais déjà normalement
//     // const cookieBanner = document.querySelector('.cookie-banner'); // au cas où

//     // Clique sur "Tout accepter"
//     acceptAllButton?.addEventListener('click', () => {
//         localStorage.setItem('analyticsConsent', 'true');
//         localStorage.setItem('youtubeConsent', 'true');

//         cookieBanner.style.display = 'none';

//         loadGoogleAnalytics();
//         initializeVideos();
//     });

//     // Clique sur "Tout refuser"
//     declineAllButton?.addEventListener('click', () => {
//         localStorage.setItem('analyticsConsent', 'false');
//         localStorage.setItem('youtubeConsent', 'false');

//         cookieBanner.style.display = 'none';
//     });

// // Clique sur "Personnaliser" => géré déjà pour ouvrir le popup (cf. message précédent)

    
//     // Ouvrir le popup
//     customizeButton?.addEventListener('click', () => {
//         popupCustomization.style.display = 'flex';
//     });

//     // Fermer le popup
//     cancelPreferencesButton?.addEventListener('click', () => {
//         popupCustomization.style.display = 'none';
//     });
//     closePopupCustomizationButton?.addEventListener('click', () => {
//         popupCustomization.style.display = 'none';
//     });

//     // Valider les préférences
//     validatePreferencesButton?.addEventListener('click', (e) => {
//         e.preventDefault();
//         const form = document.getElementById('cookie-preferences');
//         const analyticsConsent = form.analyticsConsent.checked;
//         const youtubeConsent = form.youtubeConsent.checked;

//         localStorage.setItem('analyticsConsent', analyticsConsent ? 'true' : 'false');
//         localStorage.setItem('youtubeConsent', youtubeConsent ? 'true' : 'false');

//         popupCustomization.style.display = 'none';

//         if (analyticsConsent) {
//             loadGoogleAnalytics();
//         }

//         if (youtubeConsent) {
//             initializeVideos();
//         }
//     });


//     // Vérifier si le consentement a déjà été donné
//     const hasConsented = localStorage.getItem('youtubeConsent') === 'true';
//     const hasRefused = localStorage.getItem('youtubeConsent') === 'false';

//     // Fonction pour charger une vidéo
//     function loadYouTubeVideo(container, videoId, siteLanguage) {
//         container.innerHTML = `
//             <iframe
//                 class="tuto-video"
//                 src="https://www.youtube-nocookie.com/embed/${videoId}&cc_lang_pref=${siteLanguage}&cc_load_policy=1"
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

//     // Fonction pour afficher la bannière de cookies si nécessaire (page d'accueil)
//     function showCookieBanner() {
//         if (cookieBanner && !hasConsented && !hasRefused) {
//             cookieBanner.style.display = 'flex'; // Affiche la bannière
//         }
//     }

//     // Fonction pour initialiser les placeholders
//     function initializePlaceholders() {
//         videoContainers.forEach(container => {
//             const videoId = container.getAttribute('data-video-id');
//             const language = container.getAttribute('language') || 'en';
//             const placeholder = container.querySelector('.youtube-placeholder');
//             const popupButton = placeholder?.querySelector('.popup-button');

//             // Ajuster dynamiquement la taille du bouton
//             adjustFontSize(placeholder);
//             window.addEventListener('resize', () => adjustFontSize(placeholder));

//             if (hasConsented) {
//                 // Si le consentement est déjà donné, chargez directement les vidéos
//                 loadYouTubeVideo(container, videoId, language);
//             } else if (popupButton) {
//                 // Sinon, affichez le bouton dans le placeholder
//                 popupButton.addEventListener('click', () => {
//                     if (popupOverlay) popupOverlay.style.display = 'block';
//                 });
//             }
//         });
//     }

//     // Initialisation des placeholders au chargement
//     initializePlaceholders();

//     // Afficher la bannière de cookies si elle est présente
//     showCookieBanner();

//     // Gérer les actions de la bannière (page d'accueil uniquement)
//     if (cookieBanner) {
//         acceptBannerButton?.addEventListener('click', () => {
//             localStorage.setItem('youtubeConsent', 'true');
//             cookieBanner.style.display = 'none'; // Masquer la bannière

//             // Charger toutes les vidéos
//             videoContainers.forEach(container => {
//                 const videoId = container.getAttribute('data-video-id');
//                 const language = container.getAttribute('language') || 'en';
//                 loadYouTubeVideo(container, videoId, language);
//             });
//         });

//         declineBannerButton?.addEventListener('click', () => {
//             localStorage.setItem('youtubeConsent', 'false');
//             cookieBanner.style.display = 'none'; // Masquer la bannière
//         });

//         closeBannerButton?.addEventListener('click', () => {
//             cookieBanner.style.display = 'none'; // Masquer la bannière
//         });
//     }

//     // Gérer les actions de la popup (section "documentation" uniquement)
//     if (popupOverlay) {
//         acceptPopupButton?.addEventListener('click', () => {
//             localStorage.setItem('youtubeConsent', 'true');
//             popupOverlay.style.display = 'none'; // Masquer la popup

//             // Charger toutes les vidéos
//             videoContainers.forEach(container => {
//                 const videoId = container.getAttribute('data-video-id');
//                 const language = container.getAttribute('language') || 'en';
//                 loadYouTubeVideo(container, videoId, language);
//             });
//         });

//         declinePopupButton?.addEventListener('click', () => {
//             localStorage.setItem('youtubeConsent', 'false');
//             popupOverlay.style.display = 'none'; // Masquer la popup
//         });

//         closePopupButton?.addEventListener('click', () => {
//             popupOverlay.style.display = 'none'; // Masquer la popup
//         });
//     }
// });

// document.addEventListener('DOMContentLoaded', function () {
//     const videoContainers = document.querySelectorAll('.youtube-video');
//     const popupOverlay = document.querySelector('.popup-overlay');
//     const acceptPopupButton = popupOverlay?.querySelector('.popup-dialog .accept');
//     const declinePopupButton = popupOverlay?.querySelector('.popup-dialog .decline');
//     const closePopupButton = popupOverlay?.querySelector('.popup-dialog .close-popup');
//     const cookieBanner = document.querySelector('.cookie-banner');
//     const acceptBannerButton = cookieBanner?.querySelector('.accept');
//     const declineBannerButton = cookieBanner?.querySelector('.decline');
//     const closeBannerButton = cookieBanner?.querySelector('.close-banner');
//     const siteLanguage = document.documentElement.lang;

//     // Vérifier si le consentement a déjà été donné
//     const hasConsented = localStorage.getItem('youtubeConsent') === 'true';

//     // Fonction pour charger une vidéo
//     function loadYouTubeVideo(container, videoId, siteLanguage) {
//         container.innerHTML = `
//             <iframe
//                 class="tuto-video"
//                 src="https://www.youtube-nocookie.com/embed/${videoId}&cc_lang_pref=${siteLanguage}&cc_load_policy=1"
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

//     // Fonction pour afficher la bannière de cookies si nécessaire (page d'accueil)
//     function showCookieBanner() {
//         if (cookieBanner && !hasConsented) {
//             cookieBanner.style.display = 'flex'; // Affiche la bannière
//         }
//     }

//     // Fonction pour initialiser les placeholders
//     function initializePlaceholders() {
//         videoContainers.forEach(container => {
//             const videoId = container.getAttribute('data-video-id');
//             const language = container.getAttribute('language') || 'en';
//             const placeholder = container.querySelector('.youtube-placeholder');
//             const popupButton = placeholder?.querySelector('.popup-button');

//             // Ajuster dynamiquement la taille du bouton
//             adjustFontSize(placeholder);
//             window.addEventListener('resize', () => adjustFontSize(placeholder));

//             if (hasConsented) {
//                 // Si le consentement est déjà donné, chargez directement les vidéos
//                 loadYouTubeVideo(container, videoId, language);
//             } else if (popupButton) {
//                 // Sinon, affichez le bouton dans le placeholder
//                 popupButton.addEventListener('click', () => {
//                     if (popupOverlay) popupOverlay.style.display = 'block';
//                 });
//             }
//         });
//     }

//     // Initialisation des placeholders au chargement
//     initializePlaceholders();

//     // Afficher la bannière de cookies si elle est présente
//     showCookieBanner();

//     // Gérer les actions de la bannière (page d'accueil uniquement)
//     if (cookieBanner) {
//         acceptBannerButton?.addEventListener('click', () => {
//             localStorage.setItem('youtubeConsent', 'true');
//             cookieBanner.style.display = 'none'; // Masquer la bannière

//             // Charger toutes les vidéos
//             videoContainers.forEach(container => {
//                 const videoId = container.getAttribute('data-video-id');
//                 const language = container.getAttribute('language') || 'en';
//                 loadYouTubeVideo(container, videoId, language);
//             });
//         });

//         declineBannerButton?.addEventListener('click', () => {
//             localStorage.setItem('youtubeConsent', 'false');
//             cookieBanner.style.display = 'none'; // Masquer la bannière
//         });

//         closeBannerButton?.addEventListener('click', () => {
//             cookieBanner.style.display = 'none'; // Masquer la bannière
//         });
//     }

//     // Gérer les actions de la popup (section "documentation" uniquement)
//     if (popupOverlay) {
//         acceptPopupButton?.addEventListener('click', () => {
//             localStorage.setItem('youtubeConsent', 'true');
//             popupOverlay.style.display = 'none'; // Masquer la popup

//             // Charger toutes les vidéos
//             videoContainers.forEach(container => {
//                 const videoId = container.getAttribute('data-video-id');
//                 const language = container.getAttribute('language') || 'en';
//                 loadYouTubeVideo(container, videoId, language);
//             });
//         });

//         declinePopupButton?.addEventListener('click', () => {
//             localStorage.setItem('youtubeConsent', 'false');
//             popupOverlay.style.display = 'none'; // Masquer la popup
//         });

//         closePopupButton?.addEventListener('click', () => {
//             popupOverlay.style.display = 'none'; // Masquer la bannière
//         });
//     }
// });


