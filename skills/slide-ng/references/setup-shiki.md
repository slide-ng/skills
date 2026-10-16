---
name: setup-shiki
description: setup/shiki.ts - Shiki options, languages and transformers
---

# setup/shiki.ts

Returns the options of Shiki's `codeToHtml`, used at generation. `langs` adds languages (names or grammar objects), `transformers` change the HTML of every block, `theme` or `themes` choose colours (`themes` wins). Options of later roots are put over earlier ones; `langs` of all roots are collected.

<!-- verify-file: setup/shiki.ts -->

```ts
export default () => ({
  langs: ['rust'],
  themes: { light: 'github-light', dark: 'github-dark' },
});
```

<!-- verify -->

````md
---
title: Shiki setup
---

# Rust highlighting

```rust
fn main() {
    println!("hi");
}
```
````
