// src/modules/memory/bridge.js

import {
  initMemory,
  setMemory,
  getMemory,
  getAllMemory,
  clearMemory
} from "./engine.js";

export const MemoryBridge = {
  init: initMemory,
  set: setMemory,
  get: getMemory,
  all: getAllMemory,
  clear: clearMemory
};

export default MemoryBridge;

