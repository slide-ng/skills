---
name: build-og-image
description: The link preview picture (Open Graph image)
---

# Open Graph image

`seoMeta.ogImage` is one of:

- a web address;
- `auto`: the build makes a screenshot of slide 1 (1470 x 828) and writes `og-image.png` (needs Chromium: `CHROME_PATH` or `--executable-path`);
- left out: an `og-image.png` next to `slides.md` is copied and used automatically.

Crawlers need a full address, so set `seoMeta.ogUrl` to the public address of the deck; without it the tag points at `<base>og-image.png`.

Not checked in a real crawler or chat application.

<!-- verify -->

```md
---
title: Preview
seoMeta:
  ogImage: https://example.org/talk/og.png
  ogUrl: https://example.org/talk
---

# Preview picture
```
