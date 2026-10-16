---
name: setup-katex
description: setup/katex.ts - KaTeX options and macros
---

# setup/katex.ts

Returns KaTeX options (`macros`, `strict`, `trust`, ...). A later root replaces a key of an earlier one (a `macros` object is replaced as a whole). `displayMode` and `output` are decided by slide.ng.

<!-- verify-file: setup/katex.ts -->

```ts
export default () => ({ macros: { '\\RR': '\\mathbb{R}' } });
```

<!-- verify -->

```md
---
title: KaTeX setup
---

# Macro

$\RR^n$
```
