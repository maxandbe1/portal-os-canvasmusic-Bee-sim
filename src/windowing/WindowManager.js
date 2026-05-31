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
      x: 160 + windows.length * 30,
      y: 120 + windows.length * 30,
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

  // ⭐ SNAP LOGIC
  function snapWindow(id, screenW, screenH) {
    const SNAP = 40;
    const GOLDEN = 0.618;

    windows = windows.map((w) => {
      if (w.id !== id) return w;

      let { x, y, w: width, h: height } = w;

      // LEFT
      if (x < SNAP) return { ...w, x: 0, y: 0, w: screenW / 2, h: screenH };

      // RIGHT
      if (x + width > screenW - SNAP)
        return { ...w, x: screenW / 2, y: 0, w: screenW / 2, h: screenH };

      // TOP
      if (y < SNAP) return { ...w, x: 0, y: 0, w: screenW, h: screenH / 2 };

      // BOTTOM
      if (y + height > screenH - SNAP)
        return { ...w, x: 0, y: screenH / 2, w: screenW, h: screenH / 2 };

      // GOLDEN RATIO
      if (Math.abs(x - screenW * GOLDEN) < SNAP)
        return { ...w, x: screenW * GOLDEN };

      if (Math.abs(y - screenH * GOLDEN) < SNAP)
        return { ...w, y: screenH * GOLDEN };

      return w;
    });

    notify();
  }

  return {
    subscribe,
    openWindow,
    closeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
    snapWindow
  };
}
