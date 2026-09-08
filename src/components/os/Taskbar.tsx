import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { sound } from '../../utils/sound';
import { StartMenu } from './StartMenu';
import type { AppId } from '../../types/portfolio';
import { RetroWindowsFlagIcon } from './RetroIcons';
import { Disc3, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react';

export const Taskbar: React.FC = () => {
  const { 
    windows, 
    focusWindow, 
    minimizeWindow, 
    soundEnabled, 
    setSoundEnabled,
    isLofiPlaying, 
    toggleLofi,
    isDirectOSFullscreen,
    setDirectOSFullscreen
  } = usePortfolioStore();

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindowsList = Object.values(windows).filter(w => w.isOpen);

  const handleTabClick = (id: AppId) => {
    const win = windows[id];
    if (win.isMinimized) {
      focusWindow(id);
    } else {
      minimizeWindow(id);
    }
  };

  return (
    <>
      <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />

      <div
        className="win98-box-outset"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '32px',
          zIndex: 9000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '2px 4px',
          userSelect: 'none',
          pointerEvents: 'auto',
        }}
      >
        {/* Left: Start Button & Window Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, overflow: 'hidden' }}>
          <button
            onClick={() => {
              sound.playClick();
              setIsStartOpen(!isStartOpen);
            }}
            className={isStartOpen ? 'win98-box-inset' : 'win98-btn'}
            style={{
              padding: '2px 8px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 800,
              fontSize: '11px',
            }}
          >
            <RetroWindowsFlagIcon size={14} />
            Start
          </button>

          <div style={{ height: '18px', width: '2px', background: '#888', margin: '0 2px' }} />

          {/* Window Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flex: 1, overflowX: 'auto' }}>
            {openWindowsList.map(win => {
              const isFocused = !win.isMinimized;
              return (
                <button
                  key={win.id}
                  onClick={() => handleTabClick(win.id)}
                  className={isFocused ? 'win98-box-inset' : 'win98-btn'}
                  style={{
                    padding: '2px 8px',
                    height: '24px',
                    maxWidth: '140px',
                    fontSize: '11px',
                    fontWeight: isFocused ? 700 : 500,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    textAlign: 'left',
                    background: isFocused ? '#dedede' : undefined,
                  }}
                  title={win.title}
                >
                  {win.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: System Tray */}
        <div
          className="win98-box-inset"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '2px 8px',
            height: '24px',
            fontSize: '11px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          {/* Lofi Beats indicator button */}
          <button
            onClick={() => toggleLofi()}
            title={isLofiPlaying ? 'Stop Lofi Music' : 'Play Lofi Ambient'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
          >
            <Disc3 
              size={14} 
              color={isLofiPlaying ? '#16a34a' : '#888'} 
              style={{ animation: isLofiPlaying ? 'spin 3s linear infinite' : 'none' }}
            />
          </button>

          {/* Audio toggle button */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} color="#dc2626" />}
          </button>

          {/* Fullscreen Direct OS button */}
          <button
            onClick={() => setDirectOSFullscreen(!isDirectOSFullscreen)}
            title={isDirectOSFullscreen ? 'Dock to 3D Screen' : 'Fullscreen Virtual OS'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
          >
            {isDirectOSFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>

          {/* Clock */}
          <span style={{ fontWeight: 600, minWidth: '46px', textAlign: 'right' }}>
            {timeStr}
          </span>
        </div>
      </div>
    </>
  );
};
