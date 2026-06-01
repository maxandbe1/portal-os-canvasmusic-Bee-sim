import React, { useEffect, useRef, useState } from "react";
import CanvasTest from "./CanvasTest.jsx";



export default function CanvasMusicView() {
  console.log("CanvasMusicView: component mounted");

  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const [boot, setBoot] = useState("initial");

  useEffect(() => {
    console.log("CanvasMusicView: useEffect fired");

    try {
      const canvas = canvasRef.current;
      const audio = audioRef.current;

      console.log("CanvasMusicView: canvasRef =", canvas);
      console.log("CanvasMusicView: audioRef =", audio);

      if (!canvas) {
        console.error("CanvasMusicView: canvasRef is NULL");
        setBoot("canvas-null");
        return;
      }

      if (!audio) {
        console.error("CanvasMusicView: audioRef is NULL");
        setBoot("audio-null");
        return;
      }

      const ctx = canvas.getContext("2d");
      console.log("CanvasMusicView: 2D context =", ctx);

      if (!ctx) {
        console.error("CanvasMusicView: FAILED to get 2D context");
        setBoot("no-context");
        return;
      }

      // Draw something simple
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      ctx.font = "20px sans-serif";
      ctx.fillText("Canvas OK", 20, 40);

      setBoot("ok");
    } catch (err) {
      console.error("CanvasMusicView: CRASHED in useEffect:", err);
      setBoot("crashed");
    }
  }, []);

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>CanvasMusicView Diagnostic</h2>

      <p>Status: <strong>{boot}</strong></p>

      <div
        style={{
          width: "100%",
          height: "300px",
          background: "#111",
          border: "1px solid #333",
          marginTop: "10px"
        }}
      >
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <audio ref={audioRef} controls style={{ marginTop: "20px", width: "100%" }} />
    </div>
  );
}

