import React from "react";
import { SessionStore } from "../../system/SessionStore.js";
import { analyzePatterns } from "../../system/PatternEngine.js";
import { generateSongIdentityProfile } from "../../system/ProfileEngine.js";

export default function SongIdentityProfile() {
  const sessions = SessionStore.getSessions();
  const patterns = analyzePatterns(sessions);
  const profile = generateSongIdentityProfile(sessions, patterns);

  return (
    <div className="profile-report">
      <h2>{profile.title}</h2>
      <p>{profile.summary}</p>

      <h3>Core Identity</h3>
      <p>{profile.coreIdentity}</p>

      <h3>Description</h3>
      <p style={{ whiteSpace: "pre-line" }}>{profile.description}</p>

      <h3>Identity Modes</h3>
      <ul>
        {profile.identityModes.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>

      <h3>Emotional Trends</h3>
      <ul>
        {profile.emotionalTrends.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>

      <h3>Relational Trends</h3>
      <ul>
        {profile.relationalTrends.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}
