
import React, { useState, useEffect } from "react";
import NavRail from "./NavRail.jsx";
import TopBar from "./TopBar.jsx";
import Dock from "./Dock.jsx";
import WindowLayer from "../windowing/WindowLayer.jsx";
import { createWindowManager } from "../windowing/WindowManager.js";
import Viewport from "./Viewport.jsx";

const manager = createWindowManager();

export default function Shell() {
  const [active, setActive] = useState("beesim");
  const [windows, setWindows] = useState([]);

  useEffect(() => {
    return manager.subscribe(setWindows);
  }, []);

  function openApp(appId) {
    const titles = {
      dashboard: "Dashboard",
      console: "Console",
      "canvas-music": "Canvas Music",
      beesim: "BEE‑SIM",
      memory: "Memory",
      sound: "Sound"
    };
    manager.openWindow(appId, titles[appId]);
  }

  return (
    <div className="portal-shell">
      <NavRail active={active} onSelect={(id) => { setActive(id); openApp(id); }} />

      <div className="portal-main">
        <TopBar />

        <Viewport active={active} />

        <WindowLayer
          manager={manager}
          renderApp={(id) => <Viewport active={id} />}
        />

        <Dock onLaunch={openApp} openWindows={windows} />
      </div>
    </div>
  );
}
