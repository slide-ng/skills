# Changelog

All notable changes are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Releases of this mirror carry the version of the slide.ng core whose skill they contain (`SOURCE.json` has the commit).

## [Unreleased]

### Changed

- `skills/slide-ng` is now the skill of slide.ng 2.0.0 (core commit `27396e1`). It has two new references, `layout-progress-bar.md` (the `progressBar` headmatter key and `<slide-ng-progress-bar>`) and `setup-routes.md` (`setup/routes.ts`), and 49 changed files for the other 2.0 changes. See the [slide.ng 2.0.0 changelog](https://github.com/slide-ng/slide.ng/blob/main/CHANGELOG.md).
- The repository is now `slide-ng/skills` (it was `slide-ng/slide.ng-skills`); links point to the new name.

## [0.0.0] - unreleased

The first mirror. Nothing is published yet.

### Added

- `skills/slide-ng`: the skill of slide.ng at the core commit recorded in `SOURCE.json` (`SKILL.md`, its `README.md` and 82 references).
- `scripts/sync-from-core.mjs`: copies the skill from a core checkout after the core's drift check passes, removes files that disappeared, and rewrites `SOURCE.json`.
- `scripts/check-sync.mjs`: compares the skill folder with `SOURCE.json` and, with `CORE_DIR`, with the core.
- Unit tests, CI, a commit message check, git hooks, issue and pull request templates and the usual repository files.

[Unreleased]: https://github.com/slide-ng/skills/compare/v0.0.0...HEAD
[0.0.0]: https://github.com/slide-ng/skills/commits/main
