const homepageBanner = document.querySelector('.section-title-lead-landing-page');

if (homepageBanner) {
    const titleElement = homepageBanner.querySelector('.container-title-homepage');
    const leadElement = homepageBanner.querySelector('.container-lead-homepage');

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

    const updateHomepageBannerFade = () => {
        const bannerRect = homepageBanner.getBoundingClientRect();
        const titleRect = titleElement?.getBoundingClientRect();
        const leadRect = leadElement?.getBoundingClientRect();

        if (!bannerRect.height || (!titleRect && !leadRect)) {
            return;
        }

        const contentBottom =
            Math.max(titleRect?.bottom ?? bannerRect.top, leadRect?.bottom ?? bannerRect.top) - bannerRect.top;

        const fadeStartPx = clamp(
            contentBottom + window.innerHeight * 0.04,
            bannerRect.height * 0.42,
            bannerRect.height * 0.84
        );
        const fadeEndPx = clamp(
            fadeStartPx + Math.max(56, bannerRect.height * 0.18),
            fadeStartPx + 24,
            bannerRect.height
        );
        const topFadeEndPx = clamp(Math.max(40, bannerRect.height * 0.12), 32, bannerRect.height * 0.3);
        const sideFadeEndPx = clamp(Math.max(28, bannerRect.width * 0.08), 24, bannerRect.width * 0.16);

        homepageBanner.style.setProperty('--banner-fade-top-start', '0px');
        homepageBanner.style.setProperty('--banner-fade-top-end', `${topFadeEndPx}px`);
        homepageBanner.style.setProperty('--banner-fade-side-start', '0px');
        homepageBanner.style.setProperty('--banner-fade-side-end', `${sideFadeEndPx}px`);
        homepageBanner.style.setProperty('--banner-fade-start', `${fadeStartPx}px`);
        homepageBanner.style.setProperty('--banner-fade-end', `${fadeEndPx}px`);
    };

    let resizeFrame = null;
    const queueHomepageBannerFadeUpdate = () => {
        if (resizeFrame !== null) {
            window.cancelAnimationFrame(resizeFrame);
        }

        resizeFrame = window.requestAnimationFrame(() => {
            resizeFrame = null;
            updateHomepageBannerFade();
        });
    };

    window.addEventListener('resize', queueHomepageBannerFadeUpdate, { passive: true });
    window.addEventListener('load', queueHomepageBannerFadeUpdate);

    if ('ResizeObserver' in window) {
        const observer = new ResizeObserver(queueHomepageBannerFadeUpdate);
        observer.observe(homepageBanner);

        if (titleElement) {
            observer.observe(titleElement);
        }

        if (leadElement) {
            observer.observe(leadElement);
        }
    }

    queueHomepageBannerFadeUpdate();
}
