document.addEventListener('DOMContentLoaded', function () {
  const videoContainers = document.querySelectorAll('.youtube-video');
  const popupOverlay = document.querySelector('.popup-overlay');
  const acceptButton = document.querySelector('.popup-dialog .accept');
  const declineButton = document.querySelector('.popup-dialog .decline');

  // Vérifier si le consentement a déjà été donné
  const hasConsented = localStorage.getItem('youtubeConsent') === 'true';

  // Fonction pour charger une vidéo
  function loadYouTubeVideo(container, videoId) {
      container.innerHTML = `
          <iframe
             class="tuto-video"
              src="https://www.youtube-nocookie.com/embed/${videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"
          </iframe>
      `;
  }

  // Gestion des placeholders
  videoContainers.forEach(container => {
      const videoId = container.getAttribute('data-video-id');
      const placeholder = container.querySelector('.youtube-placeholder');

      if (hasConsented) {
          // Si le consentement est déjà donné, chargez directement les vidéos
          loadYouTubeVideo(container, videoId);
      } else {
          // Sinon, affichez le placeholder
          placeholder.addEventListener('click', () => {
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
          loadYouTubeVideo(container, videoId);
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
//   // Fonction pour charger une vidéo YouTube
//   function loadYouTubeVideo(container, videoId) {
//       container.innerHTML = `
//           <iframe
//               width="560"
//               height="315"
//               src="https://www.youtube-nocookie.com/embed/${videoId}"
//               frameborder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowfullscreen>
//           </iframe>
//       `;
//   }

//   // Vérifie si le consentement a déjà été donné
//   const hasConsented = localStorage.getItem('youtubeConsent') === 'true';

//   // Sélectionner toutes les vidéos avec la classe "youtube-video"
//   const videoContainers = document.querySelectorAll('.youtube-video');

//   videoContainers.forEach(container => {
//       const videoId = container.getAttribute('data-video-id');

//       if (hasConsented) {
//           // Si le consentement est déjà donné, charge directement la vidéo
//           loadYouTubeVideo(container, videoId);
//       } else {
//           // Sinon, affiche le placeholder
//           const placeholder = document.createElement('div');
//           placeholder.className = 'youtube-placeholder';
//           placeholder.innerHTML = `
//               <p>
//                 <strong>Ce site n'utilise aucun cookie à des fins de suivi ou d'analyse.</strong><br>
//                 Toutefois, en visionnant les vidéos intégrées (tutoriels YouTube), des cookies tiers peuvent être déposés par YouTube. Nous avons réduit le nombre de cookies possibles en utilisant l'option <em>youtube-nocookie.com</em>, mais certains cookies peuvent encore être utilisés par YouTube, notamment :<br>
//                 - <strong>Cookies de préférences :</strong> mémorisation des paramètres d'affichage.<br>
//                 - <strong>Cookies analytiques :</strong> collecte de statistiques sur l'utilisation des vidéos.<br>
//                 - <strong>Cookies publicitaires :</strong> personnalisation des annonces.<br>
//                 En acceptant, vous autorisez le chargement des vidéos et l'utilisation de ces cookies par YouTube. Consultez la
//                 <a href="https://policies.google.com/privacy" target="_blank">politique de confidentialité de YouTube</a> pour plus d'informations.
//               </p>
//               <button>Accepter et regarder</button>
//           `;

//           // Ajout de l'événement de clic au bouton
//           const button = placeholder.querySelector('button');
//           button.addEventListener('click', () => {
//               // Enregistre le consentement dans localStorage
//               localStorage.setItem('youtubeConsent', 'true');

//               // Charge toutes les vidéos sur la page
//               videoContainers.forEach(videoContainer => {
//                   const videoId = videoContainer.getAttribute('data-video-id');
//                   loadYouTubeVideo(videoContainer, videoId);
//               });
//           });

//           // Ajouter le placeholder au conteneur
//           container.appendChild(placeholder);
//       }
//   });
// });


