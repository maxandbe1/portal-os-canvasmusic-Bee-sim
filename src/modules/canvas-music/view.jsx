import React, { useEffect, useRef, useState, useCallback } from "react";
import { analyzeIdentity } from "./identity.js";
import { interpret } from "./meaning.js";
import { Monetization } from "../../system/MonetizationManager.js";
import { SessionStore } from "../../system/SessionStore.js";
import PatternReport from "./PatternReport.jsx";
import SongIdentityProfile from "./SongIdentityProfile.jsx";
import SessionSummary from "./SessionSummary.jsx";

export default function CanvasMusicView() {
  // Canvas + audio elements
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  // Audio proxy base (Cloudflare Worker)
  const AUDIO_PROXY_BASE = "https://audio-proxy.maxandbe1.workers.dev";

  // Identity + meaning state
  const [identityState, setIdentityState] = useState(
    analyzeIdentity(null, null)
  );
  const [meaningState, setMeaningState] = useState(interpret(identityState));

  // Session / monetization related state
  const [showSummaryUpsell, setShowSummaryUpsell] = useState(false);
  const [songCount, setSongCount] = useState(0);

  // Web Audio graph
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);

  // Reconnect audio pipeline when source changes (file or URL)
  const reconnectAudioPipeline = useCallback(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    // Lazily create AudioContext + analyser if not present
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    const audioCtx = audioCtxRef.current;

    if (!analyserRef.current) {
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 1024;
      analyserRef.current = analyser;
    }
    const analyser = analyserRef.current;

    // Disconnect previous source if any
    if (sourceRef.current) {
      try {
        sourceRef.current.disconnect();
      } catch (e) {
        // ignore
      }
      sourceRef.current = null;
    }

    // Create new MediaElementSource and connect graph
    const source = audioCtx.createMediaElementSource(audioEl);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    sourceRef.current = source;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const audioEl = audioRef.current;
    if (!canvas || !audioEl) return;

    const ctx = canvas.getContext("2d");

    // Ensure canvas has a reasonable size
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Ensure audio graph exists
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioCtx();
    audioCtxRef.current = audioCtx;

    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;
    analyserRef.current = analyser;

    // Initial connection (will be reconnected on file/URL change)
    const source = audioCtx.createMediaElementSource(audioEl);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    sourceRef.current = source;

    const freqData = new Uint8Array(analyser.frequencyBinCount);
    const waveData = new Uint8Array(analyser.fftSize);

    // Particle field for hybrid mode
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

      // Background gradient
      const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h));
      bgGrad.addColorStop(0, "#05070A");
      bgGrad.addColorStop(1, "#020308");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Pull audio data
      analyser.getByteFrequencyData(freqData);
      analyser.getByteTimeDomainData(waveData);

      // Compute bands
      const avg =
        freqData.reduce((a, b) => a + b, 0) / Math.max(freqData.length, 1);
      const bass =
        freqData.slice(0, 40).reduce((a, b) => a + b, 0) / 40 || 0;
      const mid =
        freqData.slice(40, 200).reduce((a, b) => a + b, 0) / 160 || 0;
      const high =
        freqData.slice(200).reduce((a, b) => a + b, 0) /
          Math.max(freqData.length - 200, 1) || 0;

      // Update identity/meaning at a throttled rate
      if (!isNaN(avg) && ts - lastIdentityUpdate > 120) {
        const identity = analyzeIdentity(freqData, waveData);
        const meaning = interpret(identity);
        setIdentityState(identity);
        setMeaningState(meaning);
        lastIdentityUpdate = ts;
      }

      // Hybrid halo: smooth base radius + bass pulses + high shimmer
      const baseRadius = Math.min(w, h) * 0.18;
      const bassPulse = (bass / 255) * baseRadius * 0.7;
      const highShimmer = (high / 255) * baseRadius * 0.25;
      const haloRadius = baseRadius + bassPulse + highShimmer;

      const haloGrad = ctx.createRadialGradient(cx, cy, baseRadius * 0.4, cx, cy, haloRadius);
      haloGrad.addColorStop(0, "rgba(120, 200, 255, 0.35)");
      haloGrad.addColorStop(0.6, "rgba(90, 140, 255, 0.18)");
      haloGrad.addColorStop(1, "rgba(10, 20, 40, 0.0)");

      ctx.beginPath();
      ctx.fillStyle = haloGrad;
      ctx.arc(cx, cy, haloRadius, 0, Math.PI * 2);
      ctx.fill();

      // Waveform ring (hybrid: smooth but responsive)
      const ringRadius = haloRadius * 0.75;
      const ringThickness = 10 + (mid / 255) * 18;
      ctx.lineWidth = ringThickness;
      ctx.strokeStyle = "rgba(160, 210, 255, 0.85)";
      ctx.beginPath();
      for (let i = 0; i < waveData.length; i++) {
        const t = i / waveData.length;
        const angle = t * Math.PI * 2;
        const v = (waveData[i] - 128) / 128; // -1..1
        const radialOffset = v * 18 + (avg / 255) * 10;
        const r = ringRadius + radialOffset;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      // Particles: hybrid behavior (bass = velocity, high = shimmer)
      const bassFactor = 0.4 + (bass / 255) * 1.2;
      const highFactor = high / 255;

      particles.forEach((p) => {
        p.vx += (Math.random() - 0.5) * 0.02 * bassFactor;
        p.vy += (Math.random() - 0.5) * 0.02 * bassFactor;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;

        // Slight life shimmer
        p.life += 0.01 + highFactor * 0.03;
        const alpha = 0.25 + 0.35 * Math.sin(p.life * Math.PI * 2);

        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const distNorm = Math.min(dist / (Math.max(w, h) * 0.5), 1);

        const size =
          p.size * (1 + (1 - distNorm) * 0.8 + (bass / 255) * 0.6);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${120 + highFactor * 80}, ${
          180 + highFactor * 40
        }, 255, ${alpha})`;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle center core
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
        } catch (e) {
          // ignore
        }
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Handle song completion / session tracking
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
      {/* Canvas container */}
      <div className="canvas-wrapper" style={{ position: "relative", width: "100%", height: "360px", borderRadius: "16px", overflow: "hidden", background: "#05070A" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

        {/* Premium unlock for Song Identity Profile */}
        {!Monetization.isUnlocked("song-profile") && (
          <button
            className="premium-button"
            onClick={() => Monetization.unlock("song-profile")}
            style={{ position: "absolute", top: 12, right: 12, width: "auto" }}
          >
            Unlock Song Identity Profile
          </button>
        )}
      </div>

      {/* Audio source controls */}
      <div style={{ marginTop: "12px" }}>
        {/* Local file input */}
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

        {/* URL input with audio proxy */}
        <input
          type="text"
          placeholder="Paste audio URL and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const rawUrl = e.target.value.trim();
              if (!rawUrl) return;

              const proxied = `${AUDIO_PROXY_BASE}/?url=${encodeURIComponent(
                rawUrl
              )}`;

              audioRef.current.src = proxied;
              reconnectAudioPipeline();
              audioRef.current.play();
              handleSongPlayed();
            }
          }}
          style={{
            width: "100%",
            padding: "6px 8px",
            marginBottom: "8px",
            background: "#05070a",
            border: "1px solid #1b2233",
            borderRadius: "6px",
            color: "#fff"
          }}
        />

        {/* Audio element */}
        <div className="audio-controls">
          <audio
            ref={audioRef}
            controls
            style={{ width: "100%" }}
            onEnded={handleSongPlayed}
          />
        </div>
      </div>

      {/* Identity + meaning panels */}
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

      {/* Song Identity Profile (premium) */}
      {Monetization.isUnlocked("song-profile") && (
        <SongIdentityProfile identity={identityState} />
      )}

      {/* Pattern report */}
      <PatternReport identity={identityState} meaning={meaningState} />

      {/* Deep identity upsell */}
      {!Monetization.isUnlocked("deep-identity") && (
        <button
          className="premium-button"
          onClick={() => Monetization.unlock("deep-identity")}
          style={{ marginTop: "12px" }}
        >
          Unlock Deep Identity Report
        </button>
      )}

      {/* Meaning / interpretation */}
      <div className="interpretation-panel" style={{ marginTop: "16px" }}>
        <h3>What This Song Says About You</h3>
        <p>
          <strong>ME:</strong> {meaningState.me}
        </p>
        <p>
          <strong>US:</strong> {meaningState.us}
        </p>
      </div>

      {/* Session summary / upsell */}
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

