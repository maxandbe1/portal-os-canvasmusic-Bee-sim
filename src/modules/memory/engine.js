
// src/modules/memory/engine.js

const store = new Map();

export function initMemory() {
  return store;
}

export function setMemory(key, value) {
  store.set(key, value);
  return value;
}

export function getMemory(key) {
  return store.get(key);
}

export function getAllMemory() {
  const obj = {};
  for (const [k, v] of store.entries()) obj[k] = v;
  return obj;
}

export function clearMemory() {
  store.clear();
}
