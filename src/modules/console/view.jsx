import { runCommand } from "./engine.js";

function handleSubmit(e) {
  e.preventDefault();

  const trimmed = input.trim();
  if (!trimmed) return;

  const result = runCommand(trimmed);

  if (result === "__CLEAR__") {
    setLines([]);
  } else {
    setLines((prev) => [...prev, `> ${trimmed}`, result]);
  }

  setInput("");
}

