export const id = "beesim";
export const name = "BEE‑SIM Portal";

let state = {
  colonies: 1,
  bees: 128,
  nectar: 0,
  tick: 0
};

export function load() {
  return state;
}

export function step() {
  state = {
    ...state,
    tick: state.tick + 1,
    bees: state.bees + Math.floor(Math.sin(state.tick / 5) * 4),
    nectar: state.nectar + 3
  };
  return state;
}

export function reset() {
  state = {
    colonies: 1,
    bees: 128,
    nectar: 0,
    tick: 0
  };
  return state;
}
