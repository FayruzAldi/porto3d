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
    setCustomModelUrl,
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

          <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '8px', marginTop: '4px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', color: '#1e293b' }}>
              Pilihan Model Ruangan 3D:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="modelSource" 
                  checked={!useCustomModel} 
                  onChange={() => setUseCustomModel(false)}
                />
                <span>Workstation Retro (File GLB: <code>retrokomputer.glb</code>)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="modelSource" 
                  checked={useCustomModel} 
                  onChange={() => setUseCustomModel(true)}
                />
                <span>Procedural Computer (Mode Google AI Studio - Tanpa File GLB)</span>
              </label>
            </div>

            <div style={{ marginTop: '8px', padding: '6px', background: '#f8fafc', border: '1px dashed #94a3b8', borderRadius: '3px' }}>
              <label style={{ fontSize: '10px', display: 'block', fontWeight: 600, marginBottom: '4px' }}>
                📁 Muat File .glb dari Komputer Anda:
              </label>
              <input 
                type="file" 
                accept=".glb,.gltf" 
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const blobUrl = URL.createObjectURL(file);
                    setUseCustomModel(false);
                    setCustomModelUrl(blobUrl);
                  }
                }}
                style={{ fontSize: '10px', width: '100%' }}
              />
              <span style={{ fontSize: '9px', color: '#64748b', display: 'block', marginTop: '2px' }}>
                Pilih file <code>retrokomputer.glb</code> langsung dari penyimpanan lokal.
              </span>
            </div>
          </div>
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
