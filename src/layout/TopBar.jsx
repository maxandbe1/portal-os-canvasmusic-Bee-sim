import React, { useEffect, useState } from "react";

export default function TopBar() {
  const identity = window.Portal.modules.identity;
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="top-bar">
      <div className="top-left">
        <span className="os-title">Portal‑OS MVV</span>
      </div>

      <div className="top-center">
        <span className="os-clock">
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>

      <div className="top-right">
        <span className="os-session">
          Session: {identity.state.sessionId.slice(0, 8)}
        </span>
      </div>
    </div>
  );
}
