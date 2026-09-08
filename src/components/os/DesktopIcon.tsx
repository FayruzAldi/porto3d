import React, { useState } from 'react';
import { sound } from '../../utils/sound';

interface DesktopIconProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ label, icon, onClick }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playClick();
    setIsSelected(true);
    onClick();
  };

  return (
    <div
      onClick={handleClick}
      onBlur={() => setIsSelected(false)}
      tabIndex={0}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        width: '84px',
        padding: '6px 4px',
        cursor: 'pointer',
        userSelect: 'none',
        outline: 'none',
        borderRadius: '2px',
        background: isSelected ? 'rgba(0, 0, 128, 0.45)' : 'transparent',
      }}
    >
      <div
        style={{
          width: '42px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: isSelected ? 'drop-shadow(0 0 2px #fff)' : 'none',
        }}
      >
        {icon}
      </div>

      <span
        style={{
          fontSize: '11px',
          fontWeight: 600,
          color: '#ffffff',
          textAlign: 'center',
          textShadow: '1px 1px 2px #000000',
          lineHeight: '1.2',
          wordBreak: 'break-word',
          padding: '1px 4px',
          backgroundColor: isSelected ? 'var(--accent-color)' : 'transparent',
          border: isSelected ? '1px dotted #ffffff' : '1px solid transparent',
        }}
      >
        {label}
      </span>
    </div>
  );
};
