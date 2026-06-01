# Kernel layer

The Kernel is the lowest logical layer of Portal‑OS.

It is responsible for:

- **Scheduling**
  - Coordinating engine loops (canvas, sims, background tasks).
- **Event bus**
  - Pub/sub for module events (e.g. `pattern:updated`, `audio:peak`).
- **Virtual filesystem (VFS)**
  - Logical paths for state and artifacts (e.g. `/identity/state`, `/pattern/trace`).
- **Process model**
  - Long‑running tasks, async jobs, watchers.

## Design principles

- Kernel does not know UI.
- Kernel exposes **contracts**, not components.
- Kernel is introspectable via Console commands (e.g. `ps`, `events`, `vfs ls`).

## Example responsibilities

- Start/stop engine loops.
- Route events between modules.
- Maintain a registry of running “processes” (engines, watchers, profilers).
