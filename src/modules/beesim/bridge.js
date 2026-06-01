// src/modules/beesim/bridge.js

import {
  initBeesim,
  startBeesim,
  stopBeesim,
  getBeesimState
} from "./engine.js";

export const BeesimBridge = {
  init: initBeesim,
  start: startBeesim,
  stop: stopBeesim,
  state: getBeesimState
};

export default BeesimBridge;

