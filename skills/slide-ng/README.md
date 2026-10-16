# slide.ng agent skill

An agent skill for coding agents that write or change slide.ng decks. It is a folder with `SKILL.md` and `references/`, in the common skill format: install it where your agent tooling reads skills.

```sh
slide-ng skills install            # copies it to .agents/skills/slide-ng of the current project
slide-ng skills install --dir .tools/skills   # to .tools/skills/slide-ng
slide-ng skills install --force    # replace an earlier copy of this skill
```

- `SKILL.md`: when to use it, quick start, basic syntax, rules, and a table of every reference.
- `references/`: one short file per topic, named by group: `core-`, `animation-`, `code-`, `diagram-`, `layout-`, `presenter-`, `build-`, `export-`, `theme-`, `setup-`, `offline-`, `mcp-`. `not-supported.md` lists what does not exist.
- Complete decks and slides in the references are built by `npm run test:skills` in the slide.ng repository.
- In the slide.ng repository, `skills/GENERATION.md` records which documents each file was written from, and `npm run check:skills` fails when one of them changed.
