---
name: presenter-recording
description: Camera bubble, screen and camera recording
---

# Camera and recording

```yaml
record: true # default dev (only while developing); false or build also work
```

- Adds a camera button and a record button to the bar, and camera, microphone and "record screen / camera" to the settings.
- The camera is a round, draggable picture over the slides.
- Recording uses the browser's recorder and downloads a `.webm` named after the deck when you stop (pause and resume work). Screen recording asks which tab or screen to share.
- Missing: a separate camera file, mp4 or mkv, cloud upload.
- Not verified: camera, microphone and screen share from `file://`.

<!-- verify -->

```md
---
title: Recording
record: true
---

# Record this
```
