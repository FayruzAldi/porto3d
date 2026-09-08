import React, { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { sound } from '../../utils/sound';
import { HelpModal } from './HelpModal';
import { 
  Disc3, 
  HelpCircle, 
  Maximize2, 
  Monitor, 
  RotateCcw, 
  Volume2, 
  VolumeX 
} from 'lucide-react';

export const HUDOverlay: React.FC = () => {
  const { 
    cameraMode, 
    setCameraMode, 
    soundEnabled, 
    setSoundEnabled, 
    isLofiPlaying, 
    toggleLofi,
    isDirectOSFullscreen,
    setDirectOSFullscreen
  } = usePortfolioStore();

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Handle ESC key to exit screen mode or close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isHelpOpen) {
          setIsHelpOpen(false);
        } else if (cameraMode === 'screen') {
          setCameraMode('room');
        } else if (isDirectOSFullscreen) {
          setDirectOSFullscreen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cameraMode, isDirectOSFullscreen, isHelpOpen, setCameraMode, setDirectOSFullscreen]);

  return (
    <>
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Top Right: Clean Minimalist Retro HUD Controls (No UI Slop) */}
      <nav
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 8000,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'auto',
          userSelect: 'none',
        }}
      >
        {/* Camera View Switcher Button */}
        <button
          onClick={() => {
            sound.playClick();
            setCameraMode(cameraMode === 'room' ? 'screen' : 'room');
          }}
          className="win98-btn"
          style={{
            padding: '5px 12px',
            fontWeight: 700,
            fontSize: '11px',
            fontFamily: 'var(--font-sans)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: cameraMode === 'screen' ? '#000080' : '#c0c0c0',
            color: cameraMode === 'screen' ? '#ffffff' : '#000000',
            cursor: 'pointer',
          }}
          title={cameraMode === 'room' ? 'Zoom in to CRT Screen' : 'Return to 3D Room View (Esc)'}
        >
          {cameraMode === 'room' ? (
            <>
              <Monitor size={13} />
              <span>Enter Desktop</span>
            </>
          ) : (
            <>
              <RotateCcw size={13} />
              <span>Exit to Room (Esc)</span>
            </>
          )}
        </button>

        {/* Lofi Ambient Toggle */}
        <button
          onClick={() => toggleLofi()}
          className="win98-btn"
          style={{
            padding: '5px 8px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
            color: isLofiPlaying ? '#15803d' : '#333333',
          }}
          title={isLofiPlaying ? 'Stop Lofi Music' : 'Play Lofi Background Music'}
        >
          <Disc3 
            size={13} 
            style={{ animation: isLofiPlaying ? 'spin 3s linear infinite' : 'none' }} 
          />
          <span style={{ fontSize: '10px', fontWeight: 600 }}>Lofi</span>
        </button>

        {/* SFX Mute/Unmute */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="win98-btn"
          style={{ padding: '5px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          title={soundEnabled ? 'Mute SFX' : 'Enable SFX'}
        >
          {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} color="#dc2626" />}
        </button>

        {/* Fullscreen Virtual OS Modal (Fallback / Direct) */}
        <button
          onClick={() => setDirectOSFullscreen(!isDirectOSFullscreen)}
          className="win98-btn"
          style={{ padding: '5px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          title="Layar Penuh Virtual OS"
        >
          <Maximize2 size={12} />
        </button>

        {/* Help Modal */}
        <button
          onClick={() => {
            sound.playClick();
            setIsHelpOpen(true);
          }}
          className="win98-btn"
          style={{ padding: '5px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          title="Petunjuk & Informasi Kontrol"
        >
          <HelpCircle size={13} />
        </button>
      </nav>

      {/* Room View Minimal Subtle Retro Prompt */}
      {cameraMode === 'room' && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 7500,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              padding: '6px 16px',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '12px',
              letterSpacing: '1px',
              color: '#ffffff',
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              border: '1px solid #555555',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: '#4ade80' }}>▶</span>
            <span>CLICK CRT MONITOR TO ENTER DESKTOP</span>
          </div>
        </div>
      )}

      {/* Screen View Minimal Subtle Retro Back Prompt */}
      {cameraMode === 'screen' && (
        <div
          style={{
            position: 'fixed',
            bottom: '12px',
            left: '16px',
            zIndex: 7500,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <div
            style={{
              padding: '4px 10px',
              fontFamily: "'Courier New', Courier, monospace",
              fontSize: '11px',
              color: '#cccccc',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid #444444',
            }}
          >
            Press <strong style={{ color: '#ffffff' }}>[ESC]</strong> to return to 3D room
          </div>
        </div>
      )}
    </>
  );
};
