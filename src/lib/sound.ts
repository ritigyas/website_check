// Sound utility — generates cute sounds using the Web Audio API.
// No external files needed. All sounds are synthesized in-browser.
// To use your own audio files instead, replace the play* functions with
// new Audio('/your-file.mp3').play() calls.

let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

let muted = false;

export function setMuted(m: boolean) {
  muted = m;
}

export function isMuted() {
  return muted;
}

function playTone(
  freq: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume: number = 0.15,
  startTime: number = 0,
) {
  const ctx = getCtx();
  if (!ctx || muted) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
  gain.gain.setValueAtTime(0, ctx.currentTime + startTime);
  gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + startTime);
  osc.stop(ctx.currentTime + startTime + duration);
}

export function playPop() {
  playTone(600, 0.08, 'sine', 0.12);
  playTone(900, 0.06, 'sine', 0.08, 0.02);
}

export function playSparkle() {
  playTone(1200, 0.1, 'sine', 0.06);
  playTone(1600, 0.08, 'sine', 0.05, 0.04);
  playTone(2000, 0.06, 'sine', 0.04, 0.08);
}

export function playEnvelope() {
  playTone(400, 0.15, 'sine', 0.1);
  playTone(600, 0.12, 'sine', 0.08, 0.08);
  playTone(800, 0.1, 'sine', 0.06, 0.15);
  playTone(1000, 0.1, 'sine', 0.05, 0.2);
}

export function playWhoosh() {
  const ctx = getCtx();
  if (!ctx || muted) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
}

export function playHeartPop() {
  playTone(523, 0.12, 'sine', 0.1); // C5
  playTone(659, 0.1, 'sine', 0.08, 0.06); // E5
  playTone(784, 0.15, 'sine', 0.08, 0.12); // G5
}

export function playChime() {
  playTone(880, 0.15, 'sine', 0.08);
  playTone(1108, 0.2, 'sine', 0.06, 0.05);
}

export function playSoftClick() {
  playTone(500, 0.04, 'sine', 0.06);
}

// ── Background music (gentle ambient loop) ──
let musicNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
let musicPlaying = false;

export function startMusic() {
  const ctx = getCtx();
  if (!ctx || muted || musicPlaying) return;

  // Gentle ambient pad — soft, slow, calming
  const notes = [261.63, 329.63, 392.0]; // C major chord
  notes.forEach((freq) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 1.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    musicNodes.push({ osc, gain });
  });

  // Add a slow LFO for gentle volume variation
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.frequency.value = 0.1;
  lfoGain.gain.value = 0.01;
  lfo.connect(lfoGain);
  musicNodes.forEach(({ gain }) => lfoGain.connect(gain));
  lfo.start();
  musicNodes.push({ osc: lfo, gain: lfoGain });

  musicPlaying = true;
}

export function stopMusic() {
  const ctx = getCtx();
  if (!ctx) return;
  musicNodes.forEach(({ osc, gain }) => {
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.stop(ctx.currentTime + 0.6);
  });
  musicNodes = [];
  musicPlaying = false;
}

export function isMusicPlaying() {
  return musicPlaying;
}

// Resume audio after user interaction (browsers require this)
export function unlockAudio() {
  getCtx();
}
