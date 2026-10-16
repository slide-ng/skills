---
name: build-remote-assets
description: Download remote pictures into the build with remoteAssets
---

# Remote assets

`remoteAssets: true` makes the build download the remote pictures a deck uses (markdown `![](https://...)`, `<img src>`, CSS `url()`, the frontmatter keys `image`, `background`, `backgroundImage`, `poster`) into `remote-assets/` and rewrite the slides.

- Only answers with an `image/*` content type up to 20 MB are taken; anything else is left and reported.
- Images only. On by default for `build --offline`; `remoteAssets: false` turns it off.
- The download runs on the machine that builds: build untrusted decks without `remoteAssets`.
- Check the build output for `could not download` lines.

The download refuses loopback, private and link-local addresses (also after redirects), stops at 20 MB, takes only files that start like a picture, and never downloads SVG (it stays remote; save it into the deck instead).

<!-- verify -->

```md
---
title: Remote assets
remoteAssets: true
---

# Pictures are bundled

![](/photo.png)
```
