const pageTitleBanners = document.querySelectorAll('.container-h1-default-page');

if (pageTitleBanners.length > 0) {
    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const getVisibleCentroid = (fadeStartPx, fadeEndPx) => {
        if (fadeEndPx <= fadeStartPx) {
            return fadeStartPx / 2;
        }

        const rectangleArea = fadeStartPx;
        const triangleHeight = fadeEndPx - fadeStartPx;
        const triangleArea = triangleHeight / 2;
        const totalArea = rectangleArea + triangleArea;

        if (!totalArea) {
            return 0;
        }

        const rectangleMoment = rectangleArea * (fadeStartPx / 2);
        const triangleMoment = triangleArea * (fadeStartPx + triangleHeight / 3);

        return (rectangleMoment + triangleMoment) / totalArea;
    };

    const updatePageTitleBannerFade = (banner) => {
        const titleElement = banner.querySelector('h1');
        const bannerRect = banner.getBoundingClientRect();
        const titleRect = titleElement?.getBoundingClientRect();

        if (!bannerRect.height || !titleRect) {
            return;
        }

        const centeredContentBottom = bannerRect.height / 2 + titleRect.height / 2;
        const fadeStartPx = clamp(
            centeredContentBottom + Math.max(10, bannerRect.height * 0.04),
            bannerRect.height * 0.4,
            bannerRect.height * 0.82
        );
        const fadeEndPx = clamp(
            fadeStartPx + Math.max(24, bannerRect.height * 0.2),
            fadeStartPx + 16,
            bannerRect.height
        );
        const sideFadeEndPx = clamp(Math.max(24, bannerRect.width * 0.06), 20, bannerRect.width * 0.12);
        const visibleCentroid = getVisibleCentroid(fadeStartPx, fadeEndPx);
        const titleOffsetPx = visibleCentroid - bannerRect.height / 2;

        banner.style.setProperty('--page-title-fade-side-end', `${sideFadeEndPx}px`);
        banner.style.setProperty('--page-title-fade-start', `${fadeStartPx}px`);
        banner.style.setProperty('--page-title-fade-end', `${fadeEndPx}px`);
        banner.style.setProperty('--page-title-offset-y', `${titleOffsetPx}px`);
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
