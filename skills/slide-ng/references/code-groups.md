---
name: code-groups
description: Tabs for several code blocks
---

# Code groups

The tab name is the `[title]` of each block.

````md
::code-group

```sh [npm]
npm i @slide-ng/core
```

```sh [yarn]
yarn add @slide-ng/core
```

::
````

- The `~icon~` title syntax and automatic file icons of Slidev are not drawn.
- The `::code-group` ... `::` lines are on their own lines, blank lines around the fences.

<!-- verify -->

````md
---
title: Code groups
---

# Install

::code-group

```sh [npm]
npm install
```

```sh [yarn]
yarn install
```

::
````
