// src/modules/canvas-music/bridge.js
//
// Portal‑OS Canvas‑Music Bridge
// Provides a stable contract for interacting with the Canvas‑Music engine.
// Other modules should import from this bridge instead of touching engine internals.

import {
  startCanvasMusicEngine,
  stopCanvasMusicEngine,
  getCanvasMusicDebugState,
  getCanvasIdentityDeep,
  getPatternTrace,
  getAudioPipelineDebug,
  setCanvasIdentityState,
  setCanvasMeaningState,
  setCanvasPatternState,
  setCanvasAudioState
} from "./engine.js";

export const CanvasMusicBridge = {
  // Engine lifecycle
  start(options) {
    return startCanvasMusicEngine(options);
  },

  stop() {
    return stopCanvasMusicEngine();
  },

  // Introspection
  state() {
    return getCanvasMusicDebugState();
  },

  identityDeep() {
    return getCanvasIdentityDeep();
  },

  patternTrace() {
    return getPatternTrace();
  },

  audioPipeline() {
    return getAudioPipelineDebug();
  },

  // State mutation (used by Identity/Pattern/Meaning modules)
  setIdentity(next) {
    return setCanvasIdentityState(next);
  },

  setMeaning(next) {
    return setCanvasMeaningState(next);
  },

  setPattern(next) {
    return setCanvasPatternState(next);
  },

  setAudio(next) {
    return setCanvasAudioState(next);
  }
};

export default CanvasMusicBridge;

