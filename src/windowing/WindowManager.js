import { createContext } from "react";

export const WindowContext = createContext();

export function createWindowManager() {
  let windows = [];
  let listeners = [];

  function notify() {
    listeners.forEach((fn) => fn([...windows]));
  }

  function subscribe(fn) {
    listeners.push(fn);
    fn([...windows]);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  }

  function openWindow(appId, title) {
    const id = crypto.randomUUID();
    const win = {
      id,
      appId,
      title,
      x: 120 + windows.length * 30,
      y: 80 + windows.length * 30,
      w: 480,
      h: 320,
      z: windows.length + 1
    };
    windows.push(win);
    notify();
  }

  function closeWindow(id) {
    windows = windows.filter((w) => w.id !== id);
    notify();
  }

  function focusWindow(id) {
    const maxZ = Math.max(...windows.map((w) => w.z), 0);
    windows = windows.map((w) =>
      w.id === id ? { ...w, z: maxZ + 1 } : w
    );
    notify();
  }

  function moveWindow(id, x, y) {
    windows = windows.map((w) =>
      w.id === id ? { ...w, x, y } : w
    );
    notify();
  }

  function resizeWindow(id, w, h) {
    windows = windows.map((w) =>
      w.id === id ? { ...w, w, h } : w
    );
    notify();
  }

  return {
    subscribe,
    openWindow,
    closeWindow,
    focusWindow,
    moveWindow,
    resizeWindow
  };
}
