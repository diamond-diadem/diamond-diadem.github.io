// Makes the theme follow the operating system when JavaScript is unavailable.
//
// Theme styles are scoped to [data-bs-theme="dark"|"light"] on the root
// element, an attribute only color-mode.js sets. Without JS the attribute is
// missing, so every such rule gets a twin wrapped in
// @media (prefers-color-scheme: <mode>) that targets a root lacking the
// attribute. The twin sits right after its original to keep cascade order.
// A bare [data-bs-theme] prefix becomes :where(:root):not([data-bs-theme]),
// which weighs exactly as much, so the twin never outranks rules that were
// written to override the original.

const THEME_ON_ROOT = /^(html|:root)?\[data-bs-theme=(["']?)(dark|light)\2\]/;
const ROOT_WITHOUT_THEME = ':not([data-bs-theme])';
const WEIGHTLESS_ROOT = ':where(:root)';

function parseRootTheme(selector) {
    const match = selector.trim().match(THEME_ON_ROOT);
    return match && { mode: match[3], root: match[1] || WEIGHTLESS_ROOT, length: match[0].length };
}

function toSystemSelector(selector, rootTheme) {
    const rest = selector.trim().slice(rootTheme.length);
    return `${rootTheme.root}${ROOT_WITHOUT_THEME}${rest}`;
}

function systemSelectorsByMode(rule) {
    const byMode = {};

    for (const selector of rule.selectors) {
        const rootTheme = parseRootTheme(selector);
        if (rootTheme) {
            byMode[rootTheme.mode] = byMode[rootTheme.mode] || [];
            byMode[rootTheme.mode].push(toSystemSelector(selector, rootTheme));
        }
    }

    return byMode;
}

function addSystemTwins(rule, AtRule) {
    const byMode = systemSelectorsByMode(rule);

    for (const [mode, selectors] of Object.entries(byMode).reverse()) {
        const media = new AtRule({ name: 'media', params: `(prefers-color-scheme: ${mode})` });
        media.append(rule.clone({ selectors }));
        rule.after(media);
    }
}

module.exports = () => ({
    postcssPlugin: 'system-color-scheme',
    Once(root, { AtRule }) {
        const themedRules = [];
        root.walkRules((rule) => {
            if (rule.selector.includes('data-bs-theme')) {
                themedRules.push(rule);
            }
        });
        themedRules.forEach((rule) => addSystemTwins(rule, AtRule));
    }
});

module.exports.postcss = true;
