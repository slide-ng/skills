---
name: transform
description: Scale a part of a slide with <transform>
---

# Transform

`<transform scale="0.5" origin="top left">` scales what is inside it. `origin` is a CSS `transform-origin`.

<!-- verify -->

```md
---
title: Transform
---

# Scaled

<transform scale="0.5" origin="top left">

## Half size

Content inside.

</transform>
```
