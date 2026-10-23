// Sélectionnez tous les contenus cachés.
const contents = document.querySelectorAll('[id^="content-option"]');

// Fonction pour synchroniser les <select> et afficher le contenu
function synchronizeAndDisplay(selectedElement, pairedElementId, resetElementIds) {
    const pairedElement = document.getElementById(pairedElementId);
    if (pairedElement) {
        pairedElement.selectedIndex = selectedElement.selectedIndex;
    }

    contents.forEach((content) => content.classList.add('hidden'));

    const selectedValue = selectedElement.value;
    if (selectedValue) {
        const correspondingContent1 = document.getElementById(`content-${selectedValue}`);
        const correspondingContent2 = pairedElement ? document.getElementById(`content-${pairedElement.value}`) : null;
        if (correspondingContent1) {
            correspondingContent1.classList.remove('hidden');
        }
        if (correspondingContent2) {
            correspondingContent2.classList.remove('hidden');
        }
    }

    resetElementIds.forEach((resetId) => {
        const resetElement = document.getElementById(resetId);
        if (resetElement) {
            resetElement.selectedIndex = 0;
        }
    });
}

[
    ['options1A', 'options1B', ['options2A', 'options2B']],
    ['options1B', 'options1A', ['options2A', 'options2B']],
    ['options2A', 'options2B', ['options1A', 'options1B']],
    ['options2B', 'options2A', ['options1A', 'options1B']]
].forEach(([sourceId, pairedId, resetIds]) => {
    const sourceElement = document.getElementById(sourceId);
    if (!sourceElement) return;

    sourceElement.addEventListener('change', function () {
        synchronizeAndDisplay(this, pairedId, resetIds);
    });
});
