import React, { useRef } from "react";

export default function Window({
  win,
  onClose,
  onFocus,
  onMove,
  onResize,
  onSnap,
  children
}) {
  const dragRef = useRef(null);

  function startDrag(e) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWinX = win.x;
    const startWinY = win.y;

    function move(ev) {
      onMove(win.id, startWinX + (ev.clientX - startX), startWinY + (ev.clientY - startY));
    }

    function stop(ev) {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      onSnap(win.id, screenW, screenH);
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  }

  function startResize(e) {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = win.w;
    const startH = win.h;

    function move(ev) {
      onResize(win.id, startW + (ev.clientX - startX), startH + (ev.clientY - startY));
    }

    function stop(ev) {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);

      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      onSnap(win.id, screenW, screenH);
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  }

  return (
    <div
      className="portal-window"
      style={{
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        zIndex: win.z
      }}
      onMouseDown={() => onFocus(win.id)}
    >
      <div className="window-titlebar" onMouseDown={startDrag}>
        <span className="window-title">{win.title}</span>
        <button className="window-close" onClick={() => onClose(win.id)}>✕</button>
      </div>

      <div className="window-content">{children}</div>

      <div className="window-resize" onMouseDown={startResize} />
    </div>
  );
}
