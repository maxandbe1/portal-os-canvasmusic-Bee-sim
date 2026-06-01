
// src/modules/console/bridge.js
//
// Portal‑OS Console Bridge
// This file exposes a stable contract for interacting with the Console engine.
// Other modules should import from this bridge instead of importing engine internals directly.

import { runCommand, commands } from "./engine.js";

export const ConsoleBridge = {
  // Execute a console command programmatically
  exec(commandString) {
    return runCommand(commandString);
  },

  // List available commands
  listCommands() {
    return Object.keys(commands);
  },

  // Push a message into the console output (used by watchers, engines, etc.)
  push(message) {
    if (typeof window !== "undefined" && window.__consolePush) {
      window.__consolePush(message);
    }
  },

  // Clear the console programmatically
  clear() {
    return runCommand("clear");
  }
};

export default ConsoleBridge;
