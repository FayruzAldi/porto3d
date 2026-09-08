import { usePortfolioStore } from '../../stores/portfolioStore';
import { VirtualOS } from '../os/VirtualOS';
import { Minimize2 } from 'lucide-react';
import { sound } from '../../utils/sound';

export const DirectOSModal = () => {
  const { isDirectOSFullscreen, setDirectOSFullscreen } = usePortfolioStore();

  if (!isDirectOSFullscreen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99990,
        backgroundColor: '#000000',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          height: '32px',
          background: '#1e293b',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          fontSize: '11px',
          zIndex: 99995,
        }}
      >
        <span style={{ fontWeight: 600 }}>
          Virtual OS Direct Fullscreen Mode
        </span>
        <button
          className="win98-btn"
          onClick={() => {
            sound.playClick();
            setDirectOSFullscreen(false);
          }}
          style={{ padding: '2px 8px', fontSize: '11px' }}
        >
          <Minimize2 size={12} /> Kembali ke 3D Canvas
        </button>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <VirtualOS isEmbedded={false} />
      </div>
    </div>
  );
};
