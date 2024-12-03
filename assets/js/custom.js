// // // // Hidden content revealed with <select> "shortcut to apptainer commands" code selection // // //

// // Références des éléments
// const selectElement = document.getElementById('options');
// const contents = document.querySelectorAll('[id^="content-"]');

// // Écouter le changement de sélection
// selectElement.addEventListener('change', function() {
//     // Masquer tous les contenus
//     contents.forEach(content => content.classList.add('hidden'));

//     // Récupérer la valeur sélectionnée
//     const selectedValue = this.value;

//     // Afficher le contenu correspondant si la valeur n'est pas vide
//     if (selectedValue) {
//         const selectedContent = document.getElementById(`content-${selectedValue}`);
//         if (selectedContent) {
//             selectedContent.classList.remove('hidden');
//         }
//     }
// });

// // const selectElement = document.getElementById('options2');
// // const contents = document.querySelectorAll('[id^="content-"]');

// // // Écouter le changement de sélection
// // selectElement.addEventListener('change', function() {
// //     // Masquer tous les contenus
// //     contents.forEach(content => content.classList.add('hidden'));

// //     // Récupérer la valeur sélectionnée
// //     const selectedValue = this.value;

// //     // Afficher le contenu correspondant si la valeur n'est pas vide
// //     if (selectedValue) {
// //         const selectedContent = document.getElementById(`content-${selectedValue}`);
// //         if (selectedContent) {
// //             selectedContent.classList.remove('hidden');
// //         }
// //     }
// // });


// // // // END Hidden content revealed with <select> "shortcut to apptainer commands" code selection END // // //

// const selectElements = document.querySelectorAll('.form-select'); // Sélectionne tous les <select> avec la classe 'select-options'
// const contents = document.querySelectorAll('[id^="content-"]');

// // Fonction pour gérer le changement de sélection
// function handleSelectionChange() {
//     // Masquer tous les contenus
//     contents.forEach(content => content.classList.add('hidden'));

//     // Afficher les contenus correspondant aux valeurs sélectionnées de chaque <select>
//     selectElements.forEach(select => {
//         const selectedValue = select.value;
//         if (selectedValue) {
//             const selectedContent = document.getElementById(`content-${selectedValue}`);
//             if (selectedContent) {
//                 selectedContent.classList.remove('hidden');
//             }
//         }
//     });
// }

// // Ajouter l'événement 'change' à chaque <select>
// selectElements.forEach(select => {
//     select.addEventListener('change', handleSelectionChange);
// });

const selectElements = document.querySelectorAll('.select-options'); // Sélectionne tous les <select> avec la classe 'select-options'
const contents = document.querySelectorAll('[id^="content-"]');

// Fonction pour gérer le changement de sélection
function handleSelectionChange(event) {
    // Récupérer le <select> qui a déclenché l'événement
    const currentSelect = event.target;

    // Réinitialiser les autres <select>
    selectElements.forEach(select => {
        if (select !== currentSelect) {
            select.value = 'option0'; // Réinitialise l'autre <select>
        }
    });

    // Masquer tous les contenus
    contents.forEach(content => content.classList.add('hidden'));

    // Afficher le contenu correspondant à la valeur sélectionnée
    const selectedValue = currentSelect.value;
    if (selectedValue) {
        const selectedContent = document.getElementById(`content-${selectedValue}`);
        if (selectedContent) {
            selectedContent.classList.remove('hidden');
        }
    }
}

// Ajouter l'événement 'change' à chaque <select>
selectElements.forEach(select => {
    select.addEventListener('change', handleSelectionChange);
});


