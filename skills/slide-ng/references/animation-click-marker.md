---
name: click-marker
description: Click markers in speaker notes
---

# Click markers in notes

In a slide's note, `[click]` marks where a click starts and `[click:3]` marks click 3. The presenter page shows the note in sections; double click a marker to jump the slide to that click.

```md
<!--
Say hello.
[click] Now the first item.
[click:3] Back to the plan.
-->
```

<!-- verify -->

```md
---
title: Click markers
---

# Notes with markers

<div v-click>first</div>
<div v-click>second</div>

<!--
Introduce the slide.
[click] Explain the first item.
[click] Explain the second item.
-->
```
