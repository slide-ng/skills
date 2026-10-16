---
name: build-pdf-download
description: The PDF download button
---

# PDF download button

```yaml
download: true # a button in the bar and the settings menu
```

- `slide-ng build --download` makes the PDF with the same code as `slide-ng export` and writes `<exportFilename>.pdf` next to the site (needs Chromium).
- The button is enabled only if the PDF can be fetched, so it stays disabled in `slide-ng dev` and in builds made without `--download`.
- `download: https://example.com/talk.pdf` points the button at another file; no PDF is made.
- `exportFilename` is a plain name without extension; folders and `..` are removed.
- From an offline folder (`file://`) the button opens the PDF in a new tab.

<!-- verify -->

```md
---
title: Download
download: true
exportFilename: my-talk
---

# Has a download button
```
