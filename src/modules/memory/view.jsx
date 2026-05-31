import React, { useState } from "react";

export default function MemoryView() {
  const mod = window.Portal.modules.memory;
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (!value.trim()) return;
    const next = mod.addNote(value.trim());
    mod.state = next;
    setValue("");
  };

  return (
    <div className="module-view">
      <h2>Memory</h2>
      <div className="memory-input-row">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Store a note in OS memory…"
        />
        <button onClick={handleAdd}>Store</button>
      </div>
      <ul className="memory-list">
        {mod.state.notes.map((n) => (
          <li key={n.id}>{n.text}</li>
        ))}
      </ul>
    </div>
  );
}
