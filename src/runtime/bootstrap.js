// src/runtime/bootstrap.js
// Safe, minimal Portal‑OS bootstrap for this repo

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
  try {
    console.log("%cPortal‑OS Booting…", "color:#27F3FF;font-weight:bold;");

    IdentityBridge.init?.();
    MemoryBridge.init?.();
    DashboardBridge.init?.();
    SoundBridge.init?.();
    BeesimBridge.init?.();

    ConsoleBridge.push?.("Portal‑OS Console Loaded");
    CanvasMusicBridge.debug?.();

    console.log("%cPortal‑OS Ready", "color:#00ff88;font-weight:bold;");
  } catch (err) {
    console.error("Portal‑OS bootstrap error:", err);
    try {
      ConsoleBridge.push?.("Bootstrap Error: " + err.message);
    } catch (_) {}
  }
}

