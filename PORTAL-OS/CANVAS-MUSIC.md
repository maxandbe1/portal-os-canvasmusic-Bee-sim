# Canvas‑Music engine

Canvas‑Music is a visual + audio engine module.

Responsibilities:

- Render visuals on a `<canvas>` at ~60 FPS.
- React to audio input (volume, spectrum, beats).
- Integrate with Identity, Pattern, and Meaning engines.
- Expose introspection hooks for the Console.

## Engine structure

- **Engine state**
  - `engineRunning`, `frameCount`, `lastFPS`, timestamps.
- **Identity / Meaning / Pattern state**
  - `identityState`, `meaningState`, `patternState`, `identityDeep`, `patternTrace`.
- **Audio state**
  - `audioContext`, `analyser`, `currentVolume`.

## Introspection

The engine exposes:

- `getCanvasMusicDebugState()`
- `getCanvasIdentityDeep()`
- `getPatternTrace()`
- `getAudioPipelineDebug()`

And instruments globals:

- `window.__canvasMusicFrame`
- `window.__canvasMusicFPS`
- `window.__canvasIdentity`
- `window.__canvasMeaning`
- `window.__canvasPattern`
- `window.__canvasAudioContext`
- `window.__canvasAnalyser`
- `window.__canvasVolume`

These are consumed by Console commands like:

- `state canvas-music`
- `watch canvas-music`
- `state identity --deep`
- `pattern trace`
- `audio pipeline`
