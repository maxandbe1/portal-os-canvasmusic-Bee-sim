# Mesh layer

The Mesh layer connects Portal‑OS to the outside world and to itself across boundaries.

Responsibilities:

- **Sync**
  - State synchronization between tabs, devices, or remote peers.
- **Federation**
  - Optional multi‑node or multi‑user coordination.
- **External I/O**
  - HTTP APIs, WebSockets, storage backends.

Design principles:

- Mesh is **optional** — Portal‑OS runs locally without it.
- Mesh is **pluggable** — different backends can be used.
- Mesh is **observable** — Console commands can inspect connections and sync state.

Example future commands:

- `mesh peers`
- `mesh sync-status`
- `mesh log`
