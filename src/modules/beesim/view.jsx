import React, { useEffect, useRef, useState } from "react";

export default function BeesimView() {
  const mod = window.Portal.modules.beesim;
  const canvasRef = useRef(null);
  const [snapshot, setSnapshot] = useState({ ...mod.state });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const bees = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2
    }));

    function loop() {
      const next = mod.step();
      mod.state = next;
      setSnapshot({ ...next });

      ctx.fillStyle = "#05070A";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Hive pulse
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const pulse = 20 + Math.sin(next.tick / 10) * 6;

      ctx.strokeStyle = "#27F3FF";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
      ctx.stroke();

      // Bees
      bees.forEach((b) => {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < 0 || b.x > canvas.width) b.vx *= -1;
        if (b.y < 0 || b.y > canvas.height) b.vy *= -1;

        ctx.fillStyle = "#27F3FF";
        ctx.fillRect(b.x, b.y, 2, 2);
      });

      requestAnimationFrame(loop);
    }

    requestAnimationFrame(loop);
  }, []);

  return (
    <div className="module-view" style={{ paddingTop: "0px" }}>
      <h2 style={{ marginTop: "0px" }}>🐝 BEE‑SIM Portal</h2>

      <canvas
        ref={canvasRef}
        width={800}
        height={480}
        className="canvas-surface"
      />

      <div className="beesim-stats">
        <p>Colonies: {snapshot.colonies}</p>
        <p>Bees: {snapshot.bees}</p>
        <p>Nectar: {snapshot.nectar}</p>
        <p>Tick: {snapshot.tick}</p>
      </div>
    </div>
  );
}

