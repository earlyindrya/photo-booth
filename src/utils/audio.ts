// Web Audio API procedural sound effects - zero external sound files required

let audioCtx: AudioContext | null = null;
let isAudioMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const soundManager = {
  getMuted: () => isAudioMuted,
  setMuted: (muted: boolean) => {
    isAudioMuted = muted;
  },
  toggleMute: () => {
    isAudioMuted = !isAudioMuted;
    return isAudioMuted;
  },

  // 3-2-1 Countdown Tick
  playCountdownTick: (isFinal = false) => {
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(isFinal ? 1200 : 700, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(isFinal ? 1600 : 900, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // AudioContext might be blocked until user interacts
    }
  },

  // Dual-curtain DSLR Mechanical Shutter Click + Flash Thump
  playShutterSound: () => {
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. First curtain click (white noise burst)
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise1 = ctx.createBufferSource();
      noise1.buffer = buffer;
      const noiseFilter1 = ctx.createBiquadFilter();
      noiseFilter1.type = 'highpass';
      noiseFilter1.frequency.value = 1500;

      const noiseGain1 = ctx.createGain();
      noiseGain1.gain.setValueAtTime(0.4, now);
      noiseGain1.gain.exponentialRampToValueAtTime(0.01, now + 0.04);

      noise1.connect(noiseFilter1);
      noiseFilter1.connect(noiseGain1);
      noiseGain1.connect(ctx.destination);
      noise1.start(now);

      // 2. Low mechanical snap
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.06);

      oscGain.gain.setValueAtTime(0.5, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);

      // 3. Second curtain mirror slap (60ms later)
      const noise2 = ctx.createBufferSource();
      noise2.buffer = buffer;
      const noiseGain2 = ctx.createGain();
      noiseGain2.gain.setValueAtTime(0.35, now + 0.07);
      noiseGain2.gain.exponentialRampToValueAtTime(0.01, now + 0.13);

      noise2.connect(noiseGain2);
      noiseGain2.connect(ctx.destination);
      noise2.start(now + 0.07);
    } catch {
      // Ignored
    }
  },

  // Celebratory melodic chime
  playSuccessChime: () => {
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + idx * 0.09;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.36);
      });
    } catch {
      // Ignored
    }
  },

  // Soft UI button click
  playClick: () => {
    if (isAudioMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignored
    }
  }
};
