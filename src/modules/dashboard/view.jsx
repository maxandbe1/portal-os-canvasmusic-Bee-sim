
import React from "react";

export default function DashboardView() {
  const identity = window.Portal.modules.identity;
  const dashboard = window.Portal.modules.dashboard;

  return (
    <div className="module-view">
      <h2>Portal‑OS Dashboard</h2>
      <p>User: {identity.state.userId}</p>
      <p>Session: {identity.state.sessionId}</p>
      <p>Boot time: {dashboard.state.bootTime}</p>
    </div>
  );
}
