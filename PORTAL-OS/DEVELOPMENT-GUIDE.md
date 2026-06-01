# Portal‑OS development guide

This guide defines how to build modules and engines in Portal‑OS.

## Core rules

1. **Full‑file discipline**
   - When modifying a module, think in terms of full files, not fragments.
2. **Engine + View**
   - Separate behavior (engine) from surface (view).
3. **Introspection first**
   - Every engine should expose debug/introspection functions.
4. **Console integration**
   - Important engines should have Console commands.
5. **Contracts, not spaghetti**
   - Use clear exports and documented contracts between modules.

## Typical module structure

```text
src/modules/<name>/
  engine.js   # behavior, state, loops, contracts
  view.jsx    # UI surface, hooks into engine
  index.js    # optional, re‑exports or wiring
