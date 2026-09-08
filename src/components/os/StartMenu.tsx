import React from 'react';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/sound';
import type { AppId } from '../../types/portfolio';
import {
  RetroMyComputerIcon,
  RetroFolderProjectsIcon,
  RetroProgramsIcon,
  RetroMailIcon,
  RetroTerminalIcon,
  RetroCdMusicIcon,
  RetroNotepadIcon,
  RetroSettingsIcon,
} from './RetroIcons';
import { Power } from 'lucide-react';

interface StartMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartMenu: React.FC<StartMenuProps> = ({ isOpen, onClose }) => {
  const { openWindow, setCameraMode } = usePortfolioStore();

  if (!isOpen) return null;

  const handleAppClick = (id: AppId) => {
    openWindow(id);
    onClose();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="win98-box-outset"
      style={{
        position: 'absolute',
        bottom: '32px',
        left: 0,
        width: '240px',
        zIndex: 9999,
        display: 'flex',
        boxShadow: '4px -4px 12px rgba(0,0,0,0.3)',
      }}
    >
      {/* Side Banner */}
      <div
        style={{
          width: '32px',
          background: 'linear-gradient(to top, #000080 0%, #1084d0 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: '12px',
        }}
      >
        <span
          style={{
            color: '#ffffff',
            fontWeight: 800,
            fontSize: '14px',
            transform: 'rotate(-90deg)',
            whiteSpace: 'nowrap',
            letterSpacing: '1px',
            fontFamily: 'var(--font-sans)',
          }}
        >
          GarfieldOS 98
        </span>
      </div>

      {/* Menu items list */}
      <div style={{ flex: 1, padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ padding: '6px 8px', borderBottom: '1px solid #aaa', marginBottom: '4px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700 }}>{PERSONAL_INFO.name}</div>
          <div style={{ fontSize: '9px', color: '#555' }}>Software Engineer</div>
        </div>

        <button
          className="win98-btn"
          onClick={() => handleAppClick('about')}
          style={{ justifyContent: 'flex-start', padding: '5px 8px', border: 'none', background: 'transparent', boxShadow: 'none', gap: '8px' }}
        >
          <RetroMyComputerIcon size={18} /> About Me
        </button>

        <button
          className="win98-btn"
          onClick={() => handleAppClick('projects')}
          style={{ justifyContent: 'flex-start', padding: '5px 8px', border: 'none', background: 'transparent', boxShadow: 'none', gap: '8px' }}
        >
          <RetroFolderProjectsIcon size={18} /> Projects Showcase
        </button>

        <button
          className="win98-btn"
          onClick={() => handleAppClick('skills')}
          style={{ justifyContent: 'flex-start', padding: '5px 8px', border: 'none', background: 'transparent', boxShadow: 'none', gap: '8px' }}
        >
          <RetroProgramsIcon size={18} /> Tech Skills
        </button>

        <button
          className="win98-btn"
          onClick={() => handleAppClick('contact')}
          style={{ justifyContent: 'flex-start', padding: '5px 8px', border: 'none', background: 'transparent', boxShadow: 'none', gap: '8px' }}
        >
          <RetroMailIcon size={18} /> Contact Email
        </button>

        <button
          className="win98-btn"
          onClick={() => handleAppClick('terminal')}
          style={{ justifyContent: 'flex-start', padding: '5px 8px', border: 'none', background: 'transparent', boxShadow: 'none', gap: '8px' }}
        >
          <RetroTerminalIcon size={18} /> MS-DOS Prompt
        </button>

        <button
          className="win98-btn"
          onClick={() => handleAppClick('music')}
          style={{ justifyContent: 'flex-start', padding: '5px 8px', border: 'none', background: 'transparent', boxShadow: 'none', gap: '8px' }}
        >
          <RetroCdMusicIcon size={18} /> CD Audio Player
        </button>

        <button
          className="win98-btn"
          onClick={() => handleAppClick('guide')}
          style={{ justifyContent: 'flex-start', padding: '5px 8px', border: 'none', background: 'transparent', boxShadow: 'none', gap: '8px' }}
        >
          <RetroNotepadIcon size={18} /> 3D GLB Guide
        </button>

        <div style={{ height: '1px', background: '#aaa', margin: '4px 0' }} />

        <button
          className="win98-btn"
          onClick={() => handleAppClick('settings')}
          style={{ justifyContent: 'flex-start', padding: '5px 8px', border: 'none', background: 'transparent', boxShadow: 'none', gap: '8px' }}
        >
          <RetroSettingsIcon size={18} /> Control Panel
        </button>

        <button
          className="win98-btn"
          onClick={() => {
            sound.playClick();
            setCameraMode('room');
            onClose();
          }}
          style={{ justifyContent: 'flex-start', padding: '5px 8px', border: 'none', background: 'transparent', boxShadow: 'none', gap: '8px' }}
        >
          <Power size={16} color="#dc2626" /> Exit to 3D Room
        </button>
      </div>
    </div>
  );
};
