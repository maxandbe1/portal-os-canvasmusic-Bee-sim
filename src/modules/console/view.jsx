import React, { useState } from "react";

export default function ConsoleView() {
  const mod = window.Portal.modules.console;
  const [cmd, setCmd] = useState("");

  const handleRun = () => {
    if (!cmd.trim()) return;
    const next = mod.log(`> ${cmd}`);
    mod.state = next;
    setCmd("");
  };

  return (
    <div className="module-view console-view">
      <h2>Console</h2>
      <div className="console-output">
        {mod.state.lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      <div className="console-input-row">
        <input
          value={cmd}
          onChange={(e) => setCmd(e.target.value)}
          placeholder="Type a command…"
        />
        <button onClick={handleRun}>Run</button>
      </div>
    </div>
  );
}
