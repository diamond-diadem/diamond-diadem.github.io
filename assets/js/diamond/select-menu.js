// Select menus: turns each native <select> wrapped in [data-select-menu] into
// a styled drop-down, following the ARIA "select-only combobox" pattern.
// The native select stays in the form, hidden, and keeps the value: the menu
// only writes to it and fires its change event, so the code reading the form
// sees no difference. Without this script the native select is shown.
(function () {
  const wrappers = document.querySelectorAll('[data-select-menu]');
  const TYPEAHEAD_DELAY = 500;
  const PAGE_STEP = 10;

  class SelectMenu {
    constructor(select, label) {
      this.select = select;
      this.label = label;
      this.typed = '';
      this.typedAt = 0;
      this.combobox = this.createCombobox();
      this.listbox = this.createListbox();
      this.options = Array.from(select.options, (option, index) => this.createOption(option, index));
      this.activeIndex = select.selectedIndex;

      select.hidden = true;
      select.after(this.combobox, this.listbox);
      this.label.addEventListener('click', () => this.combobox.focus());
      this.bindEvents();
      this.render();
    }

    createCombobox() {
      const combobox = document.createElement('div');
      combobox.className = 'select-menu__button';
      combobox.id = `${this.select.id}-menu`;
      combobox.tabIndex = 0;
      combobox.setAttribute('role', 'combobox');
      combobox.setAttribute('aria-haspopup', 'listbox');
      combobox.setAttribute('aria-expanded', 'false');
      combobox.setAttribute('aria-controls', `${this.select.id}-listbox`);
      combobox.setAttribute('aria-labelledby', this.label.id);
      return combobox;
    }

    createListbox() {
      const listbox = document.createElement('ul');
      listbox.className = 'select-menu__listbox';
      listbox.id = `${this.select.id}-listbox`;
      listbox.tabIndex = -1;
      listbox.hidden = true;
      listbox.setAttribute('role', 'listbox');
      listbox.setAttribute('aria-labelledby', this.label.id);
      return listbox;
    }

    createOption(nativeOption, index) {
      const option = document.createElement('li');
      option.className = 'select-menu__option';
      option.id = `${this.select.id}-option-${index}`;
      option.textContent = nativeOption.textContent;
      option.setAttribute('role', 'option');
      option.addEventListener('mousemove', () => this.setActive(index));
      option.addEventListener('click', () => this.choose(index));
      this.listbox.append(option);
      return option;
    }

    bindEvents() {
      this.combobox.addEventListener('click', () => this.toggle());
      this.combobox.addEventListener('keydown', (event) => this.onKeydown(event));
      this.combobox.addEventListener('blur', () => this.close());
      // Keeps the focus on the combobox, so choosing an option does not blur it
      this.listbox.addEventListener('mousedown', (event) => event.preventDefault());
      this.select.addEventListener('change', () => this.render());
      if (this.select.form) {
        this.select.form.addEventListener('reset', () => window.setTimeout(() => this.render()));
      }
    }

    get isOpen() {
      return !this.listbox.hidden;
    }

    render() {
      const selectedIndex = this.select.selectedIndex;
      this.combobox.textContent = this.options[selectedIndex].textContent;
      this.options.forEach((option, index) => {
        option.setAttribute('aria-selected', String(index === selectedIndex));
      });
    }

    open(index) {
      this.listbox.hidden = false;
      this.combobox.setAttribute('aria-expanded', 'true');
      this.setActive(index === undefined ? this.select.selectedIndex : index);
    }

    close() {
      if (!this.isOpen) {
        return;
      }
      this.listbox.hidden = true;
      this.combobox.setAttribute('aria-expanded', 'false');
      this.combobox.removeAttribute('aria-activedescendant');
    }

    toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    }

    choose(index) {
      this.close();
      if (index === this.select.selectedIndex) {
        return;
      }
      this.select.selectedIndex = index;
      this.select.dispatchEvent(new Event('change', { bubbles: true }));
    }

    setActive(index) {
      const lastIndex = this.options.length - 1;
      this.activeIndex = Math.max(0, Math.min(index, lastIndex));
      const active = this.options[this.activeIndex];
      this.options.forEach((option) => option.classList.toggle('is-active', option === active));
      this.combobox.setAttribute('aria-activedescendant', active.id);
      this.scrollIntoView(active);
    }

    scrollIntoView(option) {
      const listbox = this.listbox;
      if (option.offsetTop < listbox.scrollTop) {
        listbox.scrollTop = option.offsetTop;
      } else if (option.offsetTop + option.offsetHeight > listbox.scrollTop + listbox.clientHeight) {
        listbox.scrollTop = option.offsetTop + option.offsetHeight - listbox.clientHeight;
      }
    }

    onKeydown(event) {
      const handled = this.isOpen ? this.onOpenKey(event) : this.onClosedKey(event);
      if (handled) {
        event.preventDefault();
      }
    }

    onClosedKey(event) {
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
        case 'Enter':
        case ' ':
          this.open();
          return true;
        case 'Home':
          this.open(0);
          return true;
        case 'End':
          this.open(this.options.length - 1);
          return true;
        default:
          return this.typeahead(event);
      }
    }

    onOpenKey(event) {
      switch (event.key) {
        case 'ArrowDown':
          this.setActive(this.activeIndex + 1);
          return true;
        case 'ArrowUp':
          if (event.altKey) {
            this.choose(this.activeIndex);
          } else {
            this.setActive(this.activeIndex - 1);
          }
          return true;
        case 'PageDown':
          this.setActive(this.activeIndex + PAGE_STEP);
          return true;
        case 'PageUp':
          this.setActive(this.activeIndex - PAGE_STEP);
          return true;
        case 'Home':
          this.setActive(0);
          return true;
        case 'End':
          this.setActive(this.options.length - 1);
          return true;
        case 'Enter':
        case ' ':
          this.choose(this.activeIndex);
          return true;
        case 'Escape':
          this.close();
          return true;
        case 'Tab':
          this.choose(this.activeIndex);
          return false;
        default:
          return this.typeahead(event);
      }
    }

    // Typing letters jumps to the next option starting with them
    typeahead(event) {
      const isPrintable = event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
      if (!isPrintable) {
        return false;
      }
      const now = Date.now();
      this.typed = now - this.typedAt > TYPEAHEAD_DELAY ? event.key : this.typed + event.key;
      this.typedAt = now;

      const match = this.findOptionStartingWith(this.typed.toLowerCase());
      if (match === -1) {
        return true;
      }
      if (this.isOpen) {
        this.setActive(match);
      } else {
        this.open(match);
      }
      return true;
    }

    // Searches after the active option first, so repeating a letter cycles
    findOptionStartingWith(prefix) {
      const count = this.options.length;
      const start = prefix.length === 1 ? this.activeIndex + 1 : this.activeIndex;
      for (let step = 0; step < count; step += 1) {
        const index = (start + step) % count;
        if (this.options[index].textContent.trim().toLowerCase().startsWith(prefix)) {
          return index;
        }
      }
      return -1;
    }
  }

  function enhance(wrapper) {
    const select = wrapper.querySelector('select');
    const label = select && select.id ? document.querySelector(`label[for="${select.id}"]`) : null;
    if (!label || select.options.length === 0) {
      return;
    }
    label.id = label.id || `${select.id}-label`;
    new SelectMenu(select, label);
  }

  // Older browsers keep the native select
  if (!('after' in Element.prototype)) {
    return;
  }
  wrappers.forEach(enhance);
})();
