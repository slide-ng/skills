---
name: export-notes
description: Export the speaker notes as a PDF
---

# Notes PDF

```sh
slide-ng export-notes            # <name>-notes.pdf
```

- Takes the same flags as `export` where they make sense (`--output`, `--executable-path`, `--timeout`).
- Needs Chromium (`CHROME_PATH`).
- Verify: `<name>-notes.pdf` exists and contains the notes text.
- Notes can be left out of a site with `slide-ng build --without-notes`.
