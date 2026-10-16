---
name: presenter-remote
description: Let other devices on the network open the deck and follow the presenter
---

# Remote use

```sh
slide-ng dev --remote=secret      # others on your network can follow
slide-ng dev --remote             # same without a password; prints a warning
slide-ng dev --remote=secret --bind 192.168.1.5
```

- It prints the public and private deck addresses and the presenter's: `/presenter/1?password=secret`. A viewer opens `http://<your address>:4230/1?password=secret`.
- The password is optional (as in Slidev). Without it every address is listened on, a warning is printed, and Host, Origin and session token are still checked.
- No HTTPS: the password travels in the clear. Use a network you trust.
- The dev server listens on loopback only unless `--remote` is given. Dev only; a built deck has no sync server between devices (windows of one browser still sync).
- Never loosen the dev server's checks (Host, Origin, no file names from requests).
- Not tried on a real LAN or a second physical device.

<!-- verify -->

```md
---
title: Remote
---

# Run with --remote

Start `slide-ng dev --remote=secret` and open the printed address on another device.
```
