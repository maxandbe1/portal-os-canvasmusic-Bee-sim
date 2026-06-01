# Copilot rules for this repo

This file is for **GitHub Copilot** and other AI coding assistants.

The goal is to align assistants with the **Portal‑OS architecture** and **Full‑File Directive**.

## 1. Full‑file behavior

When generating code:

- Prefer returning **entire files**.
- Include all necessary imports, exports, and wiring.
- Avoid partial diffs or “insert this snippet” style responses.

## 2. Respect module structure

Modules typically live under:

```text
src/modules/<name>/
  engine.js
  view.jsx
