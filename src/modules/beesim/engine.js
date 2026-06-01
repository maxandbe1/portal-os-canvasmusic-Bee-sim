// src/modules/beesim/engine.js

let running = false;
let tick = 0;

let hiveState = {
  bees: 50,
  nectar: 0,
  honey: 0
};

export function initBeesim() {
  running = false;
  tick = 0;
  hiveState = { bees: 50, nectar: 0, honey: 0 };
  return hiveState;
}

export function startBeesim() {
  if (running) return;
  running = true;
  loop();
}

export function stopBeesim() {
  running = false;
}

function loop() {
  if (!running) return;

  tick++;

  hiveState.nectar += hiveState.bees * 0.1;
  if (hiveState.nectar >= 10) {
    hiveState.nectar -= 10;
    hiveState.honey += 1;
  }

  if (typeof window !== "undefined") {
    window.__beesimTick = tick;
    window.__beesimHive = { ...hiveState };
  }

  setTimeout(loop, 200);
}

export function getBeesimState() {
  return { tick, hive: { ...hiveState }, running };
}

