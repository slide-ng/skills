---
name: click-lists
description: v-clicks, v-switch and v-click-gap
---

# Lists, switches and gaps

```md
<v-clicks>

- first
- second

</v-clicks>
```

- Leave an empty line after `<v-clicks>` and before `</v-clicks>`, otherwise markdown does not turn the list into HTML.
- Options: `depth="2"` (include nested lists), `every="2"` (items per click), `at="3"` (first click), `hide` (items hide instead of show).

```md
<v-switch>
  <div at="1">shown at click 1</div>
  <div at="2">shown at click 2</div>
  <div at="3-5">shown from click 3 to 5</div>
</v-switch>

<v-click-gap size="2" />
```

- `<v-switch>`: one child per click. A number lasts until the next child starts; `3-5` is explicit.
- `<v-click-gap size="2" />` leaves two clicks empty.

<!-- verify -->

```md
---
title: Click lists
---

# Lists by click

<v-clicks depth="2" every="1">

- first
  - nested
- second

</v-clicks>

<v-switch>
  <div at="1">one</div>
  <div at="2">two</div>
  <div at="3-5">three to five</div>
</v-switch>

<v-click-gap size="1" />
```
