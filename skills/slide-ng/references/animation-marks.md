---
name: marks
description: v-mark rough-notation marks on clicks
---

# v-mark

Draws a hand-made mark on an element. It works like `v-click`; rough-notation is loaded only when used.

```md
<span v-mark.red.circle="1">circled at click 1</span>
<span v-mark.underline>underlined at the next click</span>
<span v-mark="{ at: 3, type: 'box', color: '#234' }">boxed at click 3</span>
<span v-mark="[2, 4]">shown at clicks 2 and 3 only</span>
```

- Type modifiers: `underline` (default), `circle`, `highlight`, `box`, `bracket`, `strike-through` (`strike`, `line-through`), `crossed-off` (`cross`).
- Colours: `red`, `blue`, `green`, `orange`, `yellow`, `pink`, `purple`, `teal`, `cyan`, `indigo`, `lime`, `gray`, `black`, `white`.
- `.delay300` waits 300 ms after the click; `.op50` sets opacity.
- The object form takes any rough-notation option (`strokeWidth`, `padding`, `iterations`, `animationDuration`, `brackets`, `multiline`).
- `v-mark="true"` shows the mark from the start, `false` never.

<!-- verify -->

```md
---
title: Marks
---

# Marks

<span v-mark.red.circle="1">circled at click 1</span>

<span v-mark.underline>underlined at the next click</span>

<span v-mark="{ at: 3, type: 'box', color: '#234' }">boxed at click 3</span>

<span v-mark="[2, 4]">shown at clicks 2 and 3 only</span>
```
