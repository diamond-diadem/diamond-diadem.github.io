(function () {
  const q = document.getElementById('q');
  const proj = document.getElementById('f-project');
  const type = document.getElementById('f-type');
  const aff = document.getElementById('f-affil');
  const grid = document.getElementById('people-grid');
  const pagination = document.getElementById('people-pagination');
  const prev = document.getElementById('people-prev');
  const next = document.getElementById('people-next');
  const pageInfo = document.getElementById('people-page-info');
  const empty = document.getElementById('no-results');
  if (!q || !proj || !type || !aff || !grid || !pagination || !prev || !next || !pageInfo || !empty) {
    return;
  }

  const cards = Array.from(grid.querySelectorAll('[data-person]'));
  const pageSize = 8;
  let currentPage = 1;
  let resizeTimer;

  function norm(value) {
    return (value || '').toLowerCase();
  }

  function resetSelectPlaceholder(select) {
    if (select && select.value === '__all__') {
      select.value = '';
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function syncCardHeights() {
    if (!cards.length) {
      return;
    }

    const originalDisplays = cards.map((card) => card.style.display);
    let tallest = 0;

    cards.forEach((card) => {
      card.style.height = 'auto';
      card.style.display = '';
    });

    cards.forEach((card) => {
      tallest = Math.max(tallest, card.offsetHeight);
    });

    if (tallest > 0) {
      cards.forEach((card, index) => {
        card.style.height = tallest + 'px';
        card.style.display = originalDisplays[index];
      });
    }
  }

  function renderPage(matches) {
    const pageCount = Math.max(1, Math.ceil(matches.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    cards.forEach((el) => {
      el.style.display = 'none';
    });

    matches.slice(start, end).forEach((el) => {
      el.style.display = '';
    });

    pageInfo.textContent = currentPage + ' / ' + pageCount;
    prev.disabled = currentPage === 1;
    next.disabled = currentPage === pageCount;
    pagination.classList.toggle('hidden', matches.length <= pageSize);
  }

  function apply(resetPage) {
    const tq = norm(q.value);
    const tp = proj.value === '__all__' ? '' : norm(proj.value);
    const tt = type.value === '__all__' ? '' : norm(type.value);
    const ta = aff.value === '__all__' ? '' : norm(aff.value);
    const matches = [];

    cards.forEach((el) => {
      const data = {
        name: norm(el.getAttribute('data-name')),
        role: norm(el.getAttribute('data-role')),
        aff: norm(el.getAttribute('data-affiliation')),
        project: norm(el.getAttribute('data-project')),
        ptype: norm(el.getAttribute('data-ptype')),
        email: norm(el.getAttribute('data-email'))
      };

      const textHit = !tq || [data.name, data.role, data.aff, data.email].some((x) => x.includes(tq));
      const projHit = !tp || data.role === tp;
      let typeHit = true;
      if (tt) {
        const types = (data.ptype || '').split(',');
        typeHit = types.includes(tt);
      }
      const affHit = !ta || data.aff === ta;

      if (textHit && projHit && typeHit && affHit) {
        matches.push(el);
      }
    });

    if (resetPage) {
      currentPage = 1;
    }

    if (matches.length === 0) {
      cards.forEach((el) => {
        el.style.display = 'none';
      });
      pageInfo.textContent = '';
      prev.disabled = true;
      next.disabled = true;
      pagination.classList.add('hidden');
    } else {
      renderPage(matches);
    }

    syncCardHeights();
    empty.classList.toggle('hidden', matches.length !== 0);
  }

  prev.addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage -= 1;
      apply(false);
      scrollToTop();
    }
  });

  next.addEventListener('click', function () {
    currentPage += 1;
    apply(false);
    scrollToTop();
  });

  [q, proj, type, aff].forEach((el) => el && el.addEventListener('input', function () { apply(true); }));
  [proj, type, aff].forEach((el) => el && el.addEventListener('change', function () {
    resetSelectPlaceholder(el);
    apply(true);
  }));

  window.addEventListener('resize', function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      syncCardHeights();
      apply(false);
    }, 100);
  });

  apply(true);
})();
