// Place your custom JavaScript code here.
// This file is loaded after all other scripts,
// so you can use it to add custom functionality or override existing functions.

// Fade-in elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.scroll-fade');
    if (fadeElements.length === 0) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach((el) => observer.observe(el));
});
