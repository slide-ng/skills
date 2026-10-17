<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/readme-banner-dark.png">
  <img alt="slide.ng" src="assets/readme-banner-light.png" width="800">
</picture>

# slide.ng agent skill

A standalone, installable copy of the agent skill for [slide.ng](https://github.com/slide-ng/slide.ng): a folder with `SKILL.md` and `references/` that teaches a coding agent to write, check and present slide.ng decks. For the tool itself, see [slide-ng.dev](https://slide-ng.dev).

**This repository is a mirror.** The skill is written and checked in the slide.ng repository. Nothing under `skills/` is edited here; [SOURCE.json](SOURCE.json) records which core commit it was copied from.

```
skills/slide-ng/
  SKILL.md          when to use it, quick start, basic syntax, rules, a table of every reference
  README.md         what the skill is and how to install it
  references/       83 short files, one per topic
```

The references cover the CLI, syntax, animation, code, diagrams, layouts, the presenter, build, export, themes, setup files, offline mode and MCP. A `not-supported` reference lists what slide.ng does not have, so an agent does not invent it. Samples are checked to build; whether a deck looks right, or features that need a network, a browser or a real device, are described, not tested.

## Install

All options put a folder named `slide-ng` (with `SKILL.md` in it) where your agent tooling reads skills. The core CLI default is `.agents/skills/slide-ng`.

With the slide.ng command line (the copy that matches your installed version):

```sh
slide-ng skills install                        # .agents/skills/slide-ng in the current folder
slide-ng skills install --dir tools/skills     # tools/skills/slide-ng
slide-ng skills install --force                # replace an earlier copy
```

From this repository, with a tool that installs skills from GitHub (give it `slide-ng/slide.ng-skills` and the skill `slide-ng`), or by hand:

```sh
git clone --depth 1 https://github.com/slide-ng/slide.ng-skills.git
mkdir -p .agents/skills
cp -r slide.ng-skills/skills/slide-ng .agents/skills/slide-ng
```

## Versions

A tag `vX.Y.Z` here means `skills/slide-ng` is the skill of slide.ng `X.Y.Z`; `SOURCE.json` has the exact core commit and the content hash. To pin a version, add `--branch v<core version>` to the clone.

## Maintainers: keeping the mirror in step

After a core release, from a checkout of this repository next to a checkout of slide.ng:

```sh
node scripts/sync-from-core.mjs ../slide.ng     # the path is optional
npm test && npm run check-sync
```

`npm run check-sync` compares the local folder with the hash in `SOURCE.json` (it catches hand edits); with `CORE_DIR=../slide.ng` it also compares with the core. Other scripts: `npm run format:check`. Prettier ignores `skills/` so the mirrored files and their hash do not change. Node.js 22.23.3 or newer (`.nvmrc`).

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md): skill content changes go to the core repository. Changes follow the [Code of Conduct](CODE_OF_CONDUCT.md); security problems go through [SECURITY.md](SECURITY.md). Changes are listed in [CHANGELOG.md](CHANGELOG.md). MIT licensed, see [LICENSE](LICENSE).
