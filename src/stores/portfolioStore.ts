import { useState, useEffect } from 'react';
import type { AppId, CameraViewMode, OSTheme, WindowState } from '../types/portfolio';
import { sound } from '../utils/sound';
import { audioManager } from '../utils/audioManager';

audioManager.registerStateCallback((playing) => {
  globalState.isLofiPlaying = playing;
  notify();
});

const INITIAL_WINDOWS: Record<AppId, WindowState> = {
  about: {
    id: 'about',
    title: 'About_Me.exe',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 10,
    position: { x: 30, y: 30 },
    size: { width: 520, height: 420 },
  },
  projects: {
    id: 'projects',
    title: 'Featured_Projects.exe',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 11,
    position: { x: 70, y: 40 },
    size: { width: 620, height: 480 },
  },
  skills: {
    id: 'skills',
    title: 'Tech_Skills.bin',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 9,
    position: { x: 100, y: 50 },
    size: { width: 540, height: 440 },
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal - bash v5.2',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 12,
    position: { x: 120, y: 70 },
    size: { width: 560, height: 380 },
  },
  music: {
    id: 'music',
    title: 'Lofi_Chill_Player.mp3',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 8,
    position: { x: 160, y: 90 },
    size: { width: 440, height: 360 },
  },
  contact: {
    id: 'contact',
    title: 'Send_Message.mail',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 13,
    position: { x: 140, y: 60 },
    size: { width: 480, height: 450 },
  },
  settings: {
    id: 'settings',
    title: 'Control_Panel.sys',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 14,
    position: { x: 180, y: 80 },
    size: { width: 460, height: 380 },
  },
  guide: {
    id: 'guide',
    title: '3D_GLB_Guide.txt - Notepad',
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 15,
    position: { x: 80, y: 70 },
    size: { width: 500, height: 400 },
  }
};

interface GlobalState {
  cameraMode: CameraViewMode;
  windows: Record<AppId, WindowState>;
  highestZIndex: number;
  soundEnabled: boolean;
  theme: OSTheme;
  scanlinesEnabled: boolean;
  isDirectOSFullscreen: boolean;
  useCustomModel: boolean;
  customModelUrl: string | null;
  isLofiPlaying: boolean;
}

let globalState: GlobalState = {
  cameraMode: 'room',
  windows: INITIAL_WINDOWS,
  highestZIndex: 20,
  soundEnabled: true,
  theme: 'classic',
  scanlinesEnabled: true,
  isDirectOSFullscreen: false,
  useCustomModel: false,
  customModelUrl: null,
  isLofiPlaying: false,
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

export const portfolioActions = {
  setCameraMode(mode: CameraViewMode) {
    if (globalState.cameraMode !== mode) {
      sound.playMonitorSwitch();
    }
    globalState.cameraMode = mode;
    notify();
  },

  toggleCameraMode() {
    this.setCameraMode(globalState.cameraMode === 'room' ? 'screen' : 'room');
  },

  openWindow(id: AppId) {
    sound.playClick();
    globalState.highestZIndex += 1;
    globalState.windows = {
      ...globalState.windows,
      [id]: {
        ...globalState.windows[id],
        isOpen: true,
        isMinimized: false,
        zIndex: globalState.highestZIndex,
      },
    };
    notify();
  },

  closeWindow(id: AppId) {
    sound.playClick();
    globalState.windows = {
      ...globalState.windows,
      [id]: {
        ...globalState.windows[id],
        isOpen: false,
      },
    };
    notify();
  },

  minimizeWindow(id: AppId) {
    sound.playClick();
    globalState.windows = {
      ...globalState.windows,
      [id]: {
        ...globalState.windows[id],
        isMinimized: !globalState.windows[id].isMinimized,
      },
    };
    notify();
  },

  maximizeWindow(id: AppId) {
    sound.playClick();
    globalState.windows = {
      ...globalState.windows,
      [id]: {
        ...globalState.windows[id],
        isMaximized: !globalState.windows[id].isMaximized,
      },
    };
    notify();
  },

  focusWindow(id: AppId) {
    globalState.highestZIndex += 1;
    globalState.windows = {
      ...globalState.windows,
      [id]: {
        ...globalState.windows[id],
        isMinimized: false,
        zIndex: globalState.highestZIndex,
      },
    };
    notify();
  },

  setWindowPosition(id: AppId, position: { x: number; y: number }) {
    globalState.windows = {
      ...globalState.windows,
      [id]: {
        ...globalState.windows[id],
        position,
      },
    };
    notify();
  },

  setSoundEnabled(enabled: boolean) {
    sound.enabled = enabled;
    globalState.soundEnabled = enabled;
    notify();
  },

  setTheme(theme: OSTheme) {
    sound.playClick();
    globalState.theme = theme;
    notify();
  },

  setScanlinesEnabled(enabled: boolean) {
    sound.playClick();
    globalState.scanlinesEnabled = enabled;
    notify();
  },

  setDirectOSFullscreen(val: boolean) {
    sound.playClick();
    globalState.isDirectOSFullscreen = val;
    notify();
  },

  setUseCustomModel(val: boolean) {
    sound.playClick();
    globalState.useCustomModel = val;
    notify();
  },

  setCustomModelUrl(url: string | null) {
    sound.playClick();
    globalState.customModelUrl = url;
    notify();
  },

  toggleLofi() {
    sound.playClick();
    const nextState = audioManager.toggle();
    globalState.isLofiPlaying = nextState;
    notify();
  }
};

export function usePortfolioStore() {
  const [state, setState] = useState<GlobalState>(() => ({ ...globalState }));

  useEffect(() => {
    const update = () => setState({ ...globalState });
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);

  return {
    ...state,
    ...portfolioActions,
  };
}
