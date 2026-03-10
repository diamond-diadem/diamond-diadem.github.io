/*!
 * FlexSearch for Bootstrap based Thulite sites
 * Copyright 2021-2024 Thulite
 * Licensed under the MIT License
 * Based on https://github.com/frjo/hugo-theme-zen/blob/main/assets/js/search.js
 */

/* eslint-disable no-undef, guard-for-in */

/**
 * @file
 * A JavaScript file for flexsearch.
 */

// import * as FlexSearch from 'flexsearch';
import Index from 'flexsearch';

(function () {

  'use strict';

  // const index = new FlexSearch.Document({
  const index = new Index.Document({
    tokenize: 'forward',
    document: {
      id: 'id',
      index: [
        {
          field: 'title',
          weight: 6
        },
        {
          field: 'tags',
          weight: 3
        },
        {
          field: {{ if site.Params.doks.indexSummary }}'summary'{{ else }}'content'{{ end }},
          weight: 1
        },
        {
          field:  'date',
          tokenize: 'strict',
          encode: false
        }
      ],
      store: ['title','summary','date','permalink']
    }
  });

  const queryInput = document.querySelector('.search-text');
  const searchModal = document.getElementById('searchModal');
  const recentSelectionLimit = 5;
  const recentSelectionStorageKey = 'flexsearch-recent-selections{{ if site.Language.Lang }}-{{ site.Language.Lang }}{{ end }}';

  function getRecentSelections() {
    try {
      const stored = window.localStorage.getItem(recentSelectionStorageKey);
      const parsed = stored ? JSON.parse(stored) : [];
      return Array.isArray(parsed)
        ? parsed.filter(function (item) {
          return item
            && typeof item.title === 'string'
            && item.title.trim() !== ''
            && typeof item.permalink === 'string'
            && item.permalink.trim() !== '';
        })
        : [];
    } catch (error) {
      return [];
    }
  }

  function saveRecentSelection(item) {
    if (!item || !item.title || !item.permalink) {
      return;
    }

    const recentItem = {
      title: item.title,
      permalink: item.permalink
    };

    const nextRecentSelections = [recentItem].concat(
      getRecentSelections().filter(function (entry) {
        return entry.permalink !== recentItem.permalink;
      })
    ).slice(0, recentSelectionLimit);

    try {
      window.localStorage.setItem(recentSelectionStorageKey, JSON.stringify(nextRecentSelections));
    } catch (error) {
      // Ignore storage failures so search still works in restricted browsers.
    }
  }

  function hideStatusMessages() {
    document.querySelector('.search-no-recent').classList.add('d-none');
    document.querySelector('.search-no-results').classList.add('d-none');
  }

  function renderRecentSearches() {
    const recentSelections = getRecentSelections();
    const results = document.querySelector('.search-results');
    results.textContent = '';

    if (recentSelections.length === 0) {
      document.querySelector('.search-no-results').classList.add('d-none');
      document.querySelector('.search-no-recent').classList.remove('d-none');
      return;
    }

    hideStatusMessages();

    const fragment = document.createDocumentFragment();
    const section = document.createElement('section');
    section.className = 'recent-searches mt-3';

    const heading = document.createElement('p');
    heading.className = 'recent-searches-label text-uppercase fw-semibold mb-3';
    heading.textContent = '{{ i18n "search_recent_label" }}';
    section.appendChild(heading);

    const wrapper = document.createElement('div');
    wrapper.className = 'recent-searches-list';

    recentSelections.forEach(function (item) {
      const link = document.createElement('a');
      link.className = 'recent-search-link';
      link.href = item.permalink;
      link.innerHTML = '<span class="recent-search-link__title"></span>';
      link.querySelector('.recent-search-link__title').textContent = item.title;
      wrapper.appendChild(link);
    });

    section.appendChild(wrapper);
    fragment.appendChild(section);
    results.appendChild(fragment);
  }

  function showResults(items) {
    const template = document.querySelector('template').content;
    const fragment = document.createDocumentFragment();

    const results = document.querySelector('.search-results');
    results.textContent = '';

    const itemsLength = items.length;

    // Show/hide "No recent searches" and "No search results" messages
    if ((itemsLength === 0) && (queryInput.value !== '')) {
      document.querySelector('.search-no-recent').classList.add('d-none');
      // Show "No search results" message
      const queryNoResults = document.querySelector('.query-no-results');
      queryNoResults.innerText = queryInput.value;
      document.querySelector('.search-no-results').classList.remove('d-none');
    } else {
      hideStatusMessages();
    }

    items.forEach(function (item) {
      const result = template.cloneNode(true);
      const a = result.querySelector('a');
      const time = result.querySelector('time');
      const content = result.querySelector('.content');
      a.innerHTML = item.title;
      a.href = item.permalink;
      a.addEventListener('click', function () {
        saveRecentSelection(item);
      });
      time.innerText = item.date;
      content.innerHTML = item.summary;
      fragment.appendChild(result);
    });

    results.appendChild(fragment);
  }

  function doSearch() {
    const query = queryInput.value.trim();

    if (query === '') {
      renderRecentSearches();
      return;
    }
    const limit = {{ .searchLimit }};
    const results = index.search({
      query: query,
      enrich: true,
      limit: limit,
    });
    const scored = new Map();

    results.forEach(function (result) {
      result.result.forEach(function (r) {
        const prev = scored.get(r.id);
        const score = (prev ? prev.score : 0) + (r.score || 0);
        scored.set(r.id, { doc: r.doc, score: score });
      });
    });

    const ordered = Array.from(scored.values())
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (entry) { return entry.doc; });

    showResults(ordered);
  }

  function enableUI() {
    const searchform = document.querySelector('.search-form');
    searchform.addEventListener('submit', function (e) {
      e.preventDefault();
      doSearch();
    });
    searchform.addEventListener('input', function () {
      doSearch();
    });
    if (searchModal) {
      searchModal.addEventListener('shown.bs.modal', function () {
        if (queryInput.value.trim() === '') {
          renderRecentSearches();
        }
        queryInput.focus();
      });
      searchModal.addEventListener('hidden.bs.modal', function () {
        queryInput.value = '';
        renderRecentSearches();
      });
    }
    document.querySelector('.search-loading').classList.add('d-none');
    document.querySelector('.search-input').classList.remove('d-none');
    queryInput.focus();
    renderRecentSearches();
  }

  function buildIndex() {
    document.querySelector('.search-loading').classList.remove('d-none');
    fetch("{{ site.LanguagePrefix }}/search-index.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        data.forEach(function (item) {
          index.add(item);
        });
      });
  }

  buildIndex();
  enableUI();
})();
