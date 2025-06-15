// Update progress bar width based on scroll position
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const update = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const width = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${width}%`;
    };

    window.addEventListener('scroll', update);
    window.addEventListener('resize', update);
    update();
});
