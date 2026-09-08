import { useState, useEffect } from 'react';
import { usePortfolioStore } from '../../../stores/portfolioStore';
import { audioManager, PLAYLIST } from '../../../utils/audioManager';
import type { AudioTrack } from '../../../utils/audioManager';
import { sound } from '../../../utils/sound';
import { 
  Disc3, 
  FastForward, 
  Pause, 
  Play, 
  Rewind, 
  Volume2, 
  VolumeX, 
  Music
} from 'lucide-react';

export const MusicPlayerApp = () => {
  const { isLofiPlaying, toggleLofi } = usePortfolioStore();
  const [bars, setBars] = useState<number[]>([40, 60, 20, 80, 50, 90, 30, 70, 45, 85, 60, 35]);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(audioManager.currentTrack);
  const [volume, setVolume] = useState<number>(audioManager.volume);
  const [currentTime, setCurrentTime] = useState<number>(audioManager.currentTime);
  const [duration, setDuration] = useState<number>(audioManager.duration);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe(() => {
      setCurrentTrack(audioManager.currentTrack);
      setVolume(audioManager.volume);
      setCurrentTime(audioManager.currentTime);
      setDuration(audioManager.duration);
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
    audioManager.next();
  };

  const handlePrev = () => {
    sound.playClick();
    audioManager.prev();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    audioManager.setVolume(val);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    audioManager.seek(val);
  };

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', overflowY: 'auto' }}>
      {/* Retro Winamp Digital Screen */}
      <div 
        className="win98-box-inset"
        style={{ 
          background: '#070b14', 
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
              color="#38bdf8" 
              style={{ 
                animation: isLofiPlaying ? 'spin 2.5s linear infinite' : 'none' 
              }} 
            />
            <div style={{ color: '#38bdf8', fontSize: '11px', fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '0.5px' }}>
              {isLofiPlaying ? '▶ PLAYING (LOFI BEATS)' : '❚❚ PAUSED / READY'}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ 
              color: '#4ade80', 
              fontSize: '11px', 
              fontFamily: 'var(--font-mono)', 
              fontWeight: 700 
            }}>
              {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : currentTrack.durationFormatted}
            </span>
          </div>
        </div>

        {/* Track Title and Artist */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginTop: '2px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '3px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Music size={20} color="#38bdf8" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: '#f8fafc', fontSize: '13px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentTrack.title}
            </div>
            <div style={{ color: '#94a3b8', fontSize: '11px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {currentTrack.artist} • {currentTrack.genre}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progressPercent || 0}
            onChange={handleSeek}
            style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer', height: '4px' }}
          />
        </div>

        {/* Dynamic Spectrum Visualizer */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '32px', marginTop: '2px' }}>
          {bars.map((height, idx) => (
            <div 
              key={idx}
              style={{ 
                flex: 1, 
                height: `${height}%`, 
                background: `linear-gradient(to top, #0284c7 0%, #38bdf8 60%, #4ade80 100%)`,
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
              background: isLofiPlaying ? '#bae6fd' : undefined
            }}
          >
            {isLofiPlaying ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Play Music</>}
          </button>
          <button className="win98-btn" onClick={handleNext} style={{ padding: '6px 10px' }} title="Next Track">
            <FastForward size={14} />
          </button>
        </div>

        {/* Volume Slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '130px' }}>
          {volume === 0 ? <VolumeX size={15} color="#64748b" /> : <Volume2 size={15} color="#0284c7" />}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={volume} 
            onChange={handleVolumeChange}
            style={{ width: '80px', accentColor: '#0284c7', cursor: 'pointer' }}
            title={`Volume: ${volume}%`}
          />
          <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', minWidth: '24px' }}>{volume}%</span>
        </div>
      </div>

      {/* Playlist Selector */}
      <div className="win98-box-outset" style={{ padding: '10px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
          <Music size={13} color="#0284c7" />
          Daftar Putar Lofi (Studio Tracks):
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {PLAYLIST.map((track, idx) => {
            const isSelected = audioManager.currentTrackIndex === idx;
            return (
              <button
                key={track.id}
                className="win98-btn"
                onClick={() => {
                  sound.playClick();
                  audioManager.selectTrack(idx);
                }}
                style={{
                  textAlign: 'left',
                  padding: '6px 10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: isSelected ? '#e0f2fe' : '#ece9d8',
                  borderColor: isSelected ? '#0284c7' : undefined,
                  fontWeight: isSelected ? 700 : 400
                }}
              >
                <div>
                  <div style={{ fontSize: '11px', color: isSelected ? '#0369a1' : '#1e293b' }}>
                    {idx + 1}. {track.title}
                  </div>
                  <div style={{ fontSize: '9px', color: '#64748b' }}>
                    {track.artist} • {track.genre}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '10px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                    {track.durationFormatted}
                  </span>
                  {isSelected && (
                    <span style={{ fontSize: '10px', color: '#0284c7', fontWeight: 700 }}>
                      ● ACTIVE
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
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
