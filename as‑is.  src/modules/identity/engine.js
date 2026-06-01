// src/modules/identity/engine.js
//
// Portal‑OS Identity Engine
// Tracks identity vectors, modes, emotional state, transitions,
// and exposes introspection + mutation APIs for other modules.

let identityState = {
  mode: "Neutral",
  emotion: "Calm",
  vector: [0, 0, 0],
  confidence: 1.0
};

let identityDeep = {
  mode: "Neutral",
  emotion: "Calm",
  vector: [0, 0, 0],
  confidence: 1.0,
  transitions: []
};

// ---------------------------------------------------------
// PUBLIC API — getters
// ---------------------------------------------------------

export function getIdentityState() {
  return identityState;
}

export function getIdentityDeep() {
  return identityDeep;
}

// ---------------------------------------------------------
// PUBLIC API — setters
// ---------------------------------------------------------

export function setIdentityState(next) {
  identityState = {
    ...identityState,
    ...next
  };

  identityDeep = {
    ...identityDeep,
    ...next
  };

  identityDeep.transitions.push({
    time: performance.now(),
    ...next
  });

  if (typeof window !== "undefined") {
    window.__identityState = identityState;
    window.__identityDeep = identityDeep;
  }
}

export function setIdentityVector(vec) {
  if (!Array.isArray(vec) || vec.length !== 3) return;

  identityState.vector = vec;
  identityDeep.vector = vec;

  identityDeep.transitions.push({
    time: performance.now(),
    vector: vec
  });

  if (typeof window !== "undefined") {
    window.__identityState = identityState;
    window.__identityDeep = identityDeep;
  }
}

export function setIdentityMode(mode) {
  identityState.mode = mode;
  identityDeep.mode = mode;

  identityDeep.transitions.push({
    time: performance.now(),
    mode
  });

  if (typeof window !== "undefined") {
    window.__identityState = identityState;
    window.__identityDeep = identityDeep;
  }
}

export function setIdentityEmotion(emotion) {
  identityState.emotion = emotion;
  identityDeep.emotion = emotion;

  identityDeep.transitions.push({
    time: performance.now(),
    emotion
  });

  if (typeof window !== "undefined") {
    window.__identityState = identityState;
    window.__identityDeep = identityDeep;
  }
}

export function setIdentityConfidence(conf) {
  identityState.confidence = conf;
  identityDeep.confidence = conf;

  identityDeep.transitions.push({
    time: performance.now(),
    confidence: conf
  });

  if (typeof window !== "undefined") {
    window.__identityState = identityState;
    window.__identityDeep = identityDeep;
  }
}

// ---------------------------------------------------------
// Reset
// ---------------------------------------------------------

export function resetIdentity() {
  identityState = {
    mode: "Neutral",
    emotion: "Calm",
    vector: [0, 0, 0],
    confidence: 1.0
  };

  identityDeep = {
    ...identityState,
    transitions: []
  };

  if (typeof window !== "undefined") {
    window.__identityState = identityState;
    window.__identityDeep = identityDeep;
  }
}
