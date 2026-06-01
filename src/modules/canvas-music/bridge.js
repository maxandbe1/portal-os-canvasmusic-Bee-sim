// src/modules/canvas-music/bridge.js
//
// Modern MVV Bridge for Canvas‑Music Engine
// Provides a stable, object‑based API for bootstrap + other modules.

import {
  startCanvasMusicEngine,
  stopCanvasMusicEngine,
  getCanvasMusicDebugState,
  setCanvasIdentityState,
  setCanvasMeaningState,
  setCanvasPatternState,
  setCanvasAudioState
} from "./engine.js";

export const CanvasMusicBridge = {
  start: startCanvasMusicEngine,
  stop: stopCanvasMusicEngine,

  debug() {
    return getCanvasMusicDebugState();
  },

  setIdentity: setCanvasIdentityState,
  setMeaning: setCanvasMeaningState,
  setPattern: setCanvasPatternState,
  setAudio: setCanvasAudioState
};

export default CanvasMusicBridge;

