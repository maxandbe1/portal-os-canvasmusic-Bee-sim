import React from "react";

const items = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "console", label: "Console", icon: "⌨️" },
  { id: "canvas-music", label: "Canvas", icon: "🎵" },
  { id: "beesim", label: "BEE‑SIM", icon: "🐝" }
  { id: "memory", label: "Memory", icon: "🧠" },
  { id: "sound", label: "Sound", icon: "🔊" },

];

export default function NavRail({ active, onSelect }) {
  return (
    <nav className="nav-rail">
      {items.map((item) => (
        <button
          key={item.id}
          className={item.id === active ? "nav-item active" : "nav-item"}
          onClick={() => onSelect(item.id)}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
