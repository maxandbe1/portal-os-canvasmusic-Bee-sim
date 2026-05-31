import { loadIdentityModule } from "../modules/identity/bridge.js";
import { loadMemoryModule } from "../modules/memory/bridge.js";
import { loadConsoleModule } from "../modules/console/bridge.js";
import { loadDashboardModule } from "../modules/dashboard/bridge.js";
import { loadSoundModule } from "../modules/sound/bridge.js";
import { loadCanvasMusicModule } from "../modules/canvas-music/bridge.js";
import { loadBeesimModule } from "../modules/beesim/bridge.js";

if (!window.Portal) window.Portal = {};
if (!window.Portal.modules) window.Portal.modules = {};

export function bootstrapPortal() {
  console.log("%cPortal‑OS MVV Booting…", "color:#27F3FF;font-weight:bold;");

  loadIdentityModule();
  loadMemoryModule();
  loadConsoleModule();
  loadDashboardModule();
  loadSoundModule();
  loadCanvasMusicModule();
  loadBeesimModule();

  console.log("%cPortal‑OS MVV Ready", "color:#00ff88;font-weight:bold;");
}
