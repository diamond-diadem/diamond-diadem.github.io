const pageTitleBanners = document.querySelectorAll('.container-h1-default-page');

if (pageTitleBanners.length > 0) {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const updatePageTitleBannerFade = (banner) => {
        const titleElement = banner.querySelector('h1');
        const bannerRect = banner.getBoundingClientRect();
        const titleRect = titleElement?.getBoundingClientRect();

        if (!bannerRect.height || !titleRect) {
            return;
        }

        const contentBottom = titleRect.bottom - bannerRect.top;
        const fadeStartPx = clamp(
            contentBottom + Math.max(10, bannerRect.height * 0.04),
            bannerRect.height * 0.4,
            bannerRect.height * 0.82
        );
        const fadeEndPx = clamp(
            fadeStartPx + Math.max(24, bannerRect.height * 0.2),
            fadeStartPx + 16,
            bannerRect.height
        );
        const sideFadeEndPx = clamp(Math.max(24, bannerRect.width * 0.06), 20, bannerRect.width * 0.12);

        banner.style.setProperty('--page-title-fade-side-end', `${sideFadeEndPx}px`);
        banner.style.setProperty('--page-title-fade-start', `${fadeStartPx}px`);
        banner.style.setProperty('--page-title-fade-end', `${fadeEndPx}px`);
    };

    let resizeFrame = null;
    const queuePageTitleFadeUpdate = () => {
        if (resizeFrame !== null) {
            window.cancelAnimationFrame(resizeFrame);
        }

        resizeFrame = window.requestAnimationFrame(() => {
            resizeFrame = null;
            pageTitleBanners.forEach(updatePageTitleBannerFade);
        });
    };

    window.addEventListener('resize', queuePageTitleFadeUpdate, { passive: true });
    window.addEventListener('load', queuePageTitleFadeUpdate);

    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(queuePageTitleFadeUpdate);

        pageTitleBanners.forEach((banner) => {
            observer.observe(banner);

            const titleElement = banner.querySelector('h1');
            if (titleElement) {
                observer.observe(titleElement);
            }
        });
    }

    queuePageTitleFadeUpdate();
}
