# Console subsystem

The Console is the **reflection interface** of Portal‑OS.

It provides:

- A **command engine**
  - Registry of commands (sync + async).
  - Dispatcher, parser, aliases.
- A **view**
  - Input, output log, history, arrow navigation.
- **Introspection**
  - `state <module>`
  - `state canvas-music`
  - `state identity --deep`
  - `pattern trace`
  - `audio pipeline`
  - `watch canvas-music`

## Design rules

- Commands are pure functions where possible.
- Async commands are fully awaited and surfaced in the UI.
- Special tokens (e.g. `__CLEAR__`) are used for control flows.
- Console can push messages from other modules via a global hook (e.g. `window.__consolePush`).

The Console is treated as a **first‑class OS module**, not a dev tool.
