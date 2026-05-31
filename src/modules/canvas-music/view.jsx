import React, { useEffect, useRef, useState } from "react";
import { analyzeIdentity } from "./identity.js";
import { interpret } from "./meaning.js";
import { Monetization } from "../../system/MonetizationManager.js";
import { SessionStore } from "../../system/SessionStore.js";
import PatternReport from "./PatternReport.jsx";
import SongIdentityProfile from "./SongIdentityProfile.jsx";
import SessionSummary from "./SessionSummary.jsx";

export default function CanvasMusicView() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const [identityState, setIdentityState] = useState(
    analyzeIdentity(null, null)
  );
  const [meaningState, setMeaningState] = useState(interpret(identityState));
  const [showSummaryUpsell, setShowSummaryUpsell] = useState(false);
  const [songCount, setSongCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const audio = audioRef.current;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioCtx();
    const source = audioCtx.createMediaElementSource(audio);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 1024;

    const freqData = new Uint8Array(analyser.frequencyBinCount);
    const waveData = new Uint8Array(analyser.fftSize);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    let identity = identityState;

    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1
    }));

    function render() {
      const w = canvas.width;
      const h = canvas.height;

      ctx.fillStyle = "#05070A";
      ctx.fillRect(0, 0, w, h);

      analyser.getByteFrequencyData(freqData);
      analyser.getByteTimeDomainData(waveData);

      identity = analyzeIdentity(freqData, waveData);
      const meaning = interpret(identity);

      const cx = w / 2;
      const cy = h / 2;

      const avg =
        freqData.reduce((a, b) => a + b, 0) / (freqData.length || 1);
      const bass =
        freqData.slice(0, 40).reduce((a, b) => a + b, 0) / 40 || 0;
      const mid =
        freqData.slice(40, 200).reduce((a, b) => a + b, 0) / 160 || 0;
      const high =
        freqData.slice(200).reduce((a, b) => a + b, 0) /
          (freqData.length - 200 || 1) || 0;

      const pulse = 60 + avg * 0.4;
      ctx.strokeStyle = "#27F3FF";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, pulse, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "#27F3FF33";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < freqData.length; i += 4) {
        const angle = (i / freqData.length) * Math.PI * 2;
        const radius = pulse + freqData[i] * 0.5;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.strokeStyle = "#27F3FF88";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i < waveData.length; i++) {
        const x = (i / waveData.length) * w;
        const y = cy + (waveData[i] - 128) * 0.8;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      particles.forEach((p) => {
        p.x += p.vx + (bass - 128) * 0.0004;
        p.y += p.vy + (mid - 128) * 0.0004;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.fillStyle = `rgba(39,243,255,${0.2 + high * 0.002})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      window.__canvasMusicIdentity = identity;
      window.__canvasMusicMeaning = meaning;

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    const idInterval = setInterval(() => {
      setIdentityState({ ...(window.__canvasMusicIdentity || identity) });
      setMeaningState({
        ...(window.__canvasMusicMeaning || interpret(identity))
      });
    }, 1500);

    audio.onended = () => {
      setShowSummaryUpsell(true);
      setSongCount((c) => c + 1);

      SessionStore.addSession({
        identity: window.__canvasMusicIdentity,
        meaning: window.__canvasMusicMeaning,
        song: audioRef.current.src,
        timestamp: Date.now()
      });
    };

    return () => {
      clearInterval(idInterval);
      audio.onended = null;
      audioCtx.close();
    };
  }, []);

  useEffect(() => {
    if (songCount === 3 && !Monetization.isUnlocked("pattern-report")) {
      alert("Unlock your Identity Pattern Report");
    }
  }, [songCount]);

  return (
    <div className="module-view canvas-music" style={{ position: "relative" }}>
      {!Monetization.isUnlocked("song-profile") && (
        <button
          className="premium-button"
          onClick={() => Monetization.unlock("song-profile")}
          style={{ position: "absolute", top: 12, right: 12, width: "auto" }}
        >
          Unlock Song Identity Profile
        </button>
      )}

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const url = URL.createObjectURL(file);
            audioRef.current.src = url;
            audioRef.current.play();
          }
        }}
        style={{ marginBottom: "8px" }}
      />

      <input
        type="text"
        placeholder="Paste audio URL and press Enter"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            audioRef.current.src = e.target.value;
            audioRef.current.play();
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

      <div className="audio-controls">
        <audio ref={audioRef} controls style={{ width: "100%" }} />
      </div>

      <div className="identity-panel">
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

      {!Monetization.isUnlocked("deep-identity") && (
        <button
          className="premium-button"
          onClick={() => Monetization.unlock("deep-identity")}
        >
          Unlock Deep Identity Report
        </button>
      )}

      <div className="interpretation-panel">
        <h3>What This Song Says About You</h3>
        <p>
          <strong>ME:</strong> {meaningState.me}
        </p>
        <p>
          <strong>US:</strong> {meaningState.us}
        </p>
        <p>
          <strong>WE:</strong> {meaningState.we}
        </p>
      </div>

      {!Monetization.isUnlocked("relationship-pack") && (
        <button
          className="premium-button"
          onClick={() => Monetization.unlock("relationship-pack")}
        >
          Unlock Relationship Insight Pack
        </button>
      )}

      <canvas
        ref={canvasRef}
        width={800}
        height={420}
        className="canvas-surface"
        style={{ marginTop: "12px" }}
      />

      {!Monetization.isUnlocked("export") && (
        <button
          className="premium-button"
          onClick={() => Monetization.unlock("export")}
        >
          Export High‑Res Canvas
        </button>
      )}

      {songCount >= 3 && !Monetization.isUnlocked("pattern-report") && (
        <button
          className="premium-button"
          onClick={() => Monetization.unlock("pattern-report")}
        >
          Unlock Identity Pattern Report
        </button>
      )}

      {Monetization.isUnlocked("pattern-report") && <PatternReport />}

      {Monetization.isUnlocked("song-profile") && <SongIdentityProfile />}

      {Monetization.isUnlocked("session-summary") && <SessionSummary />}

      {showSummaryUpsell &&
        !Monetization.isUnlocked("session-summary") && (
          <div className="modal">
            <div className="modal-content">
              <h3>Get Your Full Session Summary</h3>
              <p>
                This song revealed a lot about your identity, motion, and
                emotional field.
              </p>
              <button
                className="premium-button"
                onClick={() => Monetization.unlock("session-summary")}
              >
                Unlock Session Summary
              </button>
              <button
                className="close-button"
                onClick={() => setShowSummaryUpsell(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
    </div>
  );
}

