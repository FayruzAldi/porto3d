// SoundCloud Widget Controller & Global Audio Manager

declare global {
  interface Window {
    SC?: {
      Widget: {
        (iframe: HTMLIFrameElement | string): SoundCloudWidgetInstance;
        Events: {
          LOAD_PROGRESS: string;
          PLAY_PROGRESS: string;
          PLAY: string;
          PAUSE: string;
          FINISH: string;
          SEEK: string;
          READY: string;
          OPEN_SHARE_PANEL: string;
          ERROR: string;
        };
      };
    };
  }
}

export interface SoundCloudWidgetInstance {
  bind(event: string, callback: (data?: any) => void): void;
  unbind(event: string): void;
  load(url: string, options?: any): void;
  play(): void;
  pause(): void;
  toggle(): void;
  seekTo(milliseconds: number): void;
  setVolume(volume: number): void; // 0 to 100
  next(): void;
  prev(): void;
  isPaused(callback: (paused: boolean) => void): void;
  getVolume(callback: (volume: number) => void): void;
  getDuration(callback: (duration: number) => void): void;
  getPosition(callback: (position: number) => void): void;
  getSounds(callback: (sounds: any[]) => void): void;
  getCurrentSound(callback: (sound: any) => void): void;
}

export interface SoundTrackInfo {
  title: string;
  artist: string;
  artworkUrl?: string;
  duration?: number;
}

export interface PresetPlaylist {
  id: string;
  name: string;
  genre: string;
  url: string;
}

export const SOUNDCLOUD_PRESETS: PresetPlaylist[] = [
  {
    id: 'lofigirl',
    name: 'Lofi Hip Hop Chill (Lofi Girl)',
    genre: 'Lofi Chill / Study',
    url: 'https://soundcloud.com/lofi-girl/sets/lofi-hip-hop-radio-beats-to'
  },
  {
    id: 'chillhop',
    name: 'Chillhop Essentials & Melodic',
    genre: 'Chillhop / Jazzy Beats',
    url: 'https://soundcloud.com/chillhopdotcom/sets/chillhop-essentials-summer'
  },
  {
    id: 'synthwave',
    name: 'Retro Synthwave & Neon Rain',
    genre: 'Synthwave / Cyberpunk',
    url: 'https://soundcloud.com/retrogroovy/sets/synthwave-retrowave-chillwave'
  }
];

type Listener = () => void;

class SoundCloudManager {
  private widget: SoundCloudWidgetInstance | null = null;
  public isReady: boolean = false;
  public isPlaying: boolean = false;
  public currentTrack: SoundTrackInfo = {
    title: 'Loading Lofi Stream...',
    artist: 'SoundCloud Lofi',
    artworkUrl: ''
  };
  public activePlaylist: PresetPlaylist = SOUNDCLOUD_PRESETS[0];
  public volume: number = 70; // 0-100
  private listeners: Set<Listener> = new Set();
  private onStateChangeCallback: ((playing: boolean) => void) | null = null;

  public registerStateCallback(cb: (playing: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  public init(iframe: HTMLIFrameElement) {
    if (!window.SC || !window.SC.Widget) {
      setTimeout(() => this.init(iframe), 500);
      return;
    }

    try {
      this.widget = window.SC.Widget(iframe);

      this.widget.bind(window.SC.Widget.Events.READY, () => {
        this.isReady = true;
        this.widget?.setVolume(this.volume);
        this.updateCurrentSound();
        this.notify();
      });

      this.widget.bind(window.SC.Widget.Events.PLAY, () => {
        this.isPlaying = true;
        this.updateCurrentSound();
        if (this.onStateChangeCallback) this.onStateChangeCallback(true);
        this.notify();
      });

      this.widget.bind(window.SC.Widget.Events.PAUSE, () => {
        this.isPlaying = false;
        if (this.onStateChangeCallback) this.onStateChangeCallback(false);
        this.notify();
      });

      this.widget.bind(window.SC.Widget.Events.FINISH, () => {
        this.widget?.next();
      });

      this.widget.bind(window.SC.Widget.Events.ERROR, (err) => {
        if (err) {
          console.warn('SoundCloud widget notice:', err);
        }
      });
    } catch (e) {
      console.error('Failed to init SoundCloud widget', e);
    }
  }

  private updateCurrentSound() {
    if (!this.widget) return;
    this.widget.getCurrentSound((sound) => {
      if (sound) {
        this.currentTrack = {
          title: sound.title || 'Lofi Beats Track',
          artist: sound.user?.username || 'SoundCloud Artist',
          artworkUrl: sound.artwork_url || sound.user?.avatar_url || '',
          duration: sound.duration || 0
        };
        this.notify();
      }
    });
  }

  public play() {
    if (this.widget && this.isReady) {
      this.widget.play();
    }
  }

  public pause() {
    if (this.widget && this.isReady) {
      this.widget.pause();
    }
  }

  public toggle(): boolean {
    if (!this.widget || !this.isReady) return false;
    this.widget.toggle();
    return !this.isPlaying;
  }

  public next() {
    if (this.widget && this.isReady) {
      this.widget.next();
      setTimeout(() => this.updateCurrentSound(), 500);
    }
  }

  public prev() {
    if (this.widget && this.isReady) {
      this.widget.prev();
      setTimeout(() => this.updateCurrentSound(), 500);
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(100, vol));
    if (this.widget && this.isReady) {
      this.widget.setVolume(this.volume);
    }
    this.notify();
  }

  public setPlaylist(preset: PresetPlaylist) {
    this.activePlaylist = preset;
    if (this.widget && this.isReady) {
      this.widget.load(preset.url, {
        auto_play: this.isPlaying,
        color: '#ff5500',
        buying: false,
        liking: false,
        download: false,
        sharing: false,
        show_comments: false,
        show_playcount: false,
        show_user: true
      });
      setTimeout(() => this.updateCurrentSound(), 1000);
    }
    this.notify();
  }
}

export const soundCloudManager = new SoundCloudManager();
