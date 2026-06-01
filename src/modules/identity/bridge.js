// src/modules/identity/bridge.js

import { initIdentity, getIdentity, setIdentity } from "./engine.js";

export const IdentityBridge = {
  init: initIdentity,
  get: getIdentity,
  set: setIdentity
};

export default IdentityBridge;

