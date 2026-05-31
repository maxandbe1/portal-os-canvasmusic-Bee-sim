import * as Engine from "./engine.js";

export function loadConsoleModule() {
  const state = Engine.load();

  window.Portal.modules.console = {
    id: Engine.id,
    name: Engine.name,
    state,
    log: Engine.log,
    reset: Engine.reset
  };

  return state;
}
