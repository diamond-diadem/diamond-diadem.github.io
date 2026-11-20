A record of the investigations behind the design decisions.

## Font size and number of characters in a line

**Decision.** Reading text (articles, documentation, code pages) is set in
Source Serif 4 at 18px (`1.125rem`), with a line height of 1.6, in a column
36rem wide (`$content-measure`), which gives about 66 characters per line.
Headings and the interface use Source Sans 3. The contents rail sits to the
right of the column from the `xl` breakpoint up, without changing the column's
width or position.

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

So 36rem gives 64 characters on a typical wrapped line, and nine lines in ten
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
size, weight and spacing), same text size, same column. The sidebar column
has the same width in every section, set by the screen width alone (never by
the entries), and a section without a sidebar keeps it empty.

**Why.** Moving from Workflows to Data used to shift the title and the text,
because they used different layouts (a plain `h1` against the page header) and
the sidebar was as wide as its longest entry, so even two sidebar sections
differed. A reader who changes section reads that as the page jumping.

**Cost.** On screens too narrow for the sidebar to flank the text (see next
section), the text sits right of the centre, in every section alike. Codes
pages keep their own centred header on purpose.

## The sidebar flanks the text and steps back while reading

**Decision.** From `lg` up, the article block (the text, plus its contents
rail from `xl`) is centred on the screen. The sidebar column takes the whole
margin on its left, and the sidebar, as wide as its longest entry up to
22rem, sits at the right end of that column, `$article-rail-gap` (5rem) from
the text: the same gap as the rail on the other side. Spare width goes to the
outer margins. Where the screen is too narrow to centre the text with a full
sidebar beside it (below about 1750px, and always before the rail appears at
1220px), the sidebar keeps its 22rem and the text moves right, down to a 2rem
outer margin; only below about 1340px (1050px without the rail) does the
sidebar narrow, to 14rem at the least. The sidebar
scrolls away with the page and, as soon as the reader scrolls, fades like the
rail (30% opacity, greyscale); pointing at it, tabbing into it or returning
to the top brings it back. Wide blocks (`.content-wide`, wide figures) beside
it grow at most 3rem to the left, keeping 2rem clear of its longest entry, and
take the rest of their extra width on the right, over the rail.

**Why.** The sidebar used to start at the page edge and the text was centred
in what it left, so on a 1920px screen some 400px of empty paper separated
them.

- In NN/g's 2024 eye-tracking study on 1920×1080 screens, the leftmost 192px
  received 6% of fixations and attention peaked about 600px from the left
  edge: a sidebar pinned to the edge sits where readers rarely look.
- The same study puts 80% of fixations on the left half and advises keeping
  navigation on the left: the fix is to bring it closer, not to move it.
- Proximity: a sidebar further from the text than the text's own rail reads
  as page chrome, not as this section's contents.
- Documentation themes keep sidebar and contents at fixed widths and give
  spare width to the outer margins, never to the gap between them.
- Fading follows the rail, so both sides of the text behave alike; it only
  happens where hovering exists, as a touch screen has no gesture to undo it.

**Rejected.** The variants that also made the sidebar sticky, with or
without the current page kept unfaded: a long sidebar would then need a
scroll of its own.

**Where in the code.** `section-sidebar-column()` in
`assets/scss/diamond/_section-sidebar.scss`, `sidebar-recede.js`, and the
`.article-column--beside-sidebar` rule in `_content-images.scss`.

**Sources.**
[NN/g: Horizontal attention leans left](https://www.nngroup.com/articles/horizontal-attention-leans-left/) ·
[NN/g: Vertical navigation](https://www.nngroup.com/articles/vertical-nav/) ·
[Furo: extra width on large screens](https://github.com/pradyunsg/furo/discussions/651)

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
