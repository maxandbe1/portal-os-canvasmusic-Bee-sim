import React from "react";

const apps = [
  { id: "beesim", label: "BEE‑SIM", icon: "🐝" },
  { id: "canvas-music", label: "Canvas", icon: "🎵" },
  { id: "console", label: "Console", icon: "⌨️" },
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "memory", label: "Memory", icon: "🧠" },
  { id: "sound", label: "Sound", icon: "🔊" }
];

export default function Dock({ onLaunch, openWindows }) {
  return (
    <div className="dock">
      {apps.map((app) => {
        const isOpen = openWindows.some((w) => w.appId === app.id);

        return (
          <button
            key={app.id}
            className={`dock-icon ${isOpen ? "open" : ""}`}
            onClick={() => onLaunch(app.id)}
          >
            <span className="dock-emoji">{app.icon}</span>
            {isOpen && <div className="dock-indicator" />}
          </button>
        );
      })}
    </div>
  );
}
