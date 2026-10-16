---
name: setup-transformers
description: setup/transformers.ts - change the markdown and render code blocks yourself
---

# setup/transformers.ts

Returns `{ pre, codeblocks }`.

- `pre`: functions that get `{ s, slide, options }` for each slide before it is read. `s` is a [MagicString](https://github.com/Rich-Harris/magic-string) of the slide's markdown (`s.replace`, `s.append`, ...); `slide` has `no`, `index`, `title`, `frontmatter`, `source`. May be async. `preCodeblock` and `postCodeblock` are accepted and run after `pre` (one pass). Lists of roots are joined last root first.
- `codeblocks`: functions that get `{ code, info, lang, meta, slide, options }` per code block. A string they return replaces the block and is **Angular template text** (components allowed; write a `{` or `}` in text as `&#123;` / `&#125;`). `undefined` leaves the block to the next function and finally to normal highlighting. Lists of roots are joined first root first.
- No markdown-it plugins.

<!-- verify-file: setup/transformers.ts -->

```ts
export default () => ({
  pre: [
    ({
      s,
    }: {
      s: { replace: (re: RegExp, fn: (all: string, text: string) => string) => void };
    }) => {
      s.replace(/\[\[\[(.*?)\]\]\]/g, (_all, text) => `<b>${text}</b>`);
    },
  ],
  codeblocks: [
    ({ info, code }: { info: string; code: string }) =>
      info.startsWith('count') ? `<p>${code.trim().length} characters</p>` : undefined,
  ],
});
```

<!-- verify -->

````md
---
title: Transformers
---

# Bold from [[[triple brackets]]]

```count
twelve chars
```
````
