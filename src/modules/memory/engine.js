export const id = "memory";
export const name = "Memory";

let state = {
  notes: []
};

export function load() {
  return state;
}

export function addNote(text) {
  state = { ...state, notes: [...state.notes, { id: crypto.randomUUID(), text }] };
  return state;
}

export function reset() {
  state = { notes: [] };
  return state;
}
