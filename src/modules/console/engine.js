export const commands = {
  help() {
    return [
      "Available commands:",
      "help - show this message",
      "modules - list loaded modules",
      "clear - clear console",
      "state <module> - show module state"
    ].join("\n");
  },

  modules() {
    return ["dashboard", "console", "canvas-music", "beesim", "memory", "sound"].join("\n");
  },

  clear() {
    return "__CLEAR__";
  },

  state(moduleName) {
    if (!moduleName) return "Usage: state <module>";

    return `State for ${moduleName}: (placeholder)\nYou can wire real module state here.`;
  }
};

export function runCommand(input) {
  const parts = input.trim().split(" ");
  const cmd = parts[0];
  const args = parts.slice(1);

  if (!commands[cmd]) {
    return `Unknown command: ${cmd}`;
  }

  return commands[cmd](...args);
}

