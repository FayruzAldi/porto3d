import React, { useState } from 'react';
import { sound } from '../../utils/sound';
import { Monitor, Sparkles } from 'lucide-react';

export const StartupScreen: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);

  if (hasStarted) return null;

  const handleStart = () => {
    sound.playBootChime();
    setHasStarted(true);
  };

  return (
    <div
      onClick={handleStart}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        backgroundColor: '#090b10',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '20px',
        color: '#ffffff',
        textAlign: 'center',
        userSelect: 'none',
      }}
    >
      <div
        className="win98-box-outset"
        style={{
          padding: '24px 32px',
          maxWidth: '440px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          background: 'rgba(255, 255, 255, 0.95)',
          color: '#0f172a',
          borderRadius: '4px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #000080 0%, #1084d0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
          }}
        >
          <Monitor size={32} />
        </div>

        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 800, margin: 0, letterSpacing: '-0.5px' }}>
            ANDREW GARFIELD
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
            3D Interactive Workstation Portfolio
          </p>
        </div>

        <div className="win98-box-inset" style={{ padding: '8px 12px', fontSize: '11px', color: '#475569' }}>
          Terinspirasi dari portofolio retro Henry Heffernan. Dilengkapi Three.js 3D room, virtual desktop OS, terminal, dan audio synthesizer.
        </div>

        <button
          className="win98-btn"
          onClick={handleStart}
          style={{
            padding: '10px 24px',
            fontSize: '13px',
            fontWeight: 800,
            color: '#ffffff',
            background: 'linear-gradient(135deg, #000080 0%, #1084d0 100%)',
            border: 'none',
            borderRadius: '2px',
          }}
        >
          <Sparkles size={16} /> Nyalakan Workstation (Enter)
        </button>

        <span style={{ fontSize: '10px', color: '#94a3b8' }}>
          *Klik di mana saja untuk memulai audio & animasi 3D
        </span>
      </div>
    </div>
  );
};
