---
name: setup-main-root
description: setup/main.ts and setup/root.ts - Angular providers and start-up code
---

# setup/main.ts and setup/root.ts

- `setup/main.ts` returns Angular providers added to the application: any token the app injects, an initializer, a router feature, a service. (`setup/providers.ts` default-exporting the array still works.) Slidev's gets the Vue app; this gets providers.
- `setup/root.ts` runs once when the app starts, in an injection context, so `inject()` works. It is the place for code that watches the whole app. It has no component to work on.

<!-- verify-file: setup/main.ts -->

```ts
import { provideEnvironmentInitializer } from '@angular/core';

export default () => [provideEnvironmentInitializer(() => console.log('the deck started'))];
```

<!-- verify-file: setup/root.ts -->

```ts
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export default () => {
  const router = inject(Router);
  router.events.subscribe(() => (document.documentElement.dataset['path'] = router.url));
};
```

<!-- verify -->

```md
---
title: Main and root
---

# Start-up hooks
```
