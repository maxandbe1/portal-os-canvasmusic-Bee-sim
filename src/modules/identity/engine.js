// src/modules/identity/engine.js

let identityState = {
  id: null,
  name: null,
  createdAt: null
};

export function initIdentity() {
  if (!identityState.createdAt) {
    identityState = {
      id: "portal-user",
      name: "Portal User",
      createdAt: new Date().toISOString()
    };
  }
  return identityState;
}

export function getIdentity() {
  return identityState;
}

export function setIdentity(patch) {
  identityState = { ...identityState, ...patch };
  return identityState;
}

