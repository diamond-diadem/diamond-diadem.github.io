# CLAUDE.md

Context for working on the DIAMOND website (PEPR DIADEM digital platform), published at https://diamond-diadem.github.io/.

## Conventions to strictly follow

- If this file grows past about 60 lines, tell me and suggest which lines to cut or move into a skill.
- Accessibility is part of "done": AA contrast (the palette comments record measured ratios — verify before adding colours), visible `:focus-visible`, skip link, `.visually-hidden` for screen-reader-only text, `prefers-reduced-motion` guards on transitions.
- Comments explain *why*, not what.
- The website MUST follow a progressive enhancement approach, providing basic features to users with basic browser CSS and JS support, and increasing features as the supported features increase in the browser used.
- The website MUST be responsive under all circumstances.
- ALL MODIFICATIONS must be in agreement with the design of the website, unless specifically asked to design something on a new way.
- Use `hugo` and `clean-code` skills when writing code.
- Prefer to use solutions already provided by the Doks theme, and not custom ones, as long as the former are enough to achieve our objectives. And report each time you chose a custom solution over a Doks one, specifying why the choice.
- Other than this "Conventions" section, which you should not touch, you must update the rest of this document as pertinent: to fix inconsistencies or legacy issues introduced all along the way with the modifications, update the website structure, record my preferences, etc.

Read `Design_decisions.md` before changing a design choice it records; add a section for any new one.

## Branches: the most important thing to know

- **`main`** is the old website: in production (GitHub Pages deploys on every
  push), protected (PRs only), still receiving colleagues' content.
  **Never modify it** (commits, merges, rebases) unless asked explicitly.
- **`dev`** is the reworked website, where all the work happens; it will be
  fast-forward merged into `main` one day. The two diverged structurally:
  **never `git merge main` into dev**; port main's content by hand (skill
  `port-main-into-dev`).
- Commits read as written by the user alone: no `Co-Authored-By`, no "Generated
  with Claude Code". Never commit `package*.json` changes made by `npm install`.

## Stack and commands

- Hugo **extended** (mise here; CI 0.156.0) + Thulite Doks theme from
  `node_modules/@thulite/*`. Bootstrap 5, SCSS in `assets/scss/`.
- `npm run dev` serves http://localhost:1313. Build check, no WARN lines
  allowed: `PATH=$PWD/node_modules/.bin:$PATH hugo --gc -d <scratch dir>`
  (`sass` comes from `node_modules/.bin`; without it Hugo silently reuses the
  cached CSS, so add `--ignoreCache` when in doubt). A running `hugo server`
  holds the build lock: add `--noBuildLock`.
- `npm run lint` is **not enforced**: do not reformat files with it.

## Layout and content

- French is the default language at the root, English under `/en/` (no `/fr/`).
  Every page is a pair `name.en.md` + `name.fr.md`: change both. Writing
  conventions per page type: skill `write-content`.
- Root `page.html` and `section.html` render every content page through
  `main/content-page.html`, so title and text keep the same place, size and
  weight in all sections; lists generated from content go in the Markdown as
  shortcodes (`codes-catalog`, `section-cards`), not in section layouts. The
  sidebar column takes the margin left of the centred text, empty where a
  section has none. Codes pages differ on purpose (`codes/single.html`).
- Section sidebar (codes, documentation, notebooks, workflows): built from the
  section tree (`sidebar/*.html`), shared by desktop and the mobile drawer.
  `_index` front matter: `sidebar_expanded`, `sidebar_sort: title`.
- Main menu entries with children (Services) open a two-column panel
  (`header/nav-dropdown.html`); children set `params.icon` and
  `params.description` in `config/_default/menus/`.
- Each `content/codes/<folder>` is a catalog tag (`tag` front matter +
  `icon.svg`, read by `main/code-tags.html`): never hard-code tag names.
