// src/lib/audio/createAudioClient.ts
export type AudioClient = {
  start: () => Promise<void>;
  stop: () => void;
  getAnalyser: () => AnalyserNode | null;
};

export function createAudioClient(audioUrl: string): AudioClient {
  let ctx: AudioContext | null = null;
  let source: MediaElementAudioSourceNode | null = null;
  let analyser: AnalyserNode | null = null;
  const audio = new Audio();

  audio.crossOrigin = "anonymous";
  audio.src = audioUrl;

  async function start() {
    if (!ctx) {
      ctx = new AudioContext();
      analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
    }
    if (!source && ctx) {
      source = ctx.createMediaElementSource(audio);
      source.connect(analyser!);
      analyser!.connect(ctx.destination);
    }
    await audio.play();
  }

  function stop() {
    audio.pause();
    if (ctx) {
      ctx.close();
      ctx = null;
      source = null;
      analyser = null;
    }
  }

  function getAnalyser() {
    return analyser;
  }

  return { start, stop, getAnalyser };
}
