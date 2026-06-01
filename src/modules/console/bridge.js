// src/modules/console/bridge.js
//
// Portal‑OS Console Bridge

import { runCommand, commands } from "./engine.js";

export const ConsoleBridge = {
  exec(commandString) {
    return runCommand(commandString);
  },

  listCommands() {
    return Object.keys(commands);
  },

  push(message) {
    if (typeof window !== "undefined" && window.__consolePush) {
      window.__consolePush({ input: null, output: message });
    }
  },

  clear() {
    return runCommand("clear");
  }
};

export default ConsoleBridge;

