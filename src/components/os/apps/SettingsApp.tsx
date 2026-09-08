import { usePortfolioStore } from '../../../stores/portfolioStore';
import { sound } from '../../../utils/sound';
import type { OSTheme } from '../../../types/portfolio';
import { Monitor, Palette } from 'lucide-react';

export const SettingsApp = () => {
  const { 
    theme, 
    setTheme, 
    scanlinesEnabled, 
    setScanlinesEnabled, 
    soundEnabled, 
    setSoundEnabled,
    useCustomModel,
    setUseCustomModel,
    setCameraMode
  } = usePortfolioStore();

  const themes: { id: OSTheme; label: string; desc: string }[] = [
    { id: 'classic', label: 'Classic Win98', desc: 'Teal desktop, classic silver 3D bevels & navy titlebar' },
    { id: 'cyberpunk', label: 'Cyberpunk 2077', desc: 'Dark neon green matrix aesthetic & glowing accents' },
    { id: 'amber', label: 'Vintage Amber CRT', desc: 'Monochrome warm phosphor terminal vibes' },
    { id: 'vaporwave', label: 'Vaporwave Sunset', desc: 'Purple, cyan, & magenta synthwave dream' },
  ];

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto' }}>
      {/* Theme selection */}
      <div className="win98-box-outset" style={{ padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Palette size={16} color="var(--accent-color)" />
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700 }}>Tema Tampilan (Visual Themes)</h4>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
          {themes.map(t => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={theme === t.id ? 'win98-box-inset' : 'win98-btn'}
              style={{
                textAlign: 'left',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                border: theme === t.id ? '2px solid var(--accent-color)' : undefined
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '11px' }}>{t.label}</span>
              <span style={{ fontSize: '9px', opacity: 0.8 }}>{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Screen & Audio Toggles */}
      <div className="win98-box-outset" style={{ padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <Monitor size={16} color="var(--accent-color)" />
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700 }}>Efek Display & Audio</h4>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', cursor: 'pointer' }}>
            <span>Efek Scanlines Tabung CRT:</span>
            <input 
              type="checkbox" 
              checked={scanlinesEnabled} 
              onChange={(e) => setScanlinesEnabled(e.target.checked)}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', cursor: 'pointer' }}>
            <span>Sound Effects & Audio Clacks:</span>
            <input 
              type="checkbox" 
              checked={soundEnabled} 
              onChange={(e) => setSoundEnabled(e.target.checked)}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', cursor: 'pointer' }}>
            <span>Load Custom Model (.glb di /models/scene.glb):</span>
            <input 
              type="checkbox" 
              checked={useCustomModel} 
              onChange={(e) => setUseCustomModel(e.target.checked)}
            />
          </label>
        </div>
      </div>

      {/* Quick Camera Reset */}
      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <button 
          className="win98-btn"
          onClick={() => {
            sound.playClick();
            setCameraMode('room');
          }}
          style={{ flex: 1, padding: '8px' }}
        >
          📷 Keluar ke Room View
        </button>
        <button 
          className="win98-btn"
          onClick={() => {
            sound.playClick();
            setCameraMode('screen');
          }}
          style={{ flex: 1, padding: '8px' }}
        >
          🖥️ Zoom ke Layar CRT
        </button>
      </div>
    </div>
  );
};
