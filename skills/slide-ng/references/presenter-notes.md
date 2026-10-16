---
name: presenter-notes
description: Speaker notes and the notes PDF
---

# Notes

- The **last HTML comment** of a slide is its note. Markdown works in it. `[click]` and `[click:3]` mark click positions, see `animation-click-marker.md`.
- Notes are shown on `/presenter/<n>` and `/notes`.
- `slide-ng export-notes` makes a PDF of the notes, see `export-notes.md`.
- `slide-ng build --without-notes` leaves the notes out of the shipped site.
- Notes auto ruby (`notesAutoRuby`) does not exist.

<!-- verify -->

```md
---
title: Notes
---

# Slide with a note

<!--
This is the note. It can have **markdown**.
-->
```
