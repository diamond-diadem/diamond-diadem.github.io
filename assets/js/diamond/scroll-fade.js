const fadeElements = document.querySelectorAll('.scroll-fade');

if (fadeElements.length > 0) {
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            root: null,
            threshold: 0.1
        }
    );

    fadeElements.forEach((el) => observer.observe(el));
}
