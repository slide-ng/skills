# Contributing to slide.ng-skills

Thanks for helping. First, the one rule that matters here:

**Do not edit anything under `skills/` in this repository.** It is a mirror of `skills/slide-ng` in the [slide.ng](https://github.com/slide-ng/slide.ng) repository, and the next sync would overwrite your change. CI (`check-sync`) also fails when the folder no longer matches `SOURCE.json`.

By taking part you agree to the [Code of Conduct](CODE_OF_CONDUCT.md). Report security problems privately, as [SECURITY.md](SECURITY.md) describes. By contributing you agree that your work is licensed under the [MIT license](LICENSE) of this project.

## Where a change goes

| you want to change                                                | where                                                         |
| ----------------------------------------------------------------- | ------------------------------------------------------------- |
| a wrong or missing instruction, a new reference, a code sample    | the core repository: `skills/slide-ng` (and `docs/` first)    |
| how the skill is checked against the docs (drift guard, samples)  | the core repository: `skills/GENERATION.md`, `scripts/skills` |
| the sync or check scripts, CI, the README or install instructions | this repository                                               |

In the core, the skill is derived from the documentation: change the document, update the skill file that lists it in `skills/GENERATION.md`, run `npm run test:skills`, then `npm run update:skills-hash`. See the core's `docs/AGENT-SKILL.md`.

## The sync flow

1. A change to the skill is merged in the core repository, and the core's `npm run check:skills` passes.
2. After a core release, a maintainer runs `node scripts/sync-from-core.mjs ../slide.ng` here. It refuses if the core's drift check fails, copies the folder, deletes files that no longer exist in the core and rewrites `SOURCE.json`.
3. The maintainer reviews `git diff`, runs `npm test` and `npm run check-sync`, commits with `chore(sync): ...` and tags `v<core version>`.

The mirror tag is always the core version; see the README.

## Set up

You need Node.js 22.23.3 or newer (`.nvmrc` names the version CI uses).

```sh
git clone https://github.com/slide-ng/slide.ng-skills.git
cd slide.ng-skills
npm install          # also sets core.hooksPath to .githooks and commit.template to .gitmessage
npm test
CORE_DIR=../slide.ng npm run check-sync     # optional: compare with a core checkout
```

The `commit-msg` hook warns when a message does not follow the rules below. It never blocks the commit.

## Commands

| command                       | what it does                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------ |
| `npm test`                    | unit tests of the sync and check scripts and of the commit message check       |
| `npm run check-sync`          | the local skill folder against `SOURCE.json` (and `CORE_DIR`, if set)          |
| `npm run sync -- ../slide.ng` | `scripts/sync-from-core.mjs` (maintainers)                                     |
| `npm run format`              | Prettier, writes changes (`format:check` only checks); never touches `skills/` |

## Code style

Small files, plain comments, no runtime dependencies. Prettier decides the formatting (`.prettierrc`, `.editorconfig`). Tests use `node:test` and build their fixtures in temporary folders.

## Commit messages

`type(scope): summary`, imperative, lower case, no period, 72 characters at most, no trailer lines. An optional body, after a blank line, says why.

- Types: `feat`, `fix`, `perf`, `refactor`, `test`, `docs`, `style`, `build`, `ci`, `chore`, `revert`.
- Scopes: `skill` (a sync commit that changes the mirrored skill), `sync`, `scripts`, `tests`, `docs`, `deps`, `ci`. Leave the scope out when a change spans several parts.

Pull requests are squash merged, so the pull request title must follow the same form:

```sh
node scripts/commit-message.mjs --title "fix(scripts): ignore symbolic links in the hash"
node scripts/commit-message.mjs --range origin/main..HEAD
```

## Rules

- One change per pull request, with a test where it makes sense. Fill in the pull request template.
- Open an issue first for a large change to the scripts.
