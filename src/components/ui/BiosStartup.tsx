import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../../utils/sound';

interface BiosStartupProps {
  onComplete?: () => void;
}

interface ResourceItem {
  name: string;
  percent: number;
}

const RESOURCE_LIST: ResourceItem[] = [
  { name: 'biosRomCheck', percent: 12 },
  { name: 'videoAdapterVGA', percent: 24 },
  { name: 'keyboardController', percent: 35 },
  { name: 'keyboardKeydown2', percent: 42 },
  { name: 'mouseUp', percent: 51 },
  { name: 'keyboardKeydown3', percent: 58 },
  { name: 'keyboardKeydown5', percent: 64 },
  { name: 'keyboardKeydown1', percent: 71 },
  { name: 'keyboardKeydown6', percent: 77 },
  { name: 'keyboardKeydown4', percent: 84 },
  { name: 'ccType', percent: 89 },
  { name: 'win98Kernel', percent: 94 },
  { name: 'retroRoom3D', percent: 100 },
];

export const BiosStartup: React.FC<BiosStartupProps> = ({ onComplete }) => {
  // Phase: 'bios' -> 'prompt' -> 'finished'
  const [phase, setPhase] = useState<'bios' | 'prompt' | 'finished'>('bios');
  const [ramCount, setRamCount] = useState(0);
  const [ramDone, setRamDone] = useState(false);
  const [loadedIndex, setLoadedIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Format today's date MM/DD/YYYY
  const todayStr = useRef(
    new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    })
  ).current;

  // RAM counting effect
  useEffect(() => {
    if (phase !== 'bios') return;

    let current = 0;
    const target = 14000;
    const interval = setInterval(() => {
      current += 1400;
      if (current >= target) {
        current = target;
        setRamCount(target);
        setRamDone(true);
        clearInterval(interval);
      } else {
        setRamCount(current);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [phase]);

  // Resource items appearing sequentially once RAM is verified
  useEffect(() => {
    if (!ramDone || phase !== 'bios') return;

    if (loadedIndex < RESOURCE_LIST.length) {
      const timer = setTimeout(() => {
        setLoadedIndex((prev) => prev + 1);
      }, 110);
      return () => clearTimeout(timer);
    } else {
      // Completed loading all resources -> transition to Start Prompt (Image @3)
      const transitionTimer = setTimeout(() => {
        setPhase('prompt');
      }, 600);
      return () => clearTimeout(transitionTimer);
    }
  }, [ramDone, loadedIndex, phase]);

  // Handle ESC or click to skip RAM test / BIOS
  const handleSkipBios = () => {
    if (phase === 'bios') {
      setRamCount(14000);
      setRamDone(true);
      setLoadedIndex(RESOURCE_LIST.length);
      setPhase('prompt');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (phase === 'bios' && (e.key === 'Escape' || e.key === 'Delete' || e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        handleSkipBios();
      } else if (phase === 'prompt' && e.key === 'Enter') {
        e.preventDefault();
        handleStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase]);

  // Handle Start Click (Image @3)
  const handleStart = () => {
    sound.playBootChime();
    setIsFadingOut(true);
    setTimeout(() => {
      setPhase('finished');
      onComplete?.();
    }, 600);
  };

  if (phase === 'finished') return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 999999,
        backgroundColor: '#000000',
        color: '#ffffff',
        fontFamily: "'Courier New', Courier, 'Lucida Console', Monaco, monospace",
        userSelect: 'none',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.6s ease-in-out',
      }}
    >
      {/* ----------------- PHASE 1: BIOS BOOT SCREEN (Gambar @2) ----------------- */}
      {phase === 'bios' && (
        <div
          onClick={handleSkipBios}
          style={{
            flex: 1,
            padding: '36px 48px',
            fontSize: '15px',
            lineHeight: 1.6,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
          }}
        >
          <div>
            {/* BIOS Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '28px',
                maxWidth: '820px',
              }}
            >
              <div>
                <div>Garfield,</div>
                <div>Andrew Inc.</div>
              </div>
              <div>
                <div>Released: 01/13/2000</div>
                <div>AGBIOS (C)2000 Andrew Garfield Inc.,</div>
              </div>
            </div>

            {/* System Info */}
            <div style={{ marginBottom: '24px' }}>
              <div>HSP S13 2000-2026 Special UC131S</div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div>HSP Showcase(tm) XX 113</div>
              <div>
                Checking RAM : {ramCount} {ramDone ? 'OK' : ''}
              </div>
            </div>

            {/* Resource Loading Lines */}
            {ramDone && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ marginBottom: '12px' }}>
                  LOADING RESOURCES ({loadedIndex}/{RESOURCE_LIST.length}).
                </div>

                <div style={{ paddingLeft: '24px' }}>
                  {RESOURCE_LIST.slice(0, loadedIndex).map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        maxWidth: '480px',
                        justifyContent: 'space-between',
                        fontFamily: 'inherit',
                      }}
                    >
                      <span>Loaded {item.name}</span>
                      <span>... {item.percent}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Prompt */}
          <div style={{ marginTop: '32px', color: '#e2e8f0', fontSize: '14px' }}>
            <div>
              Press <strong style={{ color: '#ffffff' }}>DEL</strong> to enter SETUP ,{' '}
              <strong style={{ color: '#ffffff' }}>ESC</strong> to skip memory test
            </div>
            <div>{todayStr}</div>
          </div>
        </div>
      )}

      {/* ----------------- PHASE 2: RETRO START BOX SCREEN (Gambar @3) ----------------- */}
      {phase === 'prompt' && (
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          {/* Centered Double-Bordered Retro Box */}
          <div
            style={{
              border: '4px double #8a8a8a',
              outline: '1px solid #333333',
              outlineOffset: '4px',
              padding: '48px 64px',
              minWidth: '540px',
              maxWidth: '92vw',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '24px',
              backgroundColor: '#000000',
              boxShadow: '0 0 50px rgba(0,0,0,0.9)',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: '22px',
                  fontWeight: 400,
                  margin: '0 0 12px 0',
                  letterSpacing: '1px',
                  fontFamily: 'inherit',
                  color: '#ffffff',
                }}
              >
                Andrew Garfield Portfolio Showcase 2026
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: '16px',
                  color: '#cccccc',
                  fontFamily: 'inherit',
                  letterSpacing: '0.5px',
                }}
              >
                Click start to begin
              </p>
            </div>

            {/* Centered Start Button */}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <button
                id="btn-bios-start"
                onClick={handleStart}
                style={{
                  background: 'transparent',
                  color: '#ffffff',
                  border: '2px solid #8a8a8a',
                  fontFamily: 'inherit',
                  fontSize: '18px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  padding: '10px 36px',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'all 0.15s ease-in-out',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.borderColor = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.borderColor = '#8a8a8a';
                }}
              >
                START
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiosStartup;
