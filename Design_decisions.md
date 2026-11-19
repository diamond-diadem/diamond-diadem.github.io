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
