---
name: export-print-route
description: The /print route that the exporter uses
---

# Print route

The exporter loads `/print` (and `/presenter/print`) of a served build: one page per slide with ids `<slide>-<click>`.

- `?print=clicks` makes a page for every click step; `?range=2-4` limits the slides.
- Lazy components mark themselves with `data-slide-ng-waitfor` until they are drawn; the exporter waits for the marker to disappear.
- `<slide-ng-render-when context="print">` shows content only on paper; its `<div fallback>` shows elsewhere.
- Opening `/print` in a browser and using the browser's own print works too.
