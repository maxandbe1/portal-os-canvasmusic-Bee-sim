import React, { useState } from "react";
import NavRail from "./NavRail.jsx";
import Viewport from "./Viewport.jsx";
import TopBar from "./TopBar.jsx";

export default function Shell() {
  const [active, setActive] = useState("beesim");

  return (
    <div className="portal-shell">
      <NavRail active={active} onSelect={setActive} />
      <div className="portal-main">
        <TopBar />
        <Viewport active={active} />
      </div>
    </div>
  );
}

