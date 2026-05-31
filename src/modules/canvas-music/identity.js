function avg(arr) {
  if (!arr || arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

export function analyzeIdentity(freq, wave) {
  if (!freq || !wave) {
    return {
      identity: "Calibrating…",
      motion: "Calibrating…",
      emotional: "Calibrating…",
      bass: 0,
      mid: 0,
      high: 0,
      amplitude: 0
    };
  }

  const bass = avg(freq.slice(0, 40));
  const mid = avg(freq.slice(40, 200));
  const high = avg(freq.slice(200));
  const amplitude = avg(Array.from(wave, (v) => Math.abs(v - 128)));

  let identity = "Contained intensity";
  if (bass > mid && bass > high) identity = "Grounded force";
  if (high > bass && high > mid) identity = "Expansive tension";
  if (mid > bass && mid > high) identity = "Centered alignment";

  let motion = "Slow → Hold → Slow";
  if (amplitude > 40) motion = "Build → Release → Build";
  if (amplitude > 70) motion = "Surge → Break → Surge";

  let emotional = "Quiet tension";
  if (high > 160) emotional = "Alert expansion";
  if (bass > 160) emotional = "Heavy grounding";
  if (mid > 160) emotional = "Balanced presence";

  return { identity, motion, emotional, bass, mid, high, amplitude };
}
