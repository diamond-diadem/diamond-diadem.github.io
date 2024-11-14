// // // Hidden content revealed with <select> "shortcut to apptainer commands" code selection // // //

// Références des éléments
const selectElement = document.getElementById('options');
const contents = document.querySelectorAll('[id^="content-"]');

// Écouter le changement de sélection
selectElement.addEventListener('change', function() {
    // Masquer tous les contenus
    contents.forEach(content => content.classList.add('hidden'));

    // Récupérer la valeur sélectionnée
    const selectedValue = this.value;

    // Afficher le contenu correspondant si la valeur n'est pas vide
    if (selectedValue) {
        const selectedContent = document.getElementById(`content-${selectedValue}`);
        if (selectedContent) {
            selectedContent.classList.remove('hidden');
        }
    }
});

// // // END Hidden content revealed with <select> "shortcut to apptainer commands" code selection END // // //




