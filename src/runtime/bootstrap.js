// src/runtime/bootstrap.js
//
// Portal‑OS MVV Bootstrap (2026)
// Safe, crash‑proof, default‑import compatible.

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
    console.log(
      "%cPortal‑OS MVV Booting…",
      "color:#27F3FF;font-weight:bold;"
    );

    // Initialize all modules safely
    IdentityBridge.init?.();
    MemoryBridge.init?.();
    DashboardBridge.init?.();
    SoundBridge.init?.();
    BeesimBridge.init?.();

    // Console is always safe to push to
    ConsoleBridge.push("Portal‑OS Console Loaded");

    // Canvas‑Music debug state (safe, no DOM needed)
    const dbg = CanvasMusicBridge.debug?.();
    ConsoleBridge.push("Canvas‑Music Ready");

    console.log(
      "%cPortal‑OS MVV Ready",
      "color:#00ff88;font-weight:bold;"
    );
  } catch (err) {
    console.error("Portal‑OS bootstrap error:", err);
    // Prevent blank screen by surfacing error in console UI
    try {
      ConsoleBridge.push("Bootstrap Error: " + err.message);
    } catch (_) {}
  }
}

