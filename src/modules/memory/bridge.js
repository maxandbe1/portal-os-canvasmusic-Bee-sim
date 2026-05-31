import * as Engine from "./engine.js";

export function loadMemoryModule() {
  const state = Engine.load();

  window.Portal.modules.memory = {
    id: Engine.id,
    name: Engine.name,
    state,
    addNote: Engine.addNote,
    reset: Engine.reset
  };

  return state;
}
