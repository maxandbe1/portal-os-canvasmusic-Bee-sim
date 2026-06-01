
  if (result instanceof Promise) {
    return await result;
  }
  return result;
}
export function getCanvasMusicDebugState() {
  return {
    engine: {
      running: true,
      frame: window.__canvasMusicFrame ?? 0,
      lastFPS: window.__canvasMusicFPS ?? null
    },
    identity: window.__canvasIdentity ?? null,
    meaning: window.__canvasMeaning ?? null,
    pattern: window.__canvasPattern ?? null,
    audio: {
      hasContext: !!window.__canvasAudioContext,
      hasAnalyser: !!window.__canvasAnalyser,
      volume: window.__canvasVolume ?? null
    }
  };
}



