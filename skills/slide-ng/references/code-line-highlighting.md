---
name: code-line-highlighting
description: Static and click-stepped line highlights
---

# Line highlighting

````md
```ts {2,3|5|all}
const a = 1;
```
````

- `{2,3}`: lines 2 and 3 are highlighted, the others dimmed. `{*}` highlights nothing and keeps every line normal.
- `{1|3-4|all}`: one range **per click**. Line 1, then lines 3 and 4, then everything. `hide` shows nothing, `all` all lines. Each `|` adds one click to the slide.
- Options in the second brace: `{at:'+1', finally:'last'}`: the first click of the ranges (default `+1`) and what shows after the last click (`last`, `all`, `hide`, or a range).

<!-- verify -->

````md
---
title: Line highlighting
---

# Static and stepped

```ts {2,3}
const a = 1;
const b = 2;
const c = a + b;
```

```ts {1|2-3|all} {at:'+1', finally:'last'}
const a = 1;
const b = 2;
const c = a + b;
```
````
