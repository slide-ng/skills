---
name: code-magic-move
description: Animate code between steps with Shiki Magic Move
---

# Magic Move

Several code steps in one block, moving between them with a click each (`@shikijs/magic-move`, loaded only when a deck uses it). Use a fence with **four** backticks and `magic-move` after the language `md`, holding normal fences:

`````md
````md magic-move {lines: true}
```js {*|1|2-3}
let count = 1;
function add() {
  count++;
}
```

```ts
let count: number = 1;
const add = () => (count += 1);
```
````
`````

- Each inner fence is one step; ranges inside a step add clicks of their own (`{*|1|2-3}` is three steps).
- Options after `magic-move`: `lines`, `at` (first click), `duration` (ms; headmatter `magicMoveDuration` sets it for the deck). A `[title]` before the options gives a title bar.
- Headmatter `magicMoveCopy` is read; the other `shiki.magicMove` options are not (the stagger is fixed).

<!-- verify -->

`````md
---
title: Magic move
magicMoveDuration: 600
---

# Steps

````md magic-move {lines: true}
```js {*|1|2-3}
let count = 1;
function add() {
  count++;
}
```

```ts
let count: number = 1;
const add = () => (count += 1);
```
````
`````
