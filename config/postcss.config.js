const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const purgeCSSPlugin = require('@fullhuman/postcss-purgecss');

function collectScssFiles(dir) {
    if (!fs.existsSync(dir)) {
        return [];
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    return entries.flatMap((entry) => {
        const entryPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            return collectScssFiles(entryPath);
        }

        return entry.isFile() && entryPath.endsWith('.scss') ? [entryPath] : [];
    });
}

function extractSelectors(filePath) {
    if (!fs.existsSync(filePath)) {
        return [];
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const selectors = content.match(/\.[_a-zA-Z]+[\w-]*/g) || [];
    return selectors.map((selector) => selector.slice(1));
}

function buildSafelistFromScss() {
    const files = [
        ...collectScssFiles(path.resolve(__dirname, '../assets/scss')),
        path.resolve(__dirname, '../node_modules/@thulite/doks-core/assets/scss/components/_code.scss'),
        path.resolve(__dirname, '../node_modules/@thulite/doks-core/assets/scss/components/_expressive-code.scss'),
        path.resolve(__dirname, '../node_modules/@thulite/doks-core/assets/scss/common/_syntax.scss')
    ];

    return [...new Set(files.flatMap(extractSelectors))];
}

module.exports = {
    plugins: [
        autoprefixer(),
        purgeCSSPlugin({
            content: ['./hugo_stats.json'],
            extractors: [
                {
                    extractor: (content) => {
                        const els = JSON.parse(content).htmlElements;
                        return els.tags.concat(els.classes, els.ids);
                    },
                    extensions: ['json']
                }
            ],
            dynamicAttributes: [
                'aria-expanded',
                'data-bs-popper',
                'data-bs-target',
                'data-bs-theme',
                'data-dark-mode',
                'data-global-alert',
                'data-pane', // tabs.js
                'data-popper-placement',
                'data-sizes',
                'data-toggle-tab', // tabs.js
                'id',
                'size',
                'type'
            ],
            safelist: [
                'active',
                'btn-clipboard', // clipboards.js
                'clipboard', // clipboards.js
                'disabled',
                'hidden',
                'modal-backdrop', // search-modal.js
                'selected', // search-modal.js
                'show',
                'img-fluid',
                'blur-up',
                'lazyload',
                'lazyloaded',
                'alert-link',
                'container-fw',
                'container-lg',
                'container-fluid',
                'offcanvas-backdrop',
                'figcaption',
                'dt',
                'dd',
                'showing',
                'hiding',
                'page-item',
                'page-link',
                'not-content',
                ...buildSafelistFromScss()
            ]
        })
    ]
};
