---
name: transitions
description: Slide transitions and the direction classes
---

# Transitions

```md
---
transition: slide-left
---
```

- Names: `slide-left`, `slide-right`, `slide-up`, `slide-down` (they reverse when you go backwards), `fade`, `fade-out`, `view-transition` (the browser's View Transitions API; no animation without it).
- `transition: slide-left | slide-right` sets the forward and the backward variant yourself.
- A transition on a slide is used between that slide and the next one, in both directions.
- In the headmatter it applies to every slide that sets none. The default is none.
- Duration: CSS variable `--slidev-transition-duration` (0.5s).
- Not available: a transition as an object (Vue `TransitionGroupProps`, custom class names).

<!-- verify -->

```md
---
title: Transitions
transition: fade
---

# Fades into the next

---
transition: slide-left | slide-right
---

# Slides left, back to the right

---
transition: view-transition
---

# Browser view transition
```
