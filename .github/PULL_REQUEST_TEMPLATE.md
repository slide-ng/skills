<!-- Title the pull request like a commit: type(scope): summary. See the "Commit messages" section of CONTRIBUTING.md -->

> **Changes to the skill content (anything under `skills/`) belong in the [slide.ng](https://github.com/slide-ng/slide.ng) core repository.** This repository is a mirror: a pull request that edits `skills/` here will fail `check-sync` and be closed. Open it in the core instead.

## What and why

<!-- What does this change, and why is it needed? Link an issue with "Fixes #123". -->

## How I checked it

<!-- The commands you ran. -->

## Checklist

- [ ] I did not edit anything under `skills/` or `SOURCE.json` by hand (a sync commit made with `scripts/sync-from-core.mjs` is the only exception).
- [ ] `npm run format:check`, `npm test` and `npm run check-sync` pass.
- [ ] I added or updated tests.
- [ ] I agree that my contribution is under the MIT license.
