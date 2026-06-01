// src/modules/console/engine.js

// Example: hook in real module state here later
function getModuleState(name) {
  // TODO: wire to actual stores (SessionStore, Monetization, etc.)
  return {
    name,
    status: "ok",
    note: "placeholder state — connect to real module store"
  };
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const commands = {
  help() {
    return [
      "Available commands:",
      "help                - show this message",
      "modules             - list loaded modules",
      "clear               - clear console",
      "state <module>      - show module state",
      "ping                - quick sync test",
      "sleep <ms>          - async wait, then respond",
      "echo <text...>      - echo back text"
    ].join("\n");
  },

  modules() {
    return [
      "dashboard",
      "console",
      "canvas-music",
      "beesim",
      "memory",
      "sound"
    ].join("\n");
  },

  clear() {
    return "__CLEAR__";
  },

  state(moduleName) {
    if (!moduleName) return "Usage: state <module>";

    const state = getModuleState(moduleName);
    return JSON.stringify(state, null, 2);
  },

  ping() {
    return "pong";
  },

  echo(...parts) {
    if (!parts.length) return "";
    return parts.join(" ");
  },

  async sleep(ms) {
    const n = Number(ms);
    if (Number.isNaN(n) || n < 0) return "Usage: sleep <ms>";
    await delay(n);
    return `Slept for ${n}ms`;
  }
};

export async function runCommand(input) {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0];
  const args = parts.slice(1);

  const handler = commands[cmd];
  if (!handler) {
    return `Unknown command: ${cmd}`;
  }

  const result = handler(...args);
  if (result instanceof Promise) {
    return await result;
  }
  return result;
}



