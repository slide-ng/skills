---
name: zoom
description: Zoom the content of every slide or one slide
---

# Zoom

```yaml
zoom: 0.8 # headmatter: all slides
```

A slide's own `zoom:` wins over the headmatter's.

<!-- verify -->

```md
---
title: Zoom
zoom: 0.8
---

# Smaller

---
zoom: 1
---

# Normal size
```
