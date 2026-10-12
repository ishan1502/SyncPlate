/**
 * Web Audio API gentle kitchen chime synthesizer.
 * Zero external audio files required, works offline on mobile and desktop.
 */
export const playKitchenChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Two-tone bell chime (880Hz -> 1174Hz)
    const notes = [880, 1174.66, 1760];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.15);

      gain.gain.setValueAtTime(0.3, ctx.currentTime + index * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.15 + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.15);
      osc.stop(ctx.currentTime + index * 0.15 + 0.8);
    });
  } catch (e) {
    // Audio context may be restricted by browser until user gesture
    console.debug('Audio context note:', e);
  }
};
