---
name: fonts
description: Web fonts through the fonts headmatter key, and self-hosting them
---

# Fonts

```yaml
fonts:
  sans: Inter
  serif: Merriweather
  mono: Fira Code
  weights: '400,600'
  italic: false
  provider: google # google, coollabs, none, or a Google-compatible css2 address
  selfHost: true # download the font files into the build
```

- Keys: `sans`, `serif`, `mono`, `local`, `weights`, `italic`, `fallbacks`, `provider`; `webfonts` and `custom` are read. The `mono` font becomes the code font.
- By default fonts load from the provider with an `@import` (needs the network when the deck is shown).
- `selfHost: true` downloads the provider's style sheet and font files at build time into `media/`. It is **on by default** for `pwa: true` and `build --offline`; `selfHost: false` turns it off. If the download fails the build warns and keeps the `@import`.
- A theme's fonts are merged with the deck's key by key; `fonts: { provider: none }` loads nothing.
- Self-hosting was tested against a fake provider only, never against real Google Fonts.
- The download runs on the machine that builds: do not build decks from others with `selfHost`.

<!-- verify -->

```md
---
title: Fonts
fonts:
  sans: Inter
  mono: Fira Code
  provider: none
---

# A deck with named fonts

`code` uses the mono font.
```
