// Rock-solid HTML5 Audio Engine for Lofi Background Music

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  durationFormatted: string;
  genre: string;
}

export const PLAYLIST: AudioTrack[] = [
  {
    id: 'track-1',
    title: 'Chill Beats Club',
    artist: 'Tyler Twombly',
    src: '/audio/chill-beats-1.mp3',
    durationFormatted: '03:26',
    genre: 'Lofi Jazz & Chillhop'
  },
  {
    id: 'track-2',
    title: 'Background Radiation Vibe',
    artist: 'Tyler Twombly',
    src: '/audio/chill-beats-2.mp3',
    durationFormatted: '04:04',
    genre: 'Ambient Lofi Downtempo'
  }
];

type AudioListener = () => void;

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  public isPlaying: boolean = false;
  public currentTrackIndex: number = 0;
  public volume: number = 75; // 0 to 100
  public currentTime: number = 0;
  public duration: number = 0;
  private listeners: Set<AudioListener> = new Set();
  private onStateChangeCallback: ((playing: boolean) => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;
    this.audio = new Audio();
    this.audio.preload = 'metadata';
    this.audio.volume = this.volume / 100;
    this.audio.src = PLAYLIST[this.currentTrackIndex].src;

    this.audio.addEventListener('play', () => {
      this.isPlaying = true;
      if (this.onStateChangeCallback) this.onStateChangeCallback(true);
      this.notify();
    });

    this.audio.addEventListener('pause', () => {
      this.isPlaying = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
      this.notify();
    });

    this.audio.addEventListener('ended', () => {
      this.next();
    });

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio) {
        this.currentTime = this.audio.currentTime;
        this.duration = this.audio.duration || 0;
        this.notify();
      }
    });

    this.audio.addEventListener('loadedmetadata', () => {
      if (this.audio) {
        this.duration = this.audio.duration || 0;
        this.notify();
      }
    });

    this.audio.addEventListener('error', (e) => {
      console.warn('Audio playback notice:', e);
    });
  }

  public registerStateCallback(cb: (playing: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public subscribe(listener: AudioListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  public get currentTrack(): AudioTrack {
    return PLAYLIST[this.currentTrackIndex];
  }

  public async play(): Promise<boolean> {
    this.initAudio();
    if (!this.audio) return false;
    try {
      await this.audio.play();
      this.isPlaying = true;
      this.notify();
      return true;
    } catch (e) {
      console.warn('Autoplay blocked or waiting for user interaction', e);
      return false;
    }
  }

  public pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle(): boolean {
    this.initAudio();
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public next() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % PLAYLIST.length;
    this.loadAndPlayCurrent();
  }

  public prev() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    this.loadAndPlayCurrent();
  }

  public selectTrack(index: number) {
    if (index >= 0 && index < PLAYLIST.length) {
      this.currentTrackIndex = index;
      this.loadAndPlayCurrent();
    }
  }

  private loadAndPlayCurrent() {
    this.initAudio();
    if (!this.audio) return;
    const wasPlaying = this.isPlaying;
    this.audio.src = PLAYLIST[this.currentTrackIndex].src;
    this.audio.load();
    if (wasPlaying) {
      this.audio.play().catch(() => {});
    }
    this.notify();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(100, vol));
    if (this.audio) {
      this.audio.volume = this.volume / 100;
    }
    this.notify();
  }

  public seek(percent: number) {
    if (this.audio && this.duration > 0) {
      this.audio.currentTime = (percent / 100) * this.duration;
    }
  }
}

export const audioManager = new AudioManager();
