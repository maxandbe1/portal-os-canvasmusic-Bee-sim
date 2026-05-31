import React from "react";

export default function IdentityView() {
  const mod = window.Portal.modules.identity;
  return (
    <div className="module-view">
      <h2>Identity</h2>
      <p>User: {mod.state.userId}</p>
      <p>Session: {mod.state.sessionId}</p>
    </div>
  );
}
