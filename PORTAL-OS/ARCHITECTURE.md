# Portal‑OS architecture

Portal‑OS is a modular, OS‑like system built inside a web runtime.

It is organized into three primary layers:

- **Kernel Layer** — identity physics, scheduling, events, virtual FS
- **Mesh Layer** — distributed state, sync, federation, external I/O
- **Cognitive Layer** — pattern, meaning, memory, quantum, simulation

On top of these layers sit **modules** (apps) that share common contracts:

- Console
- Canvas‑Music
- Beesim
- Memory
- Sound
- Dashboard
- Identity
- Pattern
- Meaning
- Quantum Suite
- Daily Brief
- More as the OS grows

The core principles:

- **Everything is a module** — even “system” features.
- **Modules talk via contracts** — not ad‑hoc imports.
- **Introspection is first‑class** — the OS can see itself.
- **Full‑file discipline** — modules are defined as whole units, not fragments.
- **Engines, not pages** — each module has an engine (behavior) and a view (surface).

This folder documents the architecture so both humans and Copilots can operate consistently.
