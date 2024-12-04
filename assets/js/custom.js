// // // // // Hidden content revealed with <select> "shortcut to apptainer commands" code selection // // //

// const selectElements = document.querySelectorAll('.select-options'); // Sélectionne tous les <select> avec la classe 'select-options'
// const contents = document.querySelectorAll('[id^="content-"]');

// // Fonction pour gérer le changement de sélection
// function handleSelectionChange(event) {
//     // Récupérer le <select> qui a déclenché l'événement
//     const currentSelect = event.target;

//     // Réinitialiser les autres <select>
//     selectElements.forEach(select => {
//         if (select !== currentSelect) {
//             select.value = 'option0'; // Réinitialise l'autre <select>
//         }
//     });

//     // Masquer tous les contenus
//     contents.forEach(content => content.classList.add('hidden'));

//     // Afficher le contenu correspondant à la valeur sélectionnée
//     const selectedValue = currentSelect.value;
//     if (selectedValue) {
//         const selectedContent = document.getElementById(`content-${selectedValue}`);
//         if (selectedContent) {
//             selectedContent.classList.remove('hidden');
//         }
//     }
// }

// // Ajouter l'événement 'change' à chaque <select>
// selectElements.forEach(select => {
//     select.addEventListener('change', handleSelectionChange);
// });

// document.getElementById('options1A').addEventListener('change', function () {
//     document.getElementById('options1B').selectedIndex = this.selectedIndex;
// });

// document.getElementById('options1B').addEventListener('change', function () {
//     document.getElementById('options1A').selectedIndex = this.selectedIndex;
// });

// document.getElementById('options2A').addEventListener('change', function () {
//     document.getElementById('options2B').selectedIndex = this.selectedIndex;
// });

// document.getElementById('options2B').addEventListener('change', function () {
//     document.getElementById('options2A').selectedIndex = this.selectedIndex;
// });

// Hidden content revealed with <select> "shortcut to apptainer commands" code selection

// const selectElements = document.querySelectorAll('.select-options'); // Sélectionne tous les <select> avec la classe 'select-options'
// const contents = document.querySelectorAll('[id^="content-"]');

// // Fonction pour gérer le changement de sélection
// function handleSelectionChange(event) {
//     // Récupérer le <select> qui a déclenché l'événement
//     const currentSelect = event.target;

//     // Réinitialiser les autres <select>
//     selectElements.forEach(select => {
//         if (select !== currentSelect) {
//             select.value = 'option0'; // Réinitialise l'autre <select>
//         }
//     });

//     // Masquer tous les contenus
//     contents.forEach(content => content.classList.add('hidden'));

//     // Afficher le contenu correspondant à la valeur sélectionnée
//     const selectedValue = currentSelect.value;
//     if (selectedValue) {
//         const selectedContent = document.getElementById(`content-${selectedValue}`);
//         if (selectedContent) {
//             selectedContent.classList.remove('hidden');
//         }
//     }
// }

// // Ajouter l'événement 'change' à chaque <select>
// selectElements.forEach(select => {
//     select.addEventListener('change', handleSelectionChange);
// });

// // Synchronisation des <select> en fonction de l'index
// document.getElementById('options1A').addEventListener('change', function () {
//     const selectedIndex = this.selectedIndex;
//     document.getElementById('options1B').selectedIndex = selectedIndex;
//     synchronizeContent(selectedIndex); // Synchronise le contenu
// });

// document.getElementById('options1B').addEventListener('change', function () {
//     const selectedIndex = this.selectedIndex;
//     document.getElementById('options1A').selectedIndex = selectedIndex;
//     synchronizeContent(selectedIndex); // Synchronise le contenu
// });

// document.getElementById('options2A').addEventListener('change', function () {
//     const selectedIndex = this.selectedIndex;
//     document.getElementById('options2B').selectedIndex = selectedIndex;
//     synchronizeContent(selectedIndex); // Synchronise le contenu
// });

// document.getElementById('options2B').addEventListener('change', function () {
//     const selectedIndex = this.selectedIndex;
//     document.getElementById('options2A').selectedIndex = selectedIndex;
//     synchronizeContent(selectedIndex); // Synchronise le contenu
// });

// // Fonction pour synchroniser le contenu affiché en fonction de l'index
// function synchronizeContent(index) {
//     // Masquer tous les contenus
//     contents.forEach(content => content.classList.add('hidden'));

//     // Afficher le contenu correspondant à l'index synchronisé
//     const correspondingContent = document.getElementById(`content-option${index}`);
//     if (correspondingContent) {
//         correspondingContent.classList.remove('hidden');
//     }
// }



// // Sélectionnez toutes les listes déroulantes et contenus
// const selectElements = document.querySelectorAll('.select-options'); // Tous les <select>
// const contents = document.querySelectorAll('[id^="content-option"]'); // Tous les contenus cachés

// // Fonction pour synchroniser les <select> et afficher le contenu
// function synchronizeAndDisplay(selectedElement, pairedElementId, resetElementIds) {
//     // Synchroniser le <select> correspondant
//     const pairedElement = document.getElementById(pairedElementId);
//     pairedElement.selectedIndex = selectedElement.selectedIndex;

//     // Réinitialiser les autres paires à "option0"
//     resetElementIds.forEach(resetId => {
//         const resetElement = document.getElementById(resetId);
//         resetElement.selectedIndex = 0; // Réinitialiser à l'option "option0"
//     });

//     // Masquer tous les contenus
//     contents.forEach(content => content.classList.add('hidden'));

//     // Afficher le contenu correspondant à l'option sélectionnée
//     const selectedValue = selectedElement.value;
//     const correspondingContent = document.getElementById(`content-${selectedValue}`);
//     if (correspondingContent) {
//         correspondingContent.classList.remove('hidden');
//     }
// }

// // Ajouter des gestionnaires d'événements pour les synchronisations et affichages
// document.getElementById('options1A').addEventListener('change', function () {
//     synchronizeAndDisplay(this, 'options1B', ['options2A', 'options2B']);
// });

// document.getElementById('options1B').addEventListener('change', function () {
//     synchronizeAndDisplay(this, 'options1A', ['options2A', 'options2B']);
// });

// document.getElementById('options2A').addEventListener('change', function () {
//     synchronizeAndDisplay(this, 'options2B', ['options1A', 'options1B']);
// });

// document.getElementById('options2B').addEventListener('change', function () {
//     synchronizeAndDisplay(this, 'options2A', ['options1A', 'options1B']);
// });



// Sélectionnez toutes les listes déroulantes et contenus
const selectElements = document.querySelectorAll('.select-options'); // Tous les <select>
const contents = document.querySelectorAll('[id^="content-option"]'); // Tous les contenus cachés

// Fonction pour synchroniser les <select> et afficher le contenu
function synchronizeAndDisplay(selectedElement, pairedElementId, resetElementIds) {
    // Synchroniser le <select> correspondant
    const pairedElement = document.getElementById(pairedElementId);
    pairedElement.selectedIndex = selectedElement.selectedIndex;

    // Masquer tous les contenus
    contents.forEach(content => content.classList.add('hidden'));

    // Afficher les contenus correspondant à l'option sélectionnée dans la paire
    const selectedValue = selectedElement.value;
    if (selectedValue) {
        const correspondingContent1 = document.getElementById(`content-${selectedValue}`);
        const correspondingContent2 = document.getElementById(`content-${pairedElement.value}`);
        if (correspondingContent1) {
            correspondingContent1.classList.remove('hidden');
        }
        if (correspondingContent2) {
            correspondingContent2.classList.remove('hidden');
        }
    }

    // Réinitialiser les autres paires à "option0"
    resetElementIds.forEach(resetId => {
        const resetElement = document.getElementById(resetId);
        resetElement.selectedIndex = 0; // Réinitialiser à l'option "option0"
    });
}

// Ajouter des gestionnaires d'événements pour les synchronisations et affichages
document.getElementById('options1A').addEventListener('change', function () {
    synchronizeAndDisplay(this, 'options1B', ['options2A', 'options2B']);
});

document.getElementById('options1B').addEventListener('change', function () {
    synchronizeAndDisplay(this, 'options1A', ['options2A', 'options2B']);
});

document.getElementById('options2A').addEventListener('change', function () {
    synchronizeAndDisplay(this, 'options2B', ['options1A', 'options1B']);
});

document.getElementById('options2B').addEventListener('change', function () {
    synchronizeAndDisplay(this, 'options2A', ['options1A', 'options1B']);
});






