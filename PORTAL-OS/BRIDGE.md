# Bridge contracts

The Bridge is how modules talk to each other without tight coupling.

Instead of:

- random imports
- ad‑hoc function calls

Portal‑OS uses **contracts**:

- Explicit functions exported from engines.
- Clear data shapes.
- Stable names.

Examples:

- Canvas‑Music exports:
  - `startCanvasMusicEngine`
  - `stopCanvasMusicEngine`
  - `getCanvasMusicDebugState`
  - `getCanvasIdentityDeep`
  - `getPatternTrace`
  - `getAudioPipelineDebug`
- Console imports these and exposes them as commands.

Design rules:

- Bridges are **one level up** from raw imports.
- Bridges are documented here.
- Bridges should be stable and versioned as the OS grows.
