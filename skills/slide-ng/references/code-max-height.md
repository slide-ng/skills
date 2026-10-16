---
name: code-max-height
description: Scroll inside a long code block
---

# Max height

`{maxHeight:'100px'}` limits the block height and scrolls inside it. Any CSS size works (`'8em'`, `'30%'`). Combine with other options: `{lines:true, maxHeight:'100px'}`.

<!-- verify -->

````md
---
title: Max height
---

# Scrolling code

```ts {maxHeight:'100px'}
const a = 1;
const b = 2;
const c = 3;
const d = 4;
const e = 5;
const f = 6;
const g = 7;
```
````
