/*!
 * Search modal for Bootstrap based Thulite sites
 * Copyright 2021-2024 Thulite
 * Licensed under the MIT License
 */

import { Modal } from 'bootstrap';

(() => {
  'use strict';

  const searchToggleMobile = document.getElementById('searchToggleMobile');
  const searchToggleDesktop = document.getElementById('searchToggleDesktop');
  const searchModal = document.getElementById('searchModal');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('query');
  const searchResults = document.getElementById('searchResults');

  if (!searchModal || !searchForm || !searchInput || !searchResults) {
    return;
  }

  const flexSearchModal = new Modal(searchModal, {
    focus: true
  });

  if (searchToggleMobile) {
    searchToggleMobile.addEventListener('click', showModalOnClick);
  }

  if (searchToggleDesktop) {
    searchToggleDesktop.addEventListener('click', showModalOnClick);
  }

  function showModalOnClick() {
    flexSearchModal.toggle();
    triggerSearchRefresh();
  }

  function triggerSearchRefresh() {
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));
  }

  document.addEventListener('keydown', onKeyDownHandler);

  function onKeyDownHandler(event) {
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      flexSearchModal.show();
      searchForm.reset();
      searchResults.textContent = '';
      triggerSearchRefresh();
    }

    if (event.key === 'Escape') {
      searchForm.reset();
      searchResults.textContent = '';
      if (searchResultSelected) {
        removeClass(searchResultSelected, 'selected');
        index = -1;
      }
      document.querySelector('.search-no-results').classList.add('d-none');
      triggerSearchRefresh();
    }
  }

  document.addEventListener('click', function (event) {
    const modalElement = searchModal.contains(event.target);
    if (!modalElement) {
      searchForm.reset();
      searchResults.textContent = '';
      document.querySelector('.search-no-results').classList.add('d-none');
      triggerSearchRefresh();
    }

    if (searchResultSelected) {
      removeClass(searchResultSelected, 'selected');
      index = -1;
    }
  });

  searchModal.addEventListener('shown.bs.modal', () => {
    searchInput.focus();
    triggerSearchRefresh();
  });

  let searchResultSelected;
  let index = -1;

  document.addEventListener(
    'keydown',
    function (event) {
      const articles = searchResults.getElementsByTagName('article');
      const len = articles.length - 1;

      if (len < 0) {
        if (searchResultSelected) {
          removeClass(searchResultSelected, 'selected');
          searchResultSelected = undefined;
          index = -1;
        }
        return;
      }

      if (event.key === 'ArrowDown') {
        index++;
        if (searchResultSelected) {
          removeClass(searchResultSelected, 'selected');
          const next = articles[index];
          if (typeof next !== 'undefined' && index <= len) {
            searchResultSelected = next;
          } else {
            index = 0;
            searchResultSelected = articles[0];
          }
          addClass(searchResultSelected, 'selected');
        } else {
          index = 0;
          searchResultSelected = articles[0];
          addClass(searchResultSelected, 'selected');
        }
      } else if (event.key === 'ArrowUp') {
        if (searchResultSelected) {
          removeClass(searchResultSelected, 'selected');
          index--;
          const next = articles[index];
          if (typeof next !== 'undefined' && index >= 0) {
            searchResultSelected = next;
          } else {
            index = len;
            searchResultSelected = articles[len];
          }
          addClass(searchResultSelected, 'selected');
        } else {
          index = 0;
          searchResultSelected = articles[len];
          addClass(searchResultSelected, 'selected');
        }
      }
    },
    false
  );

  function removeClass(el, className) {
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
    searchResultSelected.querySelector('a').blur();
  }

  function addClass(el, className) {
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className += ' ' + className;
    }
    searchResultSelected.querySelector('a').focus();
  }

  searchResults.addEventListener(
    'mouseover',
    () => {
      if (searchResultSelected) {
        removeClass(searchResultSelected, 'selected');
      }
    },
    false
  );
})();
