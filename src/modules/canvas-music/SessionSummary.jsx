// src/modules/canvas-music/SessionSummary.jsx

import React from "react";
import { SessionStore } from "../../system/SessionStore.js";

export default function SessionSummary() {
  const sessions = SessionStore.getSessions();
  const last = sessions[sessions.length - 1];

  if (!last) {
    return (
      <div className="session-summary">
        <h2>Session Summary</h2>
        <p>No session data available.</p>
      </div>
    );
  }

  return (
    <div className="session-summary">
      <h2>Session Summary</h2>

      <h3>Identity Signal</h3>
      <p>{last.identity.identity}</p>

      <h3>Motion Signature</h3>
      <p>{last.identity.motion}</p>

      <h3>Emotional Field</h3>
      <p>{last.identity.emotional}</p>

      <h3>Meaning</h3>
      <p><strong>ME:</strong> {last.meaning.me}</p>
      <p><strong>US:</strong> {last.meaning.us}</p>
      <p><strong>WE:</strong> {last.meaning.we}</p>

      <h3>Timestamp</h3>
      <p>{new Date(last.timestamp).toLocaleString()}</p>

      <h3>Song Source</h3>
      <p>{last.song}</p>
    </div>
  );
}
