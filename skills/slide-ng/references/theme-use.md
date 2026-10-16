---
name: theme-use
description: Choose a theme or addons, and how names are resolved
---

# Using a theme

```yaml
theme: ./my-theme # a folder next to the deck, an absolute path, a package name, or default
addons:
  - ./my-addon
  - slide-ng-addon-charts
```

- `theme: default` (or `none`, or no `theme:`) is the built-in look.
- A name that is not a path is looked up in `node_modules` from the deck's folder upwards: `@slide-ng/theme-<name>`, then `slide-ng-theme-<name>`, then `<name>`. A scoped name (`@scope/theme-x`) is used as written. Addons: `@slide-ng/addon-<name>`, `slide-ng-addon-<name>`, `<name>`. A name with a slash (`themes/mine`) is a path; `@/themes/mine` is relative to the deck.
- A path that is not a folder, or a package that is not installed, stops the run with the install command (`npm install -D slide-ng-theme-x`; the official names are `@slide-ng/theme-<name>`). In a terminal `dev` and `build` ask first.
- `--theme <name|path>` on `dev`, `build` and `export`, or `SLIDE_NG_THEME`, overrides the headmatter.
- **Slidev themes (`@slidev/theme-*`) are Vue packages and cannot be used.**
- Theme `fonts` are merged with the deck's `fonts` key by key. `themeConfig` is not read.
- Addons were unit-tested for resolution and merge order only; no deck was built end to end with one.
- Official themes: `theme-official.md`. Write one: `theme-write.md`.

<!-- verify -->

```md
---
title: A themed deck
theme: default
---

# Default theme
```
