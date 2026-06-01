import { loadIdentityModule } from "../modules/identity/bridge.js";
import { loadMemoryModule } from "../modules/memory/bridge.js";
import { loadConsoleModule } from "../modules/console/bridge.js";
import { loadDashboardModule } from "../modules/dashboard/bridge.js";
import { loadSoundModule } from "../modules/sound/bridge.js";
import { loadCanvasMusicModule } from "../modules/canvas-music/bridge.js";
import { loadBeesimModule } from "../modules/beesim/bridge.js";

if (!window.Portal) window.Portal = {};
if (!window.Portal.modules) window.Portal.modules = {};

// src/runtime/bootstrap.js
//
// Modern MVV Bootstrap for Portal‑OS
// Loads all module bridges using object-based APIs.

import ConsoleBridge from "../modules/console/bridge.js";
import IdentityBridge from "../modules/identity/bridge.js";
import MemoryBridge from "../modules/memory/bridge.js";
import DashboardBridge from "../modules/dashboard/bridge.js";
import SoundBridge from "../modules/sound/bridge.js";
import CanvasMusicBridge from "../modules/canvas-music/bridge.js";
import BeesimBridge from "../modules/beesim/bridge.js";

if (!window.Portal) window.Portal = {};
if (!window.Portal.modules) window.Portal.modules = {};

export function bootstrapPortal() {
  console.log("%cPortal‑OS MVV Booting…", "color:#27F3FF;font-weight:bold;");

  // Initialize modules if they expose an init() method
  IdentityBridge.init?.();
  MemoryBridge.init?.();
  DashboardBridge.init?.();
  SoundBridge.init?.();
  BeesimBridge.init?.();

  // Console module: push a startup message
  ConsoleBridge.push("Console Module Loaded");

  // Canvas‑Music: expose debug state to Console
  CanvasMusicBridge.debug();

  console.log("%cPortal‑OS MVV Ready", "color:#00ff88;font-weight:bold;");
}

