import * as Engine from "./engine.js";

export function loadBeesimModule() {
  const state = Engine.load();

  window.Portal.modules.beesim = {
    id: Engine.id,
    name: Engine.name,
    state,
    step: Engine.step,
    reset: Engine.reset
  };

  return state;
}
