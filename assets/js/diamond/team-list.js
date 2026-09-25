// Team listing filters: reveals the search box and drop-downs rendered hidden
// by the template, then shows only the members matching all of them, and
// offers to clear them once one is set. Without this script the whole team
// stays listed.
(function () {
  const form = document.querySelector('[data-team-filters]');
  const results = document.querySelector('[data-team-results]');
  const resetButton = document.querySelector('[data-team-reset]');
  const members = Array.from(document.querySelectorAll('[data-team-member]'));
  if (!form || !results || !resetButton || !members.length) {
    return;
  }

  const controls = Array.from(form.querySelectorAll('[data-filter]'));
  const pluralRules = window.Intl && Intl.PluralRules ? new Intl.PluralRules(document.documentElement.lang) : null;
  const searchTexts = new Map(members.map((member) => [member, foldText(member.dataset.search)]));

  // Case and accent insensitive, so "noel" finds "Noël"
  function foldText(text) {
    const lower = (text || '').toLowerCase();
    return lower.normalize ? lower.normalize('NFD').replace(/[̀-ͯ]/g, '') : lower;
  }

  function matchesControl(member, control) {
    const wanted = control.value.trim();
    if (!wanted) {
      return true;
    }
    switch (control.dataset.filter) {
      case 'search':
        return searchTexts.get(member).includes(foldText(wanted));
      case 'types':
        return member.dataset.types.split('|').includes(wanted);
      default:
        return member.dataset[control.dataset.filter] === wanted;
    }
  }

  function describeCount(count) {
    if (count === 0) {
      return results.dataset.none;
    }
    const category = pluralRules ? pluralRules.select(count) : (count === 1 ? 'one' : 'other');
    const template = category === 'one' ? results.dataset.one : results.dataset.other;
    return template.replace('{count}', count);
  }

  function isFiltering() {
    return controls.some((control) => control.value.trim() !== '');
  }

  function applyFilters() {
    let shown = 0;
    members.forEach((member) => {
      const matches = controls.every((control) => matchesControl(member, control));
      member.hidden = !matches;
      shown += matches ? 1 : 0;
    });
    results.textContent = describeCount(shown);
    resetButton.hidden = !isFiltering();
  }

  // The reset event comes before the controls are cleared. The reset button
  // hides itself, so its focus moves on to the first filter.
  function onReset() {
    const resetHadFocus = document.activeElement === resetButton;
    window.setTimeout(() => {
      applyFilters();
      if (resetHadFocus) {
        controls[0].focus();
      }
    });
  }

  form.addEventListener('input', applyFilters);
  form.addEventListener('change', applyFilters);
  form.addEventListener('reset', onReset);
  form.addEventListener('submit', (event) => event.preventDefault());

  form.hidden = false;
  applyFilters();
})();
