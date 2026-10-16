---
name: slidev-differences
description: Table of Slidev habits that do not work in slide.ng, with the slide.ng way
---

# If you know Slidev

slide.ng reads the same `slides.md` shape (it uses Slidev's own markdown parser), with the same layout names, frontmatter keys, code fence options and click directives. What differs is everything that is Vue or Vite.

| Slidev                                               | slide.ng                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------ |
| `slidev`, port 3030                                  | `slide-ng`, port **4230**                                                      |
| `pnpm create slidev`                                 | `slide-ng create <folder>`                                                     |
| `v-if`, `v-for`, `:prop`, `@click`, `<script setup>` | Angular: `@if`, `@for`, `[prop]`, `(click)`, template references               |
| `<v-click>...</v-click>` tag                         | not available (build error). Use the attribute `<div v-click>` or `<v-clicks>` |
| `<div v-click.hide>`                                 | the `.hide` modifier does nothing. Use `v-click-hide`                          |
| `<Toc />`, `<Link>`, `<Tweet />` (PascalCase)        | `<slide-toc />`, `<slide-link>`, `<tweet />` (lower-case, dashes)              |
| `<Link to="3">`                                      | `<slide-link to="3">`; `link` is an HTML tag, so it was renamed                |
| `<SlidevVideo>`                                      | `<slide-video>`                                                                |
| `<carbon:apps />`                                    | `<carbon-apps />` (dash); or the class `i-carbon:apps`                         |
| `$slidev.nav.currentPage`, `$page`                   | `<slide-current-no />`, or inject `Nav` in a component                         |
| `onSlideEnter`, `onSlideLeave`, `useIsSlideActive`   | do not exist; inject `Nav` / `ClicksContext` and use signals                   |
| Vue components in `components/*.vue`                 | Angular standalone components in `components/*.ts`                             |
| `setup/main.ts` with `defineAppSetup`                | `setup/main.ts` returns Angular providers                                      |
| `@slidev/theme-x`, Vue themes and addons             | `@slide-ng/theme-x`; Slidev themes cannot be used                              |
| `comark: true` / MDC syntax                          | not parsed                                                                     |
| `--uno` in `<style>`                                 | not supported; use utility classes in HTML                                     |
| `vite.config.ts`, Vite plugins, `vue.ts`             | none                                                                           |
| `slidev export` downloads a browser                  | `slide-ng export` needs `CHROME_PATH` or `--executable-path`                   |
| `<script setup>` imports                             | none; a component imports what it needs                                        |
| markdown-it plugins                                  | none; `setup/transformers.ts` `codeblocks` renders blocks                      |

Same as Slidev: layouts and their props, `::right::` slots, `src:` imports, `defaults:`, `routeAlias`, `clicks`, `transition`, `v-after`, `<v-clicks>`, `<v-switch>`, code `{2,3|5|all}` ranges, `[title]`, `<<<` snippets, code groups, Magic Move, Twoslash, `{monaco}`, KaTeX `$$`, Mermaid, PlantUML, `v-mark`, `v-drag`, `canvasWidth`, `routerMode`, `presenter`, `drawings`, `record`, `export` and `build` flags (`--out`, `--base`, `--format`, `--range`, `--with-clicks`).

If something from Slidev is missing here, check `not-supported.md` before inventing it.

<!-- verify -->

```md
---
title: Slidev habits translated
---

# Translated

<div v-click>Attribute form of v-click</div>
<div v-click="2" v-click-hide>Visible first, hides at click 2</div>

<slide-link to="1">back to the start</slide-link>

<carbon-apps /> Slide <slide-current-no /> of <slides-total />
```
