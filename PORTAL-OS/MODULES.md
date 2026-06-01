# Portal‑OS modules

Portal‑OS is composed of cooperating modules. Each module has:

- an **engine** (behavior, state, loop)
- a **view** (UI surface, if applicable)
- a **contract** (how other modules talk to it)

## Core modules

- **console**
  - Command engine, introspection, async commands, history.
- **canvas-music**
  - Audio‑reactive canvas engine, identity/meaning/pattern hooks.
- **dashboard**
  - High‑level overview of system state and modules.
- **memory**
  - Long‑term and short‑term state, snapshots, traces.
- **sound**
  - Audio pipeline, playback, analysis, routing.
- **beesim**
  - Simulation engine, agents, environment, emergent behavior.

## Cognitive modules

- **identity**
  - Identity vectors, modes, emotional state, transitions.
- **pattern**
  - Pattern detection, traces, symmetry, peaks/valleys.
- **meaning**
  - Thematic extraction, narrative, semantic fields.
- **quantum-suite**
  - Quantum‑inspired tools, cryptography, probabilistic reasoning.

## System modules

- **kernel**
  - Scheduler, event bus, virtual FS, process model.
- **mesh**
  - Sync, federation, external APIs, remote peers.
- **daily-brief**
  - Aggregated system summary, status, and next actions.

Each module should be documented in its own file in this folder.


---

### `PORTAL-OS/FULL-FILE-DIRECTIVE.md`

```markdown
# Full‑File Directive

This repo follows a **Full‑File Directive**:

> When generating or modifying code, prefer **full file outputs** over partial snippets.

This is especially important for Copilots.

## Rules for assistants (GitHub Copilot, Microsoft Copilot, others)

- When asked to “add,” “update,” or “replace” logic:
  - Return the **entire file** content.
  - Include all imports and exports.
  - Ensure the file is runnable as‑is.
- Avoid:
  - Diffs
  - Partial patches
  - “Insert this here” instructions
  - Incomplete code blocks

## Why

- Keeps modules coherent.
- Avoids drift between snippets and reality.
- Makes refactors safer.
- Matches how Portal‑OS is designed: modules as whole units.

