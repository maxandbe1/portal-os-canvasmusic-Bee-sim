export const id = "canvas-music";
export const name = "Canvas Music";

let state = {
  playing: true,
  bpm: 120,
  seed: crypto.randomUUID()
};

export function load() {
  return state;
}

export function update(next) {
  state = { ...state, ...next };
  return state;
}

export function reset() {
  state = {
    playing: true,
    bpm: 120,
    seed: crypto.randomUUID()
  };
  return state;
}
