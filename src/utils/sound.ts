// Sound synthesis using Web Audio API — Zero external assets, instant response

class SoundSystem {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private lofiMasterGain: GainNode | null = null;
  private lofiNodes: { osc: OscillatorNode; stopTime: number }[] = [];
  private lofiInterval: number | null = null;
  private lofiStopTimer: number | null = null;
  public isPlayingLofi: boolean = false;
  private chordIndex: number = 0;

  // Lofi jazz chord progressions: Fmaj7 -> Em7 -> Am7 -> Cmaj7
  private readonly chords = [
    [174.61, 261.63, 329.63, 392.00], // Fmaj7: F3 C4 E4 G4
    [164.81, 246.94, 293.66, 392.00], // Em7:   E3 B3 D4 G4
    [220.00, 261.63, 329.63, 440.00], // Am7:   A3 C4 E4 A4
    [130.81, 196.00, 261.63, 329.63], // Cmaj7: C3 G3 C4 E4
  ];

  private readonly melodyNotes = [329.63, 392.00, 440.00, 493.88, 392.00, 349.23];

  private init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playClick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch { /* autoplay policy */ }
  }

  public playKeyClack() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const bufSize = Math.floor(this.ctx.sampleRate * 0.03);
      const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = this.ctx.createBufferSource();
      noise.buffer = buf;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200 + Math.random() * 600;
      filter.Q.value = 3;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch { /* ignored */ }
  }

  public playBootChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      [261.63, 329.63, 392.00, 523.25].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.08 + 1.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 1.3);
      });
    } catch { /* ignored */ }
  }

  public playMonitorSwitch() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(240, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    } catch { /* ignored */ }
  }

  public toggleLofi() {
    if (this.isPlayingLofi) {
      this.stopLofi();
    } else {
      this.startLofi();
    }
    return this.isPlayingLofi;
  }

  // Play one chord as warm detuned pads (sine+triangle per voice) with slow attack/release
  private playChord(freqs: number[], duration: number) {
    if (!this.ctx || !this.lofiMasterGain) return;
    const now = this.ctx.currentTime;

    freqs.forEach((baseFreq, vi) => {
      if (!this.ctx || !this.lofiMasterGain) return;

      // Slight detuning between two oscillators per voice for warm chorus effect
      [-0.8, 0.8].forEach((detune) => {
        if (!this.ctx || !this.lofiMasterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const lpf = this.ctx.createBiquadFilter();

        // Alternate sine and triangle for richness; lower voices use triangle
        osc.type = vi < 2 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(baseFreq + detune, now);

        // Warm lowpass per voice to remove harshness
        lpf.type = 'lowpass';
        lpf.frequency.setValueAtTime(1800, now);
        lpf.Q.value = 0.5;

        // Slow attack, hold, then gentle release
        const peakGain = 0.055 / freqs.length;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(peakGain, now + 0.3);
        gain.gain.setValueAtTime(peakGain, now + duration - 0.5);
        gain.gain.linearRampToValueAtTime(0.0001, now + duration);

        osc.connect(lpf);
        lpf.connect(gain);
        gain.connect(this.lofiMasterGain!);

        osc.start(now);
        osc.stop(now + duration + 0.05);
        this.lofiNodes.push({ osc, stopTime: now + duration + 0.05 });
      });
    });

    // Optional soft melody note accent (60% probability)
    if (Math.random() > 0.4 && this.ctx && this.lofiMasterGain) {
      const noteFreq = this.melodyNotes[Math.floor(Math.random() * this.melodyNotes.length)];
      const mOsc = this.ctx.createOscillator();
      const mGain = this.ctx.createGain();
      const mLpf = this.ctx.createBiquadFilter();

      mOsc.type = 'sine';
      mOsc.frequency.setValueAtTime(noteFreq, now + 0.8);
      mLpf.type = 'lowpass';
      mLpf.frequency.value = 2000;
      mGain.gain.setValueAtTime(0.0001, now + 0.8);
      mGain.gain.linearRampToValueAtTime(0.04, now + 0.95);
      mGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      mOsc.connect(mLpf);
      mLpf.connect(mGain);
      mGain.connect(this.lofiMasterGain);
      mOsc.start(now + 0.8);
      mOsc.stop(now + 2.3);
      this.lofiNodes.push({ osc: mOsc, stopTime: now + 2.3 });
    }
  }

  private cleanLofiNodes() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.lofiNodes = this.lofiNodes.filter(n => n.stopTime > now);
  }

  private killLofiNodes() {
    this.lofiNodes.forEach(({ osc }) => {
      try { osc.stop(); osc.disconnect(); } catch { /* ignored */ }
    });
    this.lofiNodes = [];
  }

  public startLofi() {
    try {
      this.init();
      if (!this.ctx) return;

      // Cancel any pending stop timer immediately
      if (this.lofiStopTimer !== null) {
        clearTimeout(this.lofiStopTimer);
        this.lofiStopTimer = null;
      }
      if (this.lofiInterval !== null) {
        clearInterval(this.lofiInterval);
        this.lofiInterval = null;
      }

      // Clean up any active oscillators
      this.killLofiNodes();
      if (this.lofiMasterGain) {
        try { this.lofiMasterGain.disconnect(); } catch { /* ignored */ }
        this.lofiMasterGain = null;
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.isPlayingLofi = true;
      this.chordIndex = 0;

      // Master gain with smooth fade-in
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.001, this.ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 0.8);
      master.connect(this.ctx.destination);
      this.lofiMasterGain = master;

      // Chord duration (seconds per chord)
      const CHORD_DUR = 3.0;

      // Play first chord immediately
      this.playChord(this.chords[this.chordIndex], CHORD_DUR);

      // Cycle through chords every CHORD_DUR seconds
      this.lofiInterval = window.setInterval(() => {
        if (!this.isPlayingLofi) return;
        this.chordIndex = (this.chordIndex + 1) % this.chords.length;
        this.playChord(this.chords[this.chordIndex], CHORD_DUR);
        this.cleanLofiNodes();
      }, CHORD_DUR * 1000);

    } catch {
      this.isPlayingLofi = false;
    }
  }

  public stopLofi() {
    this.isPlayingLofi = false;

    if (this.lofiInterval !== null) {
      clearInterval(this.lofiInterval);
      this.lofiInterval = null;
    }

    // Smooth fade-out
    if (this.lofiMasterGain && this.ctx) {
      try {
        this.lofiMasterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.lofiMasterGain.gain.setValueAtTime(this.lofiMasterGain.gain.value, this.ctx.currentTime);
        this.lofiMasterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
      } catch { /* ignored */ }
    }

    if (this.lofiStopTimer !== null) clearTimeout(this.lofiStopTimer);

    this.lofiStopTimer = window.setTimeout(() => {
      this.killLofiNodes();
      if (this.lofiMasterGain) {
        try { this.lofiMasterGain.disconnect(); } catch { /* ignored */ }
        this.lofiMasterGain = null;
      }
      this.lofiStopTimer = null;
    }, 500);
  }
}

export const sound = new SoundSystem();
