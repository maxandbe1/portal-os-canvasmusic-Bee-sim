import React from "react";
import DashboardView from "../modules/dashboard/view.jsx";
import ConsoleView from "../modules/console/view.jsx";
import CanvasMusicView from "../modules/canvas-music/view.jsx";
import BeesimView from "../modules/beesim/view.jsx";
import MemoryView from "../modules/memory/view.jsx";
import SoundView from "../modules/sound/view.jsx";

export default function Viewport({ active }) {
  switch (active) {
    case "dashboard":
      return <DashboardView />;
    case "console":
      return <ConsoleView />;
    case "canvas-music":
      return <CanvasMusicView />;
    case "beesim":
      return <BeesimView />;
    case "memory":
      return <MemoryView />;
    case "sound":
      return <SoundView />;
   default:
      return <CanvasMusicView />;
  }
}
