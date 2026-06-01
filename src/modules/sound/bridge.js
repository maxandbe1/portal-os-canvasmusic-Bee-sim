// src/modules/sound/bridge.js

import {
  initSound,
  getSoundContext,
  setMasterVolume,
  playBeep
} from "./engine.js";

export const SoundBridge = {
  init: initSound,
  context: getSoundContext,
  setVolume: setMasterVolume,
  beep: playBeep
};

export default SoundBridge;

