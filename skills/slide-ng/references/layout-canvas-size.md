---
name: canvas-size
description: Slide canvas size and aspect ratio
---

# Canvas size

```yaml
canvasWidth: 980 # default 980, like Slidev
aspectRatio: 16/9 # or 4/3, 1.6 ...
```

- Default canvas is 980 wide at 16/9 (height rounded up: 552). The slide is scaled to fit the window with `min(w/width, h/height)`.
- Position values in `v-drag`, `<arrow>`, `<transform>` are in canvas pixels.

<!-- verify -->

```md
---
title: Canvas
canvasWidth: 800
aspectRatio: 4/3
---

# A 4:3 deck
```
