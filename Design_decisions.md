A record of the investigations behind the design decisions.

## Font size and number of characters in a line

**Decision.** Reading text (articles, documentation, code pages) is set in
Source Serif 4 at 18px (`1.125rem`), with a line height of 1.6, in a column
48.6rem wide (`$content-measure`), which gives about 90 characters per line.
Headings and the interface use Source Sans 3. The width is statamic.dev's (see
"Content pages take statamic.dev's grid" below), adopted on request in
November 2026; it replaced a 36rem column of about 66 characters, which the
research below supports. The font and its size did not change.

**What the wider column costs.** Measured the same way as below, statamic.dev
itself sets about 100 characters a line (Lexend 300 at 16px in 48.6rem); our
serif at 18px gives about 90. Both are past the 45–75 range and past the 80
characters of WCAG 1.4.8 (AAA, not part of the AA target). To return to the
classic measure, set `$content-measure` back to 36rem: the grid keeps working,
with more air around the text.

**Line length.**

- Bringhurst's *The Elements of Typographic Style* gives 45–75 characters
  (letters and spaces) as a satisfactory measure for a single column of serif
  text, with 66 as the ideal. Baymard's research summary gives 50–75 for web
  body text: shorter lines break the reading rhythm, longer ones make it
  hard to find the start of the next line.
- WCAG 1.4.8 (AAA) caps lines at 80 characters.
- The research is not unanimous: some studies find faster reading on longer
  lines (Viget reports the fastest reading at 95 characters). Speed is not
  the only measure, though: comprehension and comfort favour the classic
  range, and a reading site has no reason to push the limit.

**Measured on this site.** I measured the width of the actual font file
(`source-serif-4-latin-wght-normal.woff2`) on every paragraph of the built
site, about 280,000 characters in English and 320,000 in French:

|    | Average width | Characters in 36rem at 18px | Lines once wrapped (median, 10th–90th percentile) |
|----|---------------|-----------------------------|---------------------------------------------------|
| EN | 0.476 em/char | 67.2                        | 64 (57–68)                                        |
| FR | 0.473 em/char | 67.6                        | 64 (58–68)                                        |

So 36rem gave 64 characters on a typical wrapped line, and nine lines in ten
fall between 57 and 68: inside both recommended ranges and close to the 66
ideal. French text, despite its longer words, comes out the same. (The
measurement uses the font's default weight; the site uses 450, which barely
changes the widths.)

**Font size.** In Rello, Pielot and Marcos's study (CHI 2016, "Make It
Big!"), readability and comprehension on the web kept improving as font size
grew up to 18 points, and comprehension suffered at 10–12. An earlier study
by the same group (2013, readers with dyslexia) found gains up to 18 and none
beyond. 18px also suits screens read at arm's length better than the
browser's default of 16px. Interface text (menus, the contents rail, cards)
stays smaller, in the sans-serif, so it does not compete with the text.

**Line height.** WCAG 1.4.8 asks for at least 1.5 within paragraphs. The
longer the line, the more space the eye needs to find the start of the next
one, so body text uses 1.6. Headings keep a tighter 1.25.

**Where in the code.** `$content-measure` in
`assets/scss/common/_variables-custom.scss`; size, line height and column
widths in `assets/scss/diamond/_article-layout.scss`; fonts in
`_variables-custom.scss` and `_typography.scss`.

**Sources.**
[Bringhurst's measure, at webtypography.net](https://webtypography.net/2.1.2) ·
[Baymard: Line length readability](https://baymard.com/blog/line-length-readability) ·
[W3C: Understanding SC 1.4.8 Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation) ·
[Viget: The Line Length Misconception](https://viget.com/inspire/the-line-length-misconception) ·
[Rello, Pielot, Marcos: Make It Big! (CHI 2016)](https://researchr.org/publication/RelloPM16) ·
[Rello et al.: Size Matters (Spacing Not) (2013)](https://unpaywall.org/10.1145%2F2461121.2461125)

## Codes's catalog using square cells sharing borders, or separate rounded cards

**Decision.** The catalogs (Codes page and Documentation page, both built by
`layouts/_partials/main/scale-catalog.html`) lay their items out as square
cells sharing their borders (`.home-grid--table`), with no gaps, rather than
as separate rounded cards.

**What the catalog is for.** It is an index of about 30 items of the same kind
(icon, name, tagline, type), which readers scan to find one. Design-system
guidance keeps separate cards for independent pieces of varied content: Red
Hat advises grouping only cards of similar style or content, and warns that
cards with uneven content make a group harder to scan.

**Grouping.** A boundary around an area is the strongest grouping cue (the
Gestalt principle of common region, used when "groups must be unmistakable").
With separate cards, each of the 9–12 cells of a scale group is a region of
its own, competing with the group heading. With shared borders, the scale
group is the region and the codes are cells inside it, which matches the
page's structure: scale, then code.

**Visual noise and density.** Every separate card draws four edges and four
rounded corners, plus a gap on each side. Shared borders halve the lines and
drop the gaps, so more of the catalog fits on screen with less clutter. On a
phone, where the grid has one column, shared cells read as a plain list,
while cards become a stack of floating boxes with wasted space between them.

**Consistency.** The home page's codes grid and the team grid already use
shared cells, and so did the former tutorials table. Rounded cards are used
for the news, which is varied editorial content with images. This gives the
site a simple rule: indexes use cells, articles use cards.

**What is given up, and how it is made up for.**

- The lift and shadow of a hovered card, which signals that it is clickable.
  A cell instead tints its background and its title takes the accent colour
  (lifting one cell would break the shared lines), and the whole cell is the
  link.
- A clean outer edge: when the last row is incomplete, the grid ends with a
  step. Each cell draws its own four borders and overlaps its neighbours by
  one pixel, so inner lines stay single and the step stays neat.
- Optional, not applied: rounding only the outer corners of each group's grid
  would bring back the site's rounded style without separating the cells.

**Limits of the evidence.** No source found compares the two layouts directly
for catalogs. The decision rests on general card and grouping guidance,
applied to this content.

**Sources.**
[NN/g: Card View vs. List View](https://www.nngroup.com/videos/card-view-vs-list-view/) ·
[Red Hat Design System: Card guidelines](https://ux.redhat.com/elements/card/guidelines) ·
[USWDS: Card landscape analysis](https://github-redirect.dependabot.com/uswds/uswds/wiki/Card-Landscape-Analysis) ·
[Uxcel: Law of common region](https://uxcel.com/blog/law-of-the-common-region-in-ux) ·
[UX Planet: The Basics, Common Region](https://uxplanet.org/the-basics-common-region-bc235675a3e1) ·
[Carbon: Cards usage](https://carbon-website-git-fork-vpicone-icon-lib-action-bar.carbon-design-system.vercel.app/experimental/cards/usage)

## The title and the text keep the same place in every section

**Decision.** Content pages of every section (including Data and About, which
have no sidebar) go through `main/content-page.html`: same page header (title
size, weight and spacing), same text size, same column, same grid. The
sidebar column and the breadcrumb row are there in every section, set by the
screen width alone (never by the entries), and left empty where a section has
no sidebar or a page no trail.

**Why.** Moving from Workflows to Data used to shift the title and the text,
because they used different layouts (a plain `h1` against the page header) and
the sidebar was as wide as its longest entry, so even two sidebar sections
differed. A reader who changes section reads that as the page jumping. Codes
pages keep their own centred header on purpose.

## Content pages take statamic.dev's grid

**Decision.** From `lg` (1000px) up, content pages are a grid copied from
statamic.dev's documentation (for example
[Control Panel Translations](https://statamic.dev/control-panel/cp-translations)):

- At most 105rem wide, centred, 1.55rem from the page edges; columns
  18fr / 64fr / 18fr (sidebar, text, contents rail) from `xl` (1220px), and
  19fr / 73fr / 8fr between `lg` and `xl`, where the rail is hidden and its
  column shrinks to a margin. Columns 1.55rem apart.
- Two rows: 2.5rem for the breadcrumb trail, then the page, 1.9rem apart. The
  sidebar and the rail span both, so their labels line up with the trail.
- The text is padded 2.2rem inside its column and capped at 48.6rem (a 53rem
  box), centred; the trail is aligned on it.
- The sidebar sits at the start of its column, at most 15rem wide; longer
  entries wrap. The rail starts 2rem into its column (3rem from `xxl`), at
  most 15rem wide.
- Below `lg` nothing changes: one column, the sidebar in the header drawer.

statamic.dev switches at 1000, 1100 and 1250px; the site keeps its own
breakpoints (1000 and 1220px) for the same steps. Only the geometry was
taken: fonts, colours and behaviours stay the site's. The sidebar and the
rail still scroll or stick as before, and still fade while reading (30%
opacity, greyscale; pointing at them, tabbing into them or returning to the
top brings them back), only where hovering exists, as a touch screen has no
gesture to undo it. Wide figures and `.content-wide` blocks grow into what
the text column leaves beside the text, never into the sidebars.

**Breadcrumb trail.** Pages inside the Services sections (sections the main
menu lists under a parent entry; not the sections' own pages, where the trail
would repeat the title) open with the trail from their section to themselves,
in the row above the title: small capitals in the interface font, steps
parted by the chevron the sidebar's branches use. Other pages keep the row
empty, so the title stays put.

**Replaces** "The sidebar flanks the text and steps back while reading": the
article block centred on the screen, a sidebar up to 22rem wide set 5rem from
the text at the end of its column, and a 36rem text column. That layout was
built on NN/g's finding that readers rarely look at the leftmost part of a
wide screen; the new grid keeps the sidebar at the edge of a 105rem block
rather than of the screen, which on a 1920px screen puts it about 140px from
the left.

**Where in the code.** `assets/scss/diamond/_article-layout.scss` (grid),
`_section-sidebar.scss`, `_content-breadcrumb.scss`, `_content-images.scss`;
`main/content-page.html`, `codes/single.html`, `main/breadcrumb-trail.html`,
`main/has-breadcrumb-trail.html`, `main/breadcrumb.html`.

## The catalogs filter their tags with switches

**Decision.** Under the scale ruler, one on/off switch per tag (icon, name,
count), all on at first, chosen among chips, switches, a segmented bar and a
dropdown checklist. Turning one off hides its cells, the groups left empty
and their stops on the ruler, and updates the counts. The ruler, the filter
and the first group sit close together (1.25rem and 1.75rem), as one block
acting on the groups, which keep 2.75rem between them.

**Why.** The user's own picture of the control was a toggle, and a switch
says on/off without explanation. A segmented bar reads as a single choice;
a dropdown hides the options while there are only two tags. Switches wrap
onto a second line from about six tags; past about ten, a dropdown checklist
would scale better.

**Where in the code.** `main/catalog-filter.html`, `_catalog-filter.scss`,
`catalog-filter.js`. Without JS the filter is not shown and everything is
listed.

## The Services menu opens a panel of two columns, after statamic.com

**Decision.** Codes, Workflows, Data and ML notebooks sit under one header
entry, Services, which opens a rounded panel whose entries (icon, name, a
one-line description) fill two columns row by row, so a fifth service starts
a third row. It copies statamic.com's menus: 1rem corners, 0.75rem padding,
a soft shadow ringed by a faint border, entries 14rem wide with 0.375rem
corners and a tinted background on hover, and a 150ms opening that fades in
while growing from 85% of its size. It opens on click, as there, not on
hover. In the small-screen drawer the entries keep their icon and drop their
description, as statamic.com does.

**Why.** Four of the seven header entries were services of the same kind;
grouping them leaves a shorter header and room for more services. Names
alone ("Data") say little to a first visitor, so the panel adds what each
service is. Two columns keep the panel short; filling rows first keeps the
reading order the same in the panel and in the drawer.

**Where in the code.** `header/nav-dropdown.html`,
`_section-dropdown-navbar.scss` and `nav-disclosure.js` (closing transition).
The panel is a native `<details>`, so it works without JS; only the closing
animation and the "close on outside click / Escape / focus out" need it.
