---
name: code-import-snippet
description: Import a file or a region of it into a code block with <<<
---

# Snippets

`<<<` puts a file, or one part of it, into a code block. It takes the same title, ranges and options as a fence.

```md
<<< ./snippets/example.ts
<<< ./snippets/example.ts#greet
<<< ./snippets/example.ts#greet ts {1|2}
<<< @/snippets/example.ts {*}{lines:true}
```

- The path is relative to the markdown file; `@/` is the folder of the entry `slides.md`.
- `#greet` is a region written in the file as `// #region greet` ... `// #endregion greet` (also `<!-- #region -->`, `/* #region */`, `# region`).
- A missing file is a warning and a comment in the block.
- There is no `snippets/` folder convention: write the real path.
- `<<< ... {monaco-write}` makes the block an editor that saves to the file, see `code-monaco-write.md`.

<!-- verify-file: snippets/example.ts -->

```ts
// #region greet
export const greet = (name: string) => `Hello ${name}`;
// #endregion greet

export const bye = () => 'bye';
```

<!-- verify -->

```md
---
title: Snippets
---

# Whole file

<<< ./snippets/example.ts

---

# One region

<<< ./snippets/example.ts#greet ts {lines:true}
```
