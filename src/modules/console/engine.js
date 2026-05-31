export const id = "console";
export const name = "Console";

let state = {
  lines: ["Portal‑OS Console ready."]
};

export function load() {
  return state;
}

export function log(line) {
  state = { ...state, lines: [...state.lines, line] };
  return state;
}

export function reset() {
  state = { lines: ["Console reset."] };
  return state;
}
