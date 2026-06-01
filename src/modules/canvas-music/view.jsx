import React, { useEffect, useRef, useState, useCallback } from "react";
import { analyzeIdentity } from "./identity.js";
import { interpret } from "./meaning.js";
import { Monetization } from "../../system/MonetizationManager.js";
import { SessionStore } from "../../system/SessionStore.js";
import PatternReport from "./PatternReport.jsx";
import SongIdentityProfile from "./SongIdentityProfile.jsx";
import SessionSummary from "./SessionSummary.jsx";

export default function CanvasMusicView() {
  // Canvas + audio refs
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  // Audio proxy base (Cloudflare Worker)
  const AUDIO_PROXY_BASE = "https://audio-proxy.maxandbe1.workers.dev";

  // URL input state (fixes Enter not firing)
  const [urlInput, setUrlInput] = useState("");

  // Identity + meaning state
  const [identityState, setIdentityState] = useState(
    analyzeIdentity(null, null)
  );
  const [meaningState, setMeaningState] = useState(interpret(identityState));

  // Session + monetization
  const [showSummaryUpsell, setShowSummaryUpsell] = useState(false);
  const [songCount, setSongCount] = useState(0);

  // Audio graph
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);

  // Reconnect audio pipeline when source changes
  const reconnectAudioPipeline = useCallback(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    // Create AudioContext if needed
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    const audioCtx = audioCtxRef.current;

    // Create analyser if needed
    if (!analyserRef.current) {
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      analyserRef.current = analyser;
    }
    const analyser = analyserRef.current;

    // Disconnect old source
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch {}
      sourceRef.current = null;
    }

    // Create new source
    const source = audioCtx.createMediaElementSource(audioEl);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    sourceRef.current = source;
  }, []);

  // Canvas + analyser render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const audioEl = audioRef.current;
    if (!canvas || !audioEl) return;

    const ctx = canvas.getContext("2d");

    // Resize canvas to device pixel ratio
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Create audio context + analyser
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioCtx();
    audioCtxRef.current = audioCtx;

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    analyserRef.current = analyser;

    // Initial audio graph
    const source = audioCtx.createMediaElementSource(audioEl);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    sourceRef.current = source;

    const freqData = new Uint8Array(analyser.frequencyBinCount);
    const waveData = new Uint8Array(analyser.fftSize);

    // Particle field
    const particles = Array.from({ length: 140 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2 + 1,
      life: Math.random()
    }));

    let lastIdentityUpdate = 0;

    function renderFrame(ts) {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      // Background
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
      bgGrad.addColorStop(0, "#05070A");
      bgGrad.addColorStop(1, "#020308");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Pull audio data
      analyser.getByteFrequencyData(freqData);
      analyser.getByteTimeDomainData(waveData);

      // Frequency bands
      const avg = freqData.reduce((a, b) => a + b, 0) / freqData.length;
      const bass = freqData.slice(0, 40).reduce((a, b) => a + b, 0) / 40;
      const mid = freqData.slice(40, 200).reduce((a, b) => a + b, 0) / 160;
      const high =
        freqData.slice(200).reduce((a, b) => a + b, 0) /
        Math.max(freqData.length - 200, 1);

      // Identity update throttle
      if (ts - lastIdentityUpdate > 120) {
        const identity = analyzeIdentity(freqData, waveData);
        const meaning = interpret(identity);
        setIdentityState(identity);
        setMeaningState(meaning);
        lastIdentityUpdate = ts;
      }

      // Hybrid halo
      const baseRadius = Math.min(w, h) * 0.18;
      const haloRadius =
        baseRadius +
        (bass / 255) * baseRadius * 0.7 +
        (high / 255) * baseRadius * 0.25;

      const haloGrad = ctx.createRadialGradient(
        cx,
        cy,
        baseRadius * 0.4,
        cx,
        cy,
        haloRadius
      );
      haloGrad.addColorStop(0, "rgba(120, 200, 255, 0.35)");
      haloGrad.addColorStop(0.6, "rgba(90, 140, 255, 0.18)");
      haloGrad.addColorStop(1, "rgba(10, 20, 40, 0.0)");

      ctx.beginPath();
      ctx.fillStyle = haloGrad;
      ctx.arc(cx, cy, haloRadius, 0, Math.PI * 2);
      ctx.fill();

      // Waveform ring
      const ringRadius = haloRadius * 0.75;
      const ringThickness = 10 + (mid / 255) * 18;
      ctx.lineWidth = ringThickness;
      ctx.strokeStyle = "rgba(160, 210, 255, 0.85)";
      ctx.beginPath();
      for (let i = 0; i < waveData.length; i++) {
        const t = i / waveData.length;
        const angle = t * Math.PI * 2;
        const v = (waveData[i] - 128) / 128;
        const radialOffset = v * 18 + (avg / 255) * 10;
        const r = ringRadius + radialOffset;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Particles
      const bassFactor = 0.4 + (bass / 255) * 1.2;
      const highFactor = high / 255;

      particles.forEach((p) => {
        p.vx += (Math.random() - 0.5) * 0.02 * bassFactor;
        p.vy += (Math.random() - 0.5) * 0.02 * bassFactor;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;

        p.life += 0.01 + highFactor * 0.03;
        const alpha = 0.25 + 0.35 * Math.sin(p.life * Math.PI * 2);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${120 + highFactor * 80}, ${
          180 + highFactor * 40
        }, 255, ${alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Center core
      ctx.beginPath();
      ctx.fillStyle = "rgba(210, 235, 255, 0.9)";
      ctx.arc(cx, cy, 4 + (avg / 255) * 4, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(renderFrame);
    }

    animationRef.current = requestAnimationFrame(renderFrame);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (sourceRef.current) {
        try {
          sourceRef.current.disconnect();
        } catch {}
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, []);

  // Song played handler
  const handleSongPlayed = useCallback(() => {
    const newCount = songCount + 1;
    setSongCount(newCount);
    SessionStore.recordEvent("song-played", {
      identity: identityState,
      meaning: meaningState
    });
    if (newCount >= 3 && !Monetization.isUnlocked("session-summary")) {
      setShowSummaryUpsell(true);
    }
  }, [songCount, identityState, meaningState]);

  return (
    <div className="canvas-music-view">
      {/* Canvas */}
      <div
        className="canvas-wrapper"
        style={{
          position: "relative",
          width: "100%",
          height: "360px",
          borderRadius: "16px",
          overflow: "hidden",
          background: "#05070A"
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />

        {!Monetization.isUnlocked("song-profile") && (
          <button
            className="premium-button"
            onClick={() => Monetization.unlock("song-profile")}
            style={{ position: "absolute", top: 12, right: 12 }}
          >
            Unlock Song Identity Profile
          </button>
        )}
      </div>

      {/* Audio controls */}
      <div style={{ marginTop: "12px" }}>
        {/* Local file */}
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              audioRef.current.src = url;
              reconnectAudioPipeline();
              audioRef.current.play();
              handleSongPlayed();
            }
          }}
          style={{ marginBottom: "8px" }}
        />

        {/* URL input + Play button */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
          <input
            type="text"
            placeholder="Paste audio URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            style={{
              flex: 1,
              padding: "6px 8px",
              background: "#05070a",
              border: "1px solid #1b2233",
              borderRadius: "6px",
              color: "#fff"
            }}
          />
          <button
            onClick={() => {
              const rawUrl = urlInput.trim();
              if (!rawUrl || !audioRef.current) return;

              const proxied = `${AUDIO_PROXY_BASE}/?url=${encodeURIComponent(
                rawUrl
              )}`;

              audioRef.current.src = proxied;
              reconnectAudioPipeline();
              audioRef.current.play();
              handleSongPlayed();
            }}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "1px solid #2b3b55",
              background: "#0b1220",
              color: "#e5f0ff",
              cursor: "pointer",
              whiteSpace: "nowrap"
            }}
          >
            Play URL
          </button>
        </div>

        {/* Audio element */}
        <audio
          ref={audioRef}
          controls
          style={{ width: "100%" }}
          onEnded={handleSongPlayed}
        />
      </div>

      {/* Identity panel */}
      <div className="identity-panel" style={{ marginTop: "16px" }}>
        <h3>Identity Breakdown</h3>
        <p>
          <strong>Identity Signal:</strong> {identityState.identity}
        </p>
        <p>
          <strong>Motion Signature:</strong> {identityState.motion}
        </p>
        <p>
          <strong>Emotional Field:</strong> {identityState.emotional}
        </p>
      </div>

      {Monetization.isUnlocked("song-profile") && (
        <SongIdentityProfile identity={identityState} />
      )}

      <PatternReport identity={identityState} meaning={meaningState} />

      {!Monetization.isUnlocked("deep-identity") && (
        <button
          className="premium-button"
          onClick={() => Monetization.unlock("deep-identity")}
          style={{ marginTop: "12px" }}
        >
          Unlock Deep Identity Report
        </button>
      )}

      <div className="interpretation-panel" style={{ marginTop: "16px" }}>
        <h3>What This Song Says About You</h3>
        <p>
          <strong>ME:</strong> {meaningState.me}
        </p>
        <p>
          <strong>US:</strong> {meaningState.us}
        </p>
      </div>

      {Monetization.isUnlocked("session-summary") ? (
        <SessionSummary session={SessionStore.getSession()} />
      ) : (
        showSummaryUpsell && (
          <button
            className="premium-button"
            onClick={() => Monetization.unlock("session-summary")}
            style={{ marginTop: "12px" }}
          >
            Unlock Session Summary
          </button>
        )
      )}
    </div>
  );
}




