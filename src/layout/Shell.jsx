import React, { useState } from "react";
import NavRail from "./NavRail.jsx";
import Viewport from "./Viewport.jsx";

export default function Shell() {
  const [active, setActive] = useState("canvas-music");

  return (
    <div className="portal-shell">
      <NavRail active={active} onSelect={setActive} />
      <Viewport active={active} />
    </div>
  );
}
