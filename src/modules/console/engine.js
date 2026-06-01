// src/modules/console/engine.js

export const commands = {};

let history = [];

export function registerCommand(name, fn) {
  commands[name] = fn;
}

export function runCommand(input) {
  const line = String(input || "").trim();
  if (!line) return null;

  const [name, ...args] = line.split(" ");
  const cmd = commands[name];

  let result;
  if (!cmd) {
    result = `Unknown command: ${name}`;
  } else {
    try {
      result = cmd(args);
    } catch (e) {
      result = `Error: ${e?.message || e}`;
    }
  }

  history.push({ input: line, output: result });
  if (history.length > 200) history.shift();

  if (typeof window !== "undefined" && window.__consolePush) {
    window.__consolePush({ input: line, output: result });
  }

  return result;
}

// basic built‑ins
registerCommand("help", () => {
  return `Commands: ${Object.keys(commands).sort().join(", ")}`;
});

registerCommand("clear", () => {
  history = [];
  if (typeof window !== "undefined" && window.__consoleClear) {
    window.__consoleClear();
  }
  return "Console cleared.";
});

registerCommand("echo", (args) => args.join(" "));

