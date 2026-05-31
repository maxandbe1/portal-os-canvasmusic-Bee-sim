export const id = "sound";
export const name = "Sound";

let state = {
  enabled: true
};

export function load() {
  return state;
}

export function toggle() {
  state = { ...state, enabled: !state.enabled };
  return state;
}

export function reset() {
  state = { enabled: true };
  return state;
}
