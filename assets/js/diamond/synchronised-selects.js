// Sélectionnez toutes les listes déroulantes et contenus
const selectElements = document.querySelectorAll('.select-options'); // Tous les <select>
const contents = document.querySelectorAll('[id^="content-option"]'); // Tous les contenus cachés

// Fonction pour synchroniser les <select> et afficher le contenu
function synchronizeAndDisplay(selectedElement, pairedElementId, resetElementIds) {
    // Synchroniser le <select> correspondant
    const pairedElement = document.getElementById(pairedElementId);
    if (pairedElement) {
        pairedElement.selectedIndex = selectedElement.selectedIndex;
    }

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
        if (resetElement) {
            resetElement.selectedIndex = 0; // Réinitialiser à l'option "option0"
        }
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
