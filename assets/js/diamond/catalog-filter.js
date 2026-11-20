/*!
 * Tag filter of the catalogs (main/catalog-filter.html): each checked tag
 * shows its cells, each unchecked one hides them. Groups left without a
 * visible cell are hidden too, their stop on the scale ruler turns hollow,
 * and the counts follow, so the page never shows an empty heading or a
 * stale number.
 */

(() => {
    'use strict';

    const pluralRules = new Intl.PluralRules(document.documentElement.lang || 'en');

    function countText(catalog, count) {
        const template = pluralRules.select(count) === 'one'
            ? catalog.dataset.countOne
            : catalog.dataset.countOther;
        return template.replace(/\d+/, String(count));
    }

    function checkedTags(filter) {
        return new Set(
            Array.from(filter.querySelectorAll('input[name="tag"]:checked'), (input) => input.value),
        );
    }

    function showCells(catalog, tags) {
        catalog.querySelectorAll('[data-tag]').forEach((cell) => {
            cell.hidden = !tags.has(cell.dataset.tag);
        });
    }

    function updateGroup(catalog, group) {
        const visible = group.querySelectorAll('[data-tag]:not([hidden])').length;
        group.hidden = visible === 0;
        group.querySelector('[data-count]').textContent = countText(catalog, visible);

        const stop = catalog.querySelector(`.scale-ruler__link[href="#${group.id}"]`);
        if (stop) {
            stop.closest('li').classList.toggle('is-empty', visible === 0);
            stop.toggleAttribute('aria-disabled', visible === 0);
            stop.tabIndex = visible === 0 ? -1 : 0;
        }
        return visible;
    }

    function apply(catalog, filter) {
        showCells(catalog, checkedTags(filter));
        const total = Array.from(catalog.querySelectorAll('.catalog-group'))
            .reduce((sum, group) => sum + updateGroup(catalog, group), 0);

        filter.querySelector('[data-filter-empty]').hidden = total > 0;
        filter.querySelector('[data-filter-status]').textContent = countText(catalog, total);
    }

    function checkAll(filter) {
        filter.querySelectorAll('input[name="tag"]').forEach((input) => {
            input.checked = true;
        });
    }

    document.querySelectorAll('[data-catalog]').forEach((catalog) => {
        const filter = catalog.querySelector('[data-tag-filter]');
        if (!filter) {
            return;
        }
        filter.addEventListener('change', () => apply(catalog, filter));
        filter.querySelector('[data-filter-reset]').addEventListener('click', () => {
            checkAll(filter);
            apply(catalog, filter);
        });
    });
})();
