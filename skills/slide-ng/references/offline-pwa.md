---
name: offline-pwa
description: pwa true - a service worker and install icons, after one visit online
---

# PWA

```yaml
pwa: true # or pwa: build
```

- The build writes `sw.js`, `manifest.webmanifest` and install icons (192, 512, maskable 512). The service worker stores every file the first time the deck is opened. A corner label says "Available offline" when everything is stored, and "Offline" while the browser has no network.
- **The first visit must be online.** A browser that never opened the deck cannot get it without a network; a new profile, private window or cleared site data starts from nothing.
- Needs HTTPS or `localhost`.
- Icons come from `public/icon.png`, else `public/icon.svg`, else a local `favicon` file in `public/`, else a generated letter. They are drawn with Chromium; without it the build warns and goes on with no icons.
- Fonts are self-hosted by default with `pwa`.
- A new build gets a new cache name, so visitors get the new version on their next visit.
- Not verified: updating an installed PWA, how long a browser keeps the store.

<!-- verify -->

```md
---
title: PWA deck
pwa: true
---

# Open once online, then offline
```
