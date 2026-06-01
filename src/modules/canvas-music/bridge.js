// src/modules/canvas-music/bridge.js
//
// Modern MVV Bridge for Canvas‑Music Engine
// Provides a stable, object‑based API for bootstrap + other modules.
import ConsoleBridge from "../modules/console/bridge.js";
import IdentityBridge from "../modules/identity/bridge.js";
import MemoryBridge from "../modules/memory/bridge.js";
import DashboardBridge from "../modules/dashboard/bridge.js";
import SoundBridge from "../modules/sound/bridge.js";
import CanvasMusicBridge from "../modules/canvas-music/bridge.js";
import BeesimBridge from "../modules/beesim/bridge.js";




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

