import React from "react";

export default function SoundView() {
  const mod = window.Portal.modules.sound;
  return (
    <div className="module-view">
      <h2>Sound</h2>
      <p>Status: {mod.state.enabled ? "On" : "Off"}</p>
    </div>
  );
}
