---
name: icons
description: Iconify icons as tags or classes
---

# Icons

Any icon of an installed [Iconify](https://iconify.design) set is a tag `<set-name />` or a UnoCSS class `i-set:name`.

```md
<carbon-apps /> <mdi-account-circle class="text-red-500 text-3xl" /> <ph-star-fill />
<span class="i-carbon:apps"></span>
```

- Installed: Carbon (`carbon`), Material Design Icons (`mdi`), Phosphor (`ph`).
- Another set: `npm i -D @iconify-json/<set>` (for example `tabler`), then `<tabler-bell />`. Only icons that are used end up in the CSS.
- Colour and size come from the text classes: `text-red-500`, `text-3xl`.
- Write the dash form `<carbon-apps />`. The colon form `<carbon:apps />` is not a tag here; the colon belongs to the class form `i-carbon:apps`.
- An icon name of a set that is not installed draws nothing.

<!-- verify -->

```md
---
title: Icons
---

# Icons

<carbon-apps /> <mdi-account-circle class="text-red-500 text-3xl" /> <ph-star-fill />

<span class="i-carbon:apps text-4xl"></span>
```
