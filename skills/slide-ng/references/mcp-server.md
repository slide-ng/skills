---
name: mcp-server
description: slide-ng mcp - an MCP server over stdio that reads and edits slides
---

# MCP server

```sh
slide-ng mcp [slides.md]
```

An MCP server on stdio for a tool client. It touches only the deck's markdown files. stdout carries the protocol; the start message `slide-ng mcp: serving <path>` goes to stderr.

Client configuration (the shape depends on the client):

```json
{ "mcpServers": { "slide-ng": { "command": "slide-ng", "args": ["mcp", "slides.md"] } } }
```

- Path confinement: a slide that lives in a file outside the deck's folder is refused.
- Slide 1 (it carries the headmatter) cannot be removed or moved; insert, remove and move need all slides to be in the entry file.
- Every edit is checked: the other slides must look the same afterwards, and the file is only written if the result parses as expected.
- Tool list and arguments: `mcp-tools.md`.
- A coding agent that can edit files directly may edit `slides.md` itself; the server is for clients that cannot.
