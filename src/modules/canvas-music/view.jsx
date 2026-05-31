
import React, { useEffect, useRef } from "react";

export default function CanvasMusicView() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let audioCtx;
    let analyser;
    let dataArray;

    async function setupAudio() {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);

      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;

      dataArray = new Uint8Array(analyser.frequencyBinCount);
      source.connect(analyser);
    }

    setupAudio();

    function render() {
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "#05070A";
      ctx.fillRect(0, 0, w, h);

      if (analyser) {
        analyser.getByteFrequencyData(dataArray);
        const avg =
          dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        const cx = w / 2;
        const cy = h / 2;

        const radius = 60 + avg * 0.4;

        ctx.strokeStyle = "#27F3FF";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }, []);

  return (
    <div className="module-view canvas-music">
      <h2>Canvas Music</h2>
      <canvas
        ref={canvasRef}
        width={800}
        height={480}
        className="canvas-surface"
      />
    </div>
  );
}
