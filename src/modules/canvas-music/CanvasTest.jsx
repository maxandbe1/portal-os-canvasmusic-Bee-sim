import React, { useEffect, useRef } from "react";

export default function CanvasTest() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Resize to device pixel ratio
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
      );
    };

    resize();
    window.addEventListener("resize", resize);

    // Simple animation loop
    let t = 0;
    function draw() {
      const w = canvas.width;
      const h = canvas.height;

      // Background
      ctx.fillStyle = "#05070A";
      ctx.fillRect(0, 0, w, h);

      // Pulsing circle
      const cx = w / 2;
      const cy = h / 2;
      const r = 40 + Math.sin(t * 0.05) * 20;

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(120, 200, 255, 0.8)";
      ctx.fill();

      t++;
      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "360px",
        background: "#05070A",
        borderRadius: "16px",
        overflow: "hidden"
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
