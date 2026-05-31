import React, { useEffect, useState } from "react";
import Window from "./Window.jsx";

export default function WindowLayer({ manager, renderApp }) {
  const [windows, setWindows] = useState([]);

  useEffect(() => {
    return manager.subscribe(setWindows);
  }, []);

  return (
    <div className="window-layer">
      {windows.map((win) => (
        <Window
          key={win.id}
          win={win}
          onClose={manager.closeWindow}
          onFocus={manager.focusWindow}
          onMove={manager.moveWindow}
          onResize={manager.resizeWindow}
        >
          {renderApp(win.appId)}
        </Window>
      ))}
    </div>
  );
}
