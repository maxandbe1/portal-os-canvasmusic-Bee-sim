import * as Engine from "./engine.js";

export function loadCanvasMusicModule() {
  const state = Engine.load();

  window.Portal.modules["canvas-music"] = {
    id: Engine.id,
    name: Engine.name,
    state,
    update: Engine.update,
    reset: Engine.reset
  };

  return state;
}
