// src/views/CanvasMusicView.tsx
import { useEffect, useRef, useState } from "react";
import { createAudioClient } from "../lib/audio/createAudioClient";
import { createVisualizer } from "../lib/canvas/createVisualizer";

type Props = {
  proxyUrl: string; // e.g. /audio?url=...
};

export function CanvasMusicView({ proxyUrl }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const audioClient = createAudioClient(proxyUrl);

    let visualizer: ReturnType<typeof createVisualizer> | null = null;
    let stopped = false;

    async function init() {
      await audioClient.start();
      const analyser = audioClient.getAnalyser();
      if (!analyser) return;
      if (stopped) return;

      visualizer = createVisualizer(canvas, analyser);
      visualizer.start();
      setReady(true);
    }

    init();

    return () => {
      stopped = true;
      visualizer?.stop();
      audioClient.stop();
    };
  }, [proxyUrl]);

  return (
    <div className="canvas-music-view">
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{ width: "100%", height: "auto", background: "black" }}
      />
      {!ready && <div className="status">Initializing audio…</div>}
    </div>
  );
}
