import React, { useState, useRef, useEffect } from 'react';
import type { WindowState } from '../../types/portfolio';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { Minus, Square, X } from 'lucide-react';

interface WindowFrameProps {
  windowState: WindowState;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ windowState, children, icon }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, setWindowPosition, isDirectOSFullscreen } = usePortfolioStore();
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDownTitle = (e: React.MouseEvent) => {
    if (windowState.isMaximized) return;
    setIsDragging(true);
    focusWindow(windowState.id);
    dragOffset.current = {
      x: e.clientX - windowState.position.x,
      y: e.clientY - windowState.position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const maxX = isDirectOSFullscreen ? Math.max(200, window.innerWidth - 100) : 680;
      const maxY = isDirectOSFullscreen ? Math.max(200, window.innerHeight - 80) : 510;
      const newX = Math.max(0, Math.min(maxX, e.clientX - dragOffset.current.x));
      const newY = Math.max(0, Math.min(maxY, e.clientY - dragOffset.current.y));
      setWindowPosition(windowState.id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, windowState.id, setWindowPosition]);

  if (!windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const { position, size, isMaximized, zIndex, title } = windowState;

  return (
    <div
      onClick={() => focusWindow(windowState.id)}
      className="win98-box-outset"
      style={{
        position: 'absolute',
        left: isMaximized ? 0 : `${position.x}px`,
        top: isMaximized ? 0 : `${position.y}px`,
        width: isMaximized ? '100%' : `${size.width}px`,
        height: isMaximized ? 'calc(100% - 32px)' : `${size.height}px`,
        zIndex,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '4px 4px 12px rgba(0,0,0,0.3)',
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
    >
      {/* Title Bar */}
      <div
        onMouseDown={handleMouseDownTitle}
        style={{
          background: 'linear-gradient(90deg, var(--title-active-from) 0%, var(--title-active-to) 100%)',
          color: 'var(--title-text)',
          padding: '4px 6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: isMaximized ? 'default' : 'move',
          userSelect: 'none',
          fontSize: '12px',
          fontWeight: 700,
          fontFamily: 'var(--font-sans)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
          <span>{title}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(windowState.id);
            }}
            className="win98-btn"
            style={{ width: '18px', height: '16px', padding: 0 }}
            title="Minimize"
          >
            <Minus size={10} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(windowState.id);
            }}
            className="win98-btn"
            style={{ width: '18px', height: '16px', padding: 0 }}
            title="Maximize"
          >
            <Square size={9} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(windowState.id);
            }}
            className="win98-btn"
            style={{ width: '18px', height: '16px', padding: 0, fontWeight: 900 }}
            title="Close"
          >
            <X size={11} />
          </button>
        </div>
      </div>

      {/* Window Body Content */}
      <div style={{ flex: 1, overflow: 'hidden', background: 'var(--win-bg)', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
};
