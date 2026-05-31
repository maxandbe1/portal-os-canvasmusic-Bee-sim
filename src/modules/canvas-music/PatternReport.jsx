
import React from "react";
import { SessionStore } from "../../system/SessionStore.js";
import { analyzePatterns } from "../../system/PatternEngine.js";

export default function PatternReport() {
  const sessions = SessionStore.getSessions();
  const patterns = analyzePatterns(sessions);

  return (
    <div className="pattern-report">
      <h2>Identity Pattern Report</h2>

      <p><strong>Identity Mode:</strong> {patterns.identityMode}</p>
      <p><strong>Emotional Trend:</strong> {patterns.emotionalTrend}</p>
      <p><strong>Relational Trend:</strong> {patterns.relationalTrend}</p>

      <p style={{ marginTop: "12px", opacity: 0.7 }}>
        Based on your last {sessions.length} sessions.
      </p>
    </div>
  );
}
