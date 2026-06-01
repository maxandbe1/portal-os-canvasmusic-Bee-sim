// src/modules/canvas-music/engine.js

// Basic engine state
let engineRunning = false;
let frameCount = 0;
let lastFPS = null;

let lastFrameTime = performance.now();

// Identity / meaning / pattern state placeholders
let identityState = null;
let meaningState = null;
let patternState = null;

// Audio state placeholders
let audioContext = null;
let analyser = null;
let currentVolume = null;

// ---- PUBLIC API ----

// Call this from your view to start the engine
export function startCanvasMusicEngine({ canvas, audio }) {
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  engineRunning = true;
  frameCount = 0;
  lastFPS = null;
  lastFrameTime = performance.now();

  // If you have a real audio pipeline, wire it here
  if (audio && audio.context && audio.analyser) {
    audioContext = audio.context;
    analyser = audio.analyser;
  }

  function loop(now) {
    if (!engineRunning) return;

    const dt = now - lastFrameTime;
    lastFrameTime = now;

    // FPS estimate
    const fps = dt > 0 ? 1000 / dt : 0;
    lastFPS = fps;

    frameCount++;

    // Example: update identity / meaning / pattern here
    // identityState = ...
    // meaningState = ...
    // patternState = ...
    // currentVolume = ...

    // Simple visual: pulsing circle
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = "#05070A";
    ctx.fillRect(0, 0, w, h);

    const t = frameCount * 0.05;
    const cx = w / 2;
    const cy = h / 2;
    const r = 40 + Math.sin(t) * 20;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(120, 200, 255, 0.8)";
    ctx.fill();

    // ---- STEP 2: instrument globals for Console introspection ----
    window.__canvasMusicFrame = frameCount;
    window.__canvasMusicFPS = Number.isFinite(fps) ? Number(fps.toFixed(1)) : null;
    window.__canvasIdentity = identityState;
    window.__canvasMeaning = meaningState;
    window.__canvasPattern = patternState;
    window.__canvasAudioContext = audioContext;
    window.__canvasAnalyser = analyser;
    window.__canvasVolume = currentVolume;

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

export function stopCanvasMusicEngine() {
  engineRunning = false;
}

// ---- STEP 1: debug state export for Console ----

export function getCanvasMusicDebugState() {
  return {
    engine: {
      running: engineRunning,
      frame: frameCount,
      lastFPS
    },
    identity: identityState,
    meaning: meaningState,
    pattern: patternState,
    audio: {
      hasContext: !!audioContext,
      hasAnalyser: !!analyser,
      volume: currentVolume
    }
  };
}

// Optional helpers to let other modules update identity/meaning/pattern

export function setCanvasIdentityState(next) {
  identityState = next;
  window.__canvasIdentity = next;
}

export function setCanvasMeaningState(next) {
  meaningState = next;
  window.__canvasMeaning = next;
}

export function setCanvasPatternState(next) {
  patternState = next;
  window.__canvasPattern = next;
}

export function setCanvasAudioState({ context, analyser: nextAnalyser, volume }) {
  audioContext = context ?? audioContext;
  analyser = nextAnalyser ?? analyser;
  currentVolume = volume ?? currentVolume;

  window.__canvasAudioContext = audioContext;
  window.__canvasAnalyser = analyser;
  window.__canvasVolume = currentVolume;
}

