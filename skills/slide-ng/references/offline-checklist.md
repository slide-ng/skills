---
name: offline-checklist
description: Day-before checklist for presenting without a network
---

# Checklist

Pick one way to carry the deck: the offline folder (`offline-folder.md`), a PWA (`offline-pwa.md`), or a PDF (`slide-ng export --format pdf --with-clicks`; no animations, Monaco, drawing or presenter view).

The day before:

1. `slide-ng build --offline --download --out talk-offline`; read the output for `could not download` and `fonts:` warnings.
2. Copy it to the presenting machine and to a second place with the PDF.
3. Turn the network off (aeroplane mode, Wi-Fi switched off).
4. Open `index.html`; step through every slide and click. Look at pictures, fonts, math, diagrams, Monaco, videos (a video file must be in `public/`; a YouTube link cannot work).
5. Open the presenter page and a second window; move in one and the other must follow. Check notes and timer.
6. Test the projector: resolution, full screen (`f`), which screen the second window opens on.
7. Charge the laptop; no sleep, no update.

In the room: open the folder before the talk; keep the PDF open as plan C. A blank page means a normal build was opened from disk: use the offline folder or `python3 -m http.server`.

Not verified: Firefox and Safari from `file://`, camera and recording from `file://`, a network share or USB stick on another OS, real projectors.
