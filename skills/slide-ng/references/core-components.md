---
name: components
description: Built-in components and directives available in every slide without importing
---

# Built-in components

Use them as lower-case tags. Nothing to import.

| tag                                                                                                                           | does                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<slide-toc />`                                                                                                               | table of contents from slide `title` and `level`. Options `columns="2"`, `listClass`, `start`, `listStyle`, `minDepth`, `maxDepth`, `mode="all\|onlyCurrentTree\|onlySiblings"`      |
| `<slide-current-no />`, `<slides-total />`                                                                                    | current slide number, number of slides                                                                                                                                               |
| `<slide-link to="3">text</slide-link>`                                                                                        | link to slide 3 or to a `routeAlias` (Slidev's `Link`)                                                                                                                               |
| `<light-or-dark>`                                                                                                             | `<div dark>...</div>` in dark mode, `<div light>...</div>` in light mode                                                                                                             |
| `<render-when context="slide">`                                                                                               | content only where drawn: `slide`, `presenter`, `print`, `overview`, `main`. `[context]="['slide','overview']"` for several. A child with attribute `fallback` shows everywhere else |
| `<v-clicks>`, `v-click`, `v-after`, `<v-switch>`, `<v-click-gap>`                                                             | clicks, see `animation-clicks.md`, `animation-click-lists.md`                                                                                                                        |
| `<arrow x1 y1 x2 y2 color width two-way />`                                                                                   | SVG arrow, positions in slide pixels                                                                                                                                                 |
| `<transform scale="0.5" origin="top left">`                                                                                   | scales its content, see `layout-transform.md`                                                                                                                                        |
| `<auto-fit-text min="10" max="60" class="w-60 h-20">`                                                                         | biggest font size that fits the box; `multi-line="false"` for one line                                                                                                               |
| `<youtube id="..." width="560" height="315" />`                                                                               | YouTube embed (no start time or playlist options)                                                                                                                                    |
| `<slide-video autoplay="true" autoreset="click" controls poster="...">`                                                       | video that plays with its slide or click. `autoplay="once"`, `timestamp`. Put `<source>` inside                                                                                      |
| `<tweet id="20" scale="0.8" conversation="none" cards="hidden" />`                                                            | tweet (needs the network)                                                                                                                                                            |
| `<blue-sky uri="at://..." scale="0.8" />`                                                                                     | Bluesky post (needs the network); `uri` can be the post URL                                                                                                                          |
| `v-drag`, `<v-drag>`, `<v-drag-arrow>`                                                                                        | draggable elements, see `layout-draggable.md`                                                                                                                                        |
| `v-mark`, `v-motion`                                                                                                          | see `animation-marks.md`, `animation-motion.md`                                                                                                                                      |
| `<code-group>`, `<mermaid>`, `<plant-uml>`, `<monaco>`, `<shiki-magic-move>`, `<katex-block-wrapper>`, `<code-block-wrapper>` | written by the generator from fences and math; use the markdown forms                                                                                                                |

Not there: `PoweredBySlidev`, `TitleRenderer`. `Youtube` is partial.

Table of contents levels: a slide whose level is higher than the one before becomes its child (`# A`, `## A.1`, `## A.2`, `# B`). A slide without a title, or with `hideInToc`, is left out.

<!-- verify -->

```md
---
title: Built-in components
---

# Components

<slide-toc columns="2" />

---
title: Arrow and fit
---

# Arrow and fit text

<arrow x1="40" y1="200" x2="300" y2="300" color="red" width="2" two-way />

<auto-fit-text min="10" max="60" class="w-60 h-20">Fits the box</auto-fit-text>

---

# Counters and links

Slide <slide-current-no /> of <slides-total />, <slide-link to="1">go to slide 1</slide-link>.

<light-or-dark>
<div dark>Dark mode text</div>
<div light>Light mode text</div>
</light-or-dark>

<render-when context="print">
<p>Only on paper.</p>
<div fallback>Not on paper.</div>
</render-when>

---

# Video and embeds

<youtube id="luoMHjh-XcQ" width="560" height="315" />

<slide-video controls>
  <source src="/video.mp4" type="video/mp4">
</slide-video>
```
