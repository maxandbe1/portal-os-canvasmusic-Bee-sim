
import React, { useEffect, useState } from "react";

export default function BeesimView() {
  const mod = window.Portal.modules.beesim;
  const [snapshot, setSnapshot] = useState({ ...mod.state });

  useEffect(() => {
    let frame;
    function loop() {
      const next = mod.step();
      mod.state = next;
      setSnapshot({ ...next });
      frame = requestAnimationFrame(loop);
    }
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [mod]);

  return (
    <div className="module-view" style={{ paddingTop: "0px" }}>
      <h2 style={{ marginTop: "0px" }}>🐝 BEE‑SIM Portal</h2>

      <div className="beesim-stats">
        <p>Colonies: {snapshot.colonies}</p>
        <p>Bees: {snapshot.bees}</p>
        <p>Nectar: {snapshot.nectar}</p>
        <p>Tick: {snapshot.tick}</p>
      </div>
    </div>
  );
}
