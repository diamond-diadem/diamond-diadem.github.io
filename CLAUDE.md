# CLAUDE.md

Context for working on the DIAMOND website (PEPR DIADEM digital platform),
published at https://diamond-diadem.github.io/. Read `CONTRIBUTING.md` too; this
file covers what it does not, plus the main → dev content-porting procedure.

## Conventions to strictly follow

- Accessibility is part of "done": AA contrast (the palette comments record measured ratios — verify before adding colours), visible `:focus-visible`, skip link, `.visually-hidden` for screen-reader-only text, `prefers-reduced-motion` guards on transitions.
- Comments explain *why*, not what. The existing code is densely commented in this style; match it.
- No CSS-in-template `<style>` blocks and no inline `<script>` — everything goes in `site.css` / `site.js`.
- The website MUST follow a progressive enhancement approach, providing basic features to users with basic browser CSS and JS support, and increasing features as the supported features increase in the browser used.
- The website MUST be responsive under all circumstances. 
- ALL MODIFICATIONS must be in agreement with the design of the website, unless specifically asked to design something on a new way.
- Always use `hugo` and `clean-code` skills, to make sure we are writing proper code.
- Other than this "Conventions" section, which you should not touch, you must update the rest of this document as pertinent: to fix inconsistencies or legacy issues introduced all along the way with the modifications, update the website structure, record my preferences, etc.
- On each run, optimize this file so the next time it's better at token consumption/efficiency.


## Branches: the most important thing to know

- **`main`**: the old website. It is still in production (the GitHub Pages
  deploy in `.github/workflows/deploy.yml` runs on every push to `main`) and
  still receives content via PRs from colleagues. It is protected (PRs only).
- **`dev`**: the reworked website (new design, new content layout). This is
  where all the work happens. It will eventually be fast-forward merged into
  `main`.
- The two have diverged structurally, so **never `git merge main` into dev
  normally** and never cherry-pick main's content commits as-is. New content
  from main is **ported by hand** into dev's conventions, then main is recorded
  as merged with `git merge -s ours` (see "Porting main into dev" below).
- **Never modify `main`** (no commits, no merges, no rebases on it) unless the
  user asks for it explicitly.
- Commits must read as written by the user alone: **no `Co-Authored-By`, no
  "Generated with Claude Code"**, no attribution of any kind.
- Never commit changes to `package.json` / `package-lock.json` that `npm
  install` made on its own (see CONTRIBUTING).

## Stack and commands

- Hugo **extended** (installed via mise here; CI uses 0.156.0) + the Thulite
  Doks theme from `node_modules/@thulite/*` (mounted in
  `config/_default/module.yaml`). Bootstrap 5, SCSS in `assets/scss/`.
- `npm run dev`: local server at http://localhost:1313.
- Build check without touching `public/`:
  `PATH=$PWD/node_modules/.bin:$PATH hugo --gc -d <scratch dir>`. A clean dev
  build prints **no WARN lines**; keep it that way.
- The SCSS is compiled by Dart Sass (`transpiler: dartsass`), which Hugo runs
  as a `sass` executable. It comes from the `sass-embedded` dev dependency in
  `node_modules/.bin`: npm scripts put it on PATH, a bare `hugo` call does not
  (add it as above). Without it Hugo silently reuses the last cached CSS, so
  style changes seem to do nothing; add `--ignoreCache` when in doubt.
- `npm run lint` (prettier) exists but is **not enforced**: many existing pages
  fail it. Do not reformat files with it.

## Languages and content layout (dev)

- Two languages: **French is the default and is served at the root** (`/…`),
  English is under `/en/…` (`defaultContentLanguageInSubdir: false`). There is
  no `/fr/` path: a link to `https://diamond-diadem.github.io/fr/...` is a bug.
- Every page exists as two sibling files: `name.en.md` and `name.fr.md` (or
  `index.en.md`/`index.fr.md` in a leaf bundle, `_index.en.md`/`_index.fr.md`
  for a section). Always change both languages together.
- Sections: `about/`, `codes/`, `contact/`, `data/`, `documentation/`
  (`by-container/`, `install/`, `use/`), `faqs/`, `news/`, `notebooks/`,
  `team/` (built from `data/team.yaml` via `_content.gotmpl`, photos in
  `assets/images/team/`), `workflows/`.
- Layouts: `layouts/` (Hugo 0.146+ naming: `_shortcodes/`, `_partials/`,
  `_markup/`; there is no `layouts/shortcodes/` or `layouts/_default/` on dev).
- `static/images/` is also mounted as `assets/images`, so images there can be
  processed by Hugo and found by the image render hook.

## Writing conventions (dev)

**Content is Markdown, not HTML.** Commit `936ef9ef` is the reference for the
HTML → Markdown conversion style.

- No `<div align="justify">` wrappers, no `<h3 class="mb-1">`, no inline
  styles, no `<hr>`, no `<br>` for spacing. Headings are `##`/`###`;
  horizontal rules are `---`.
- **Internal links** use Hugo refs, without the language prefix:
  `[text]({{% ref "/documentation/use/apptainer-image" %}})`, and with an
  anchor: `[text]({{% ref "/faqs" %}}#why-not-docker)`. Links to static files
  stay plain: `[input files](/downloads/x-tutorial-inputs.tar.gz)`.
  (`href=` inside `link-card` shortcodes is the exception: those stay
  `/en/...` for EN and `/...` for FR, as on the existing pages.)
- **Images**: Markdown only, `![meaningful alt text](path)`. Page-specific
  images go in the page bundle (`![alt](diagram.png)`), shared ones in
  `static/images/` referenced as `images/...` (see the aiida-vasp and
  wannier90 pages). The render hook (`layouts/_markup/render-image.html`)
  converts to WebP, sets width/height and picks a `-dark` sibling in dark mode.
  The old `<p align="center"><i>caption</i></p>` lines under images are
  dropped: the caption text goes into the alt text.
  For a caption, or a diagram that needs more room than the text column, use
  `{{< figure src="..." alt="..." caption="..." width="wide" >}}` (`width`
  is `text` by default). Every content image opens full screen on click
  (Doks' basicLightbox, through the `lightbox` class the hook adds).
  `dark="..."` names the dark variant when its file does not follow the
  `-dark` naming. Never an `<img>` whose picture comes from CSS
  (`content: url(...)`, main's old way): it gets no lightbox, WebP or size.
- **Contents sidebar**: every page with `##`–`####` headings shows it, unless
  its front matter sets `toc: false` (only for a specific reason; the
  archetypes write `toc: true`). Headings inside tabs are not listed.
- Raw `<a>` links become Markdown links; emails become
  `[x@y.fr](mailto:x@y.fr)`.
- YouTube: `{{< video-with-consent id="VIDEO_ID" >}}` with the bare ID (strip
  `?si=...`).
- Side-by-side logos: `{{< logos >}}{{< logo src="images/..." dark="images/..." alt="..." >}}{{< /logos >}}`.
- Callouts: `{{< callout context="note|tip|caution|danger" title="..." icon="tabler-icons/outline/..." >}}`.
  A callout may be nested inside a `tab` (the shortcode strips blank lines
  when it has a parent).
- Tabs: `{{< tabs "unique-id" >}}{{< tab "Apptainer" >}}…{{< /tab >}}{{< tab "Docker" >}}…{{< /tab >}}{{< /tabs >}}`.
  Tabs with the same name are synced across the page by doks-core's
  `tabs.js` (choosing "Docker" once switches every tab group).
- Math (`$...$`, `$$...$$`) works on every page: `math: true` is set
  site-wide in `params.yaml` (CONTRIBUTING's per-page note is outdated).
- **Front matter `description` must be 110–160 characters**: the SEO partial
  warns otherwise, and dev currently builds with zero warnings. It is
  metadata: adjusting it to fit is fine, unlike body content.
- Fix only real mistakes (typos, broken anchors/links); otherwise keep the
  wording of content written by others.

### Codes (`content/codes/<category>/<slug>/`)

- Leaf bundle: `index.en.md`, `index.fr.md`, `logo.<ext>` + optional
  `logo-dark.<ext>` (page header, built by `main/code-header.html` with the
  `website:` front matter), and `icon.<ext>` + optional `icon-dark.<ext>`
  (small square icon for menus and catalogs, rendered by `main/code-icon.html`,
  WebP-converted). Both are found by file name: no CSS, no front matter. The
  build warns about a code without an icon. **Do not put a logo or title in
  the Markdown.**
- Front matter: `title`, `linkTitle`, `weight`,
  `description`, `tagline`, `scale`, `website`. No `title_visible`.
  `tagline` is the few words under the name in the catalog card (both
  languages). `scale` is the catalog group, one of `electronic`, `atomic`,
  `mesoscopic`, `microstructure`, `macroscopic` (not translated). The type
  (computing/visualisation) is the section folder, not front matter. Main's
  code pages carry `icon: icon-<slug>` and `toc: false`: drop both when
  porting.
- Body structure: `### Retrieve the container image` (FR `### Récupérez
  l'image de conteneur`) with Apptainer/Docker tabs, description paragraphs,
  then `## Tutorial` / `## <Code> documentation` / `## Examples` (FR
  `## Tutoriel` / `## Documentation <Code>` / `## Exemples`) with
  `link-card`s. Unavailable items stay as disabled cards
  (`title="Content to be added"`, `href="#bottom"`, `disabled="true"`).
- The Codes landing page lists codes **automatically** (`codes-catalog`
  shortcode): one group per `scale`, alphabetical inside, opened by a scale
  ruler; it warns at build time on a missing `tagline` or unknown `scale`.
  Scale names and typical lengths are `code_scale_*` i18n keys. The home
  page shows the codes listed in its `codes.featured` front matter.
- Block-level width: `.content-wide` makes any block as wide as a
  `width="wide"` figure (the catalog uses it; `article-rail.js` moves the
  rail aside for it too).
- Repeated decorative icons in templates: use `partial "home/icon.html"`,
  not `inline-svg`, which gives every copy the same `id`.

### Tutorials (`content/documentation/by-container/`)

- `<slug>.en.md`/`.fr.md` (or a bundle when it has images). Front matter adds
  `category: scientific-computing|visualisation` and `code: <code folder>`
  (e.g. `code: amitex-fftp`), which shows that code's icon. A tutorial about
  something with no code page (AiiDA) is a bundle with its own `icon.<ext>`.
- Starts with a `Prerequisites` / `Prérequis` note callout (no icon) listing
  Apptainer (our guide + official docs), the image, the input files; then a
  paragraph pointing to the Apptainer description/crash course.

### FAQ (`content/faqs/`)

- **One question per file**: `content/faqs/<slug>.en.md` + `.fr.md`, front
  matter `title` (the question) and `weight` (order: 10, 20, … currently up
  to 80). The file name is the anchor (`/faqs/#<slug>`), so links survive
  rewording. The first 5 by weight also appear on the home page.
- Answers are hard-wrapped at ~78 columns like the existing ones.

### Workflows (`content/workflows/<slug>/`)

- `_index.*.md` is the description (with `summary`, `tablerIcon`,
  `draft`/`cascade.draft`, and an `aliases: [/workflows/<slug>/description/]`
  for main's old URL), plus `installation.*.md`, `benchmark.*.md`, etc.
- Visibility (`draft`) is decided on dev; do not copy main's draft flags blindly.
  Main's empty placeholder workflows (moflearning, numodis-lammps,
  quantum-espresso, vasp) are intentionally absent from dev.

## Main's (old) structure, for reference

- Content in `content/en/...` and `content/fr/...` (one tree per language,
  plain `name.md`), heavy inline HTML (`<div align="justify">`,
  `<h3 class="mb-1">`, `<p align="center"><img …></p>`), hardcoded `/en/...`
  links and sometimes absolute `https://diamond-diadem.github.io/...` URLs.
- Codes: flat `codes/<category>/<slug>.md` with the logo as an HTML `<a
  class="codes-pages-top-logo"><span class="logo-<slug>">` driven by
  `assets/scss/diamond/_codes-logos.scss` and
  `static/images/codes/<slug>/<slug>-logo-{light,dark}.svg`. The code list is
  hand-maintained in `codes/home/index.md` (table + two `<select>` blocks).
- Shortcodes duplicated in `layouts/shortcodes/` and `layouts/_shortcodes/`.

### Path mapping main → dev

| main | dev |
|---|---|
| `content/<lang>/X.md` | `content/X.<lang>.md` |
| `content/<lang>/codes/<cat>/<slug>.md` | `content/codes/<cat>/<slug>/index.<lang>.md` |
| `static/images/codes/<slug>/<slug>-logo-light.svg` / `-dark.svg` | bundle `logo.svg` / `logo-dark.svg` |
| `.logo-<slug>` in `_codes-logos.scss` | nothing (file does not exist on dev) |
| `.icon-<slug>` in `_custom-icons.scss` + its icon file(s) | bundle `icon.<ext>` / `icon-dark.<ext>` (no CSS; `_custom-icons.scss` is gone) |
| tutorial `icon: icon-<slug>` | `code: <code folder>` |
| new code page | also add `tagline` + `scale` (ask the user if unsure) |
| `content/<lang>/codes/home/index.md` changes | nothing (catalog is automatic) |
| `content/<lang>/documentation/faq/index.md` new `### Question` | new `content/faqs/<slug>.<lang>.md` |
| `…/documentation/faq/#<heading-anchor>` links | `{{% ref "/faqs" %}}#<slug>` |
| `content/<lang>/workflows/<wf>/description.md` | `content/workflows/<wf>/_index.<lang>.md` |
| `content/<lang>/workflows/<wf>/<page>.md` | `content/workflows/<wf>/<page>.<lang>.md` |
| `content/<lang>/about/{apptainer,containers,guix}.md` | `content/documentation/use/{apptainer,containers,guix}.<lang>.md` |
| `content/<lang>/data/_index.md` | `content/data/_index.<lang>.md` |
| `data/team.yaml` + team photos | `data/team.yaml` + `assets/images/team/` |
| `static/downloads/`, `static/images/<other>/` | same paths |
| `layouts/shortcodes/X` and `layouts/_shortcodes/X` | `layouts/_shortcodes/X` only |

## Porting main into dev

Goal: bring the content added on main into dev, in dev's conventions, without
changing what the content says, and leave the history so that dev can later be
fast-forward merged into main.

1. **Find what is new.** The last port's merge commit is the latest
   `Merge main into dev (content already ported, dev structure kept)` on dev;
   its second parent is the last ported main commit. Then:
   ```bash
   git checkout dev
   BASE=$(git merge-base main dev)        # = last ported main commit
   git log --oneline $BASE..main          # what to port
   git diff --stat $BASE main             # files to port
   git diff $BASE main -- <path>          # exact changes
   ```
   Ported so far: up to `f839689e` (port `2414af21`, merge `c90999a0`), then up
   to `4d0a8344` (port `769d92cd`, merge `2276aa3e`).
2. **Port each change by hand** with the mapping table above. For files that
   already exist on dev, apply main's *diff* onto dev's version (dev has often
   rewritten the surrounding text, e.g. tutorial prerequisites), rather than
   replacing the dev file with main's. For new files, convert main's file.
   Copy binaries with `git show main:<path> > <dev path>` and check with `cmp`.
   - Keep main's wording. Fix only clear mistakes and tell the user about each
     one (examples found so far: anchors pointing to headings that do not
     exist, `/fr/` URLs, absolute site URLs, FR typos).
   - Check heading anchors yourself: GitHub-style IDs (`## 4.6 Algorithme
     d'extraction (ETL)` → `#46-algorithme-dextraction-etl`; accents are kept).
   - Layout/shortcode changes on main are ported only when the new content
     needs them; when ported, make the dev file identical to main's
     (`git show main:<file> > <file>`) so the future forward merge is trivial.
3. **Verify**: build to a scratch dir with zero warnings, then check the
   rendered pages: in-page anchors resolve, `ref` links resolve, images are
   WebP, new codes appear in the catalog, nested shortcodes render.
4. **Commit on dev** (no attribution lines), in two steps like the previous
   ports:
   ```bash
   git add <ported files>
   git commit   # "Port main's content updates into the dev structure" + bullet list
   git merge -s ours main -m "Merge main into dev (content already ported, dev structure kept)"
   ```
   `-s ours` records main as merged without changing dev's tree.
5. **Check**: `git rev-parse main` unchanged, `git log dev..main` empty,
   `git merge-base --is-ancestor main dev` succeeds (dev → main will
   fast-forward). Do not push unless asked.

## Known issues on dev (not fixed yet)

- PtyRAD has no official logo: its `icon.png`/`icon-dark.png` are a bold "P"
  (Nimbus Sans Bold, same style as n2p2's "n"), replace if upstream gets one.
  Its FR page has `## Tutorial` instead of `## Tutoriel`.
- GROMACS's icon is dark blue with no dark-mode version: barely visible in
  dark mode. `static/images/codes/ndm/ndm-logo.png` is unused.
- The Data page's EN text links to the French Wikipedia NoSQL article (as on
  main).
