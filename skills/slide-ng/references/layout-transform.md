---
name: transform
description: Scale a part of a slide with <slide-ng-transform>
---

# Transform

`<slide-ng-transform scale="0.5" origin="top left">` scales what is inside it. `origin` is a CSS `transform-origin`.

<!-- verify -->

```md
---
title: Transform
---

# Scaled

<slide-ng-transform scale="0.5" origin="top left">

## Half size

Content inside.

</slide-ng-transform>
```
