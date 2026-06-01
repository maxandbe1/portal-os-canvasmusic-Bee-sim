// src/lib/canvas/createVisualizer.ts
export type Visualizer = {
  start: () => void;
  stop: () => void;
};

export function createVisualizer(
  canvas: HTMLCanvasElement,
  analyser: AnalyserNode
): Visualizer {
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No 2D context");

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  let frameId: number | null = null;

  function render() {
    frameId = requestAnimationFrame(render);
    analyser.getByteFrequencyData(dataArray);

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    const barWidth = (width / bufferLength) * 2.5;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i];
      const barHeight = (v / 255) * height;
      ctx.fillStyle = "#00f5ff";
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }
  }

  function start() {
    if (frameId == null) render();
  }

  function stop() {
    if (frameId != null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  }

  return { start, stop };
}
