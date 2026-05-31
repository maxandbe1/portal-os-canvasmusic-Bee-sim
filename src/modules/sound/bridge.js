import * as Engine from "./engine.js";

export function loadSoundModule() {
  const state = Engine.load();

  window.Portal.modules.sound = {
    id: Engine.id,
    name: Engine.name,
    state,
    toggle: Engine.toggle,
    reset: Engine.reset
  };

  return state;
}
