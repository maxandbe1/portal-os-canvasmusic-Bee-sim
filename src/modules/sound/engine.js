// src/modules/sound/engine.js

let audioContext = null;
let masterGain = null;

export function initSound() {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.8;
    masterGain.connect(audioContext.destination);
  }
  return { audioContext, masterGain };
}

export function getSoundContext() {
  return { audioContext, masterGain };
}

export function setMasterVolume(v) {
  if (!masterGain) return;
  masterGain.gain.value = Math.max(0, Math.min(1, v));
}

export async function playBeep(freq = 440, duration = 0.2) {
  if (!audioContext) initSound();
  if (!audioContext) return;

  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.frequency.value = freq;
  gain.gain.value = 0.2;

  osc.connect(gain);
  gain.connect(masterGain || audioContext.destination);

  osc.start();
  osc.stop(audioContext.currentTime + duration);
}

