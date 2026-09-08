import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../stores/portfolioStore';
import { 
  soundCloudManager, 
  SOUNDCLOUD_PRESETS 
} from '../../../utils/soundCloudManager';
import type { 
  PresetPlaylist, 
  SoundTrackInfo 
} from '../../../utils/soundCloudManager';
import { sound } from '../../../utils/sound';
import { 
  Disc3, 
  FastForward, 
  Pause, 
  Play, 
  Rewind, 
  Volume2, 
  VolumeX, 
  Radio, 
  ExternalLink 
} from 'lucide-react';

export const MusicPlayerApp = () => {
  const { isLofiPlaying, toggleLofi } = usePortfolioStore();
  const [bars, setBars] = useState<number[]>([40, 60, 20, 80, 50, 90, 30, 70, 45, 85, 60, 35]);
  const [track, setTrack] = useState<SoundTrackInfo>(soundCloudManager.currentTrack);
  const [activePlaylist, setActivePlaylist] = useState<PresetPlaylist>(soundCloudManager.activePlaylist);
  const [volume, setVolume] = useState<number>(soundCloudManager.volume);

  useEffect(() => {
    const unsubscribe = soundCloudManager.subscribe(() => {
      setTrack({ ...soundCloudManager.currentTrack });
      setActivePlaylist(soundCloudManager.activePlaylist);
      setVolume(soundCloudManager.volume);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    let interval: number;
    if (isLofiPlaying) {
      interval = window.setInterval(() => {
        setBars(prev => prev.map(() => Math.floor(Math.random() * 80) + 20));
      }, 100);
    } else {
      setBars([15, 20, 10, 25, 15, 30, 10, 20, 15, 25, 20, 10]);
    }
    return () => clearInterval(interval);
  }, [isLofiPlaying]);

  const handleTogglePlay = () => {
    toggleLofi();
  };

  const handleNext = () => {
    sound.playClick();
    soundCloudManager.next();
  };

  const handlePrev = () => {
    sound.playClick();
    soundCloudManager.prev();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    soundCloudManager.setVolume(val);
  };

  const handleSelectPlaylist = (preset: PresetPlaylist) => {
    sound.playClick();
    soundCloudManager.setPlaylist(preset);
  };

  return (
    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', overflowY: 'auto' }}>
      {/* Retro Winamp Display with SoundCloud branding */}
      <div 
        className="win98-box-inset"
        style={{ 
          background: '#0a0f1d', 
          padding: '12px', 
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          border: '2px solid #1e293b'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Disc3 
              size={20} 
              color="#ff5500" 
              style={{ 
                animation: isLofiPlaying ? 'spin 2.5s linear infinite' : 'none' 
              }} 
            />
            <div style={{ color: '#ff5500', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.5px' }}>
              {isLofiPlaying ? '▶ PLAYING • SOUNDCLOUD' : '❚❚ PAUSED / READY'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ 
              background: '#ff5500', 
              color: '#fff', 
              fontSize: '9px', 
              fontWeight: 800, 
              padding: '2px 6px', 
              borderRadius: '2px',
              fontFamily: 'var(--font-mono)'
            }}>
              SOUNDCLOUD
            </span>
          </div>
        </div>

        {/* Track info with artwork if available */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '2px' }}>
          {track.artworkUrl ? (
            <img 
              src={track.artworkUrl} 
              alt="Track Artwork" 
              style={{ width: '40px', height: '40px', borderRadius: '3px', objectFit: 'cover', border: '1px solid #334155' }}
            />
          ) : (
            <div style={{ width: '40px', height: '40px', borderRadius: '3px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Radio size={20} color="#ff5500" />
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: '#f8fafc', fontSize: '13px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {track.title || activePlaylist.name}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {track.artist} • {activePlaylist.genre}
            </div>
          </div>
        </div>

        {/* Audio Visualizer Spectrum */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '36px', marginTop: '2px', padding: '2px 0' }}>
          {bars.map((height, idx) => (
            <div 
              key={idx}
              style={{ 
                flex: 1, 
                height: `${height}%`, 
                background: `linear-gradient(to top, #ff5500 0%, #f59e0b 60%, #10b981 100%)`,
                borderRadius: '1px',
                transition: 'height 0.1s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Playback Controls & Volume */}
      <div className="win98-box-outset" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button className="win98-btn" onClick={handlePrev} style={{ padding: '6px 10px' }} title="Previous Track">
            <Rewind size={14} />
          </button>
          <button 
            className="win98-btn" 
            onClick={handleTogglePlay} 
            style={{ 
              padding: '6px 16px', 
              fontWeight: 700, 
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isLofiPlaying ? '#fed7aa' : undefined
            }}
          >
            {isLofiPlaying ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Play</>}
          </button>
          <button className="win98-btn" onClick={handleNext} style={{ padding: '6px 10px' }} title="Next Track">
            <FastForward size={14} />
          </button>
        </div>

        {/* Volume Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '130px' }}>
          {volume === 0 ? <VolumeX size={15} color="#64748b" /> : <Volume2 size={15} color="#ff5500" />}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} 
            onChange={handleVolumeChange}
            style={{ width: '80px', accentColor: '#ff5500', cursor: 'pointer' }}
            title={`Volume: ${volume}%`}
          />
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', minWidth: '24px' }}>{volume}%</span>
        </div>
      </div>

      {/* Select Stream / Radio Channel */}
      <div className="win98-box-outset" style={{ padding: '10px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Radio size={13} color="#ff5500" />
          Pilih Saluran Musik (SoundCloud):
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {SOUNDCLOUD_PRESETS.map((preset) => {
            const isSelected = activePlaylist.id === preset.id;
            return (
              <button
                key={preset.id}
                className="win98-btn"
                onClick={() => handleSelectPlaylist(preset)}
                style={{
                  textAlign: 'left',
                  padding: '6px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: isSelected ? '#fed7aa' : '#ece9d8',
                  borderColor: isSelected ? '#ea580c' : undefined,
                  fontWeight: isSelected ? 700 : 400
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: isSelected ? '#c2410c' : '#1e293b' }}>
                    {preset.name}
                  </div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>
                    {preset.genre}
                  </div>
                </div>
                {isSelected && (
                  <span style={{ fontSize: '10px', color: '#ea580c', fontWeight: 700 }}>
                    ● ACTIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Info footer */}
      <div style={{ fontSize: '10px', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px' }}>
        <span>Powered by SoundCloud Widget API</span>
        <a 
          href={activePlaylist.url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#ff5500', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}
        >
          Buka di SoundCloud <ExternalLink size={10} />
        </a>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
