import * as Engine from "./engine.js";

export function loadIdentityModule() {
  const state = Engine.load();

  window.Portal.modules.identity = {
    id: Engine.id,
    name: Engine.name,
    state,
    update: Engine.update,
    reset: Engine.reset
  };

  return state;
}
