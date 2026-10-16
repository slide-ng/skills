---
name: theme-eject
description: Copy the theme in use into the deck to edit it
---

# Eject

```sh
slide-ng theme eject [slides.md] [--dir theme]
```

- Copies the theme in use into `./theme` and sets `theme: ./theme` in the headmatter.
- For the built-in theme: every layout (imports rewritten to `slide-ng/...`) and the layouts' CSS as `styles/index.css`.
- For a package: the whole package folder without `node_modules`, `.git` and symbolic links.
- Refuses a folder that is not empty.
- Verify: `./theme` exists and the headmatter says `theme: ./theme`; `slide-ng build` still works.
