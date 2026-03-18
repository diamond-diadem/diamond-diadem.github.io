let topButton = null;
let topButtonInitialized = false;

function scrollFunction() {
    if (topButton === null) {
        return;
    }

    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        topButton.classList.add('fade');
    } else {
        topButton.classList.remove('fade');
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function initTopButton() {
    topButton = document.getElementById('totopbutton');

    if (topButton === null) {
        return;
    }

    if (!topButtonInitialized) {
        window.addEventListener('scroll', scrollFunction, { passive: true });
        topButton.addEventListener('click', topFunction);
        topButtonInitialized = true;
    }

    scrollFunction();
}

document.addEventListener('DOMContentLoaded', initTopButton);
window.addEventListener('pageshow', initTopButton);
