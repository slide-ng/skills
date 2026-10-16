---
name: theme-official
description: The official themes and where they live
---

# Official themes

| `theme:`      | package                       | notes                                                                       |
| ------------- | ----------------------------- | --------------------------------------------------------------------------- |
| `default`     | none (built in)               | port of Slidev's default theme; its web fonts are not loaded, set `fonts:`  |
| `seriph`      | `@slide-ng/theme-seriph`      | `cover`; PT Serif / PT Mono                                                 |
| `shibainu`    | `@slide-ng/theme-shibainu`    | 14 layouts; backgrounds are CSS gradients                                   |
| `bricks`      | `@slide-ng/theme-bricks`      | 9 layouts; `<polygon-1 />` to `<polygon-11 />`                              |
| `apple-basic` | `@slide-ng/theme-apple-basic` | 10 layouts with props (`image`, `imageLeft`, ...)                           |
| `adev`        | `@slide-ng/theme-adev`        | angular.dev look, light and dark; `<adev-callout>`, `<adev-card-grid>`, ... |

- They live in a separate repository (slide.ng-themes), not in this package. Install first: `npm i -D @slide-ng/theme-seriph`, then `theme: seriph`.
- A missing official theme stops the build with the install command.
- The original illustrations are not included (licence); gradients stand in.
- Check the theme's README for its layout names and props before using one.
