<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/readme-banner-dark.png">
  <img alt="slide.ng" src="assets/readme-banner-light.png" width="800">
</picture>

# slide.ng agent skill

A standalone, installable copy of the agent skill for [slide.ng](https://github.com/slide-ng/slide.ng): a folder with `SKILL.md` and `references/` that teaches a coding agent to write, check and present slide.ng decks (markdown slides with Angular templates, a Slidev port for Angular).

**This repository is a mirror.** The skill is written and checked in the slide.ng repository, where a drift guard keeps it true to the documentation and a test builds every code sample. Nothing under `skills/` is edited here; [SOURCE.json](SOURCE.json) records which core commit it was copied from.

```
skills/slide-ng/
  SKILL.md          when to use it, quick start, basic syntax, rules, a table of every reference
  README.md         what the skill is and how to install it
  references/       82 short files, one per topic
```

## Install

Pick one. All of them put a folder named `slide-ng` (with `SKILL.md` in it) where your agent tooling reads skills.

### Copy the folder into a project

```sh
mkdir -p .agents/skills
cp -r path/to/slide.ng-skills/skills/slide-ng .agents/skills/slide-ng
```

`.agents/skills/slide-ng` is the default location used by the core CLI. If your agent tooling reads skills from another folder, copy it there instead.

### With the slide.ng command line

The skill ships with the `slide-ng` package, so no download is needed:

```sh
slide-ng skills install                        # .agents/skills/slide-ng in the current folder
slide-ng skills install --dir tools/skills     # tools/skills/slide-ng
slide-ng skills install --force                # replace an earlier copy of this skill
```

It never overwrites without `--force`, and never writes outside the current folder. This copy is the one that matches your installed `slide-ng` version.

### Straight from this GitHub repository

Tools that install agent skills from a GitHub repository look in the repository's `skills/` folder, so this repository works with them as it is. Give the tool the repository (`slide-ng/slide.ng-skills`, or its URL) and choose the skill `slide-ng`. Follow your tool's own instructions for the exact command and for where it writes the skill.

Without such a tool, a plain clone and copy does the same:

```sh
git clone --depth 1 https://github.com/slide-ng/slide.ng-skills.git
mkdir -p .agents/skills
cp -r slide.ng-skills/skills/slide-ng .agents/skills/slide-ng
```

To pin a version, add `--branch v<core version>` to the clone (see [Versions](#versions)).

## What is in the skill

`SKILL.md` plus the skill's own `README.md`, and 82 reference files named by topic group:

| group         | prefix          | files | covers                                                                                                                        |
| ------------- | --------------- | ----: | ----------------------------------------------------------------------------------------------------------------------------- |
| Core          | `core-`         |    15 | CLI, syntax, Angular syntax, frontmatter, headmatter, components, fonts, icons, styling, importing slides, Slidev differences |
| Animation     | `animation-`    |     7 | clicks, click lists and markers, marks, motion, transitions, drawing                                                          |
| Code          | `code-`         |    11 | highlighting, line numbers and ranges, groups, magic move, snippets, Monaco, Twoslash                                         |
| Diagrams      | `diagram-`      |     3 | Mermaid, PlantUML, LaTeX                                                                                                      |
| Layout        | `layout-`       |     8 | built-in and custom layouts, slots, canvas size, zoom, transform, draggable, layers                                           |
| Presenter     | `presenter-`    |     7 | presenter view, notes, timer, recording, remote, switches, dev editor                                                         |
| Build         | `build-`        |     5 | static and SPA builds, SEO meta, OG image, PDF download, remote assets                                                        |
| Export        | `export-`       |     4 | formats, options, notes, the print route                                                                                      |
| Themes        | `theme-`        |     5 | using, writing, structure, ejecting and the official themes                                                                   |
| Setup         | `setup-`        |    11 | setup files: main root, preparser, Shiki, Monaco, Mermaid, KaTeX, code runners, shortcuts, context menu, transformers         |
| Offline       | `offline-`      |     3 | offline folder, PWA, checklist                                                                                                |
| MCP           | `mcp-`          |     2 | the MCP server and its tools                                                                                                  |
| Not supported | `not-supported` |     1 | what does not exist in slide.ng                                                                                               |

## What it does not cover

It is not a replacement for the slide.ng documentation, and it does not describe other slide tools. It deliberately lists what slide.ng does **not** have, so an agent does not invent it: see [`references/not-supported.md`](skills/slide-ng/references/not-supported.md), and [`references/core-slidev-differences.md`](skills/slide-ng/references/core-slidev-differences.md) for Vue habits that fail in Angular. Samples in the references are checked to build; whether a deck looks right, or features that need a network, a browser or a real device, are described, not tested.

## Versions

The version of this mirror is the version of the core it was copied from. A tag `vX.Y.Z` here means `skills/slide-ng` is the skill of slide.ng `X.Y.Z`; `SOURCE.json` has the exact core commit and the content hash of the folder. Commits between tags (tooling, docs of this repository) never change the skill and are not tagged. Install the tag that matches your `slide-ng` version.

## Keeping the mirror in step (maintainers)

The core stays the source of truth. After a core release, from a checkout of this repository, next to a checkout of slide.ng at the release commit:

```sh
node scripts/sync-from-core.mjs ../slide.ng     # the path is optional, ../slide.ng is the default
git diff                                        # review what changed in the skill
npm test && npm run check-sync
git add -A && git commit -m "chore(sync): mirror the skill of slide.ng <version>"
git tag v<version>
```

`sync-from-core` runs the core's own `scripts/check-skills-drift.mjs` first and stops if the skill is stale there, refuses a skill with uncommitted changes in the core (`--allow-dirty` overrides, and records it), replaces `skills/slide-ng` (files removed in the core are removed here) and rewrites `SOURCE.json`. The core is only read, never changed.

`npm run check-sync` recomputes the hash of the local folder and compares it with `SOURCE.json`, which catches a hand edit of the mirror. With `CORE_DIR=../slide.ng npm run check-sync` it also compares with the core's folder, which catches an out-of-date mirror. CI runs the first form.

## Develop

```sh
npm test            # unit tests of the sync and check scripts, and the commit message check
npm run check-sync
npm run format:check
```

Node.js 22.23.3 or newer (`.nvmrc`). The skill folder is never formatted: Prettier ignores `skills/`, because formatting would change the mirrored files and their hash.

## Related repositories

- [slide.ng](https://github.com/slide-ng/slide.ng): the presentation tool itself, and the source of this skill.
- [slide.ng-themes](https://github.com/slide-ng/slide.ng-themes): the official themes.
- [slide.ng-starter](https://github.com/slide-ng/slide.ng-starter): a starter deck to copy.
- [slide.ng-docs](https://github.com/slide-ng/slide.ng-docs): the documentation site.
- [slide.ng-docker](https://github.com/slide-ng/slide.ng-docker): a container image for building and serving decks.
- [slide.ng-vscode](https://github.com/slide-ng/slide.ng-vscode): a Visual Studio Code extension.
- [slide.ng-skills](https://github.com/slide-ng/slide.ng-skills): the agent skill (this repository).
- [slide.ng-org-github](https://github.com/slide-ng/slide.ng-org-github): the organization's `.github` repository (profile and default community files).

These addresses are placeholders until the repositories are published.

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md): skill content changes go to the core repository. Changes follow the [Code of Conduct](CODE_OF_CONDUCT.md); security problems go through [SECURITY.md](SECURITY.md). Changes are listed in [CHANGELOG.md](CHANGELOG.md). MIT licensed, see [LICENSE](LICENSE).
