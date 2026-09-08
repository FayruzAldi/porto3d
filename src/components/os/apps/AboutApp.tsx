import { PERSONAL_INFO } from '../../../data/portfolioData';
import { sound } from '../../../utils/sound';
import { usePortfolioStore } from '../../../stores/portfolioStore';
import { Briefcase, Code, Download, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const AboutApp = () => {
  const { openWindow } = usePortfolioStore();

  const handleResumeClick = () => {
    sound.playClick();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
    alert('Resume CV: Andrew Garfield - Full Stack & 3D Developer (Downloaded)');
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto' }}>
      {/* Top Banner (Image @3: 3D Wireframe Landscape) */}
      <div
        style={{
          width: '100%',
          height: '100px',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
          border: '2px solid #808080',
          boxShadow: 'inset 1px 1px 0px #000000, inset -1px -1px 0px #ffffff',
          flexShrink: 0,
        }}
      >
        <img
          src="/banner.jpg"
          alt="3D Wireframe Banner"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 4,
            right: 6,
            background: 'rgba(0,0,0,0.75)',
            color: '#00ff66',
            fontFamily: 'monospace',
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '2px',
          }}
        >
          ~/GarfieldAndrew $
        </div>
      </div>

      {/* Header Profile Section */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', borderBottom: '2px groove #808080', paddingBottom: '14px' }}>
        {/* Profile Avatar (Image @1: Formal Portrait) */}
        <div style={{
          width: '74px',
          height: '74px',
          borderRadius: '4px',
          overflow: 'hidden',
          border: '2px solid #808080',
          boxShadow: 'inset 1px 1px 0px #ffffff, inset -1px -1px 0px #000000',
          flexShrink: 0,
          background: '#000000',
        }}>
          <img
            src="/andrew-garfield.jpg"
            alt={PERSONAL_INFO.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 15%',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700, margin: 0 }}>{PERSONAL_INFO.name}</h2>
            <span style={{ 
              fontSize: '10px', 
              background: '#008000', 
              color: '#ffffff', 
              padding: '2px 6px', 
              borderRadius: '2px', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '4px',
              fontFamily: 'var(--font-mono)' 
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#00ff00', display: 'inline-block' }}></span>
              AVAILABLE FOR HIRE
            </span>
          </div>

          <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: 'var(--accent-color)' }}>
            {PERSONAL_INFO.role}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#555555' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={12} /> {PERSONAL_INFO.location}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Briefcase size={12} /> {PERSONAL_INFO.experienceYears}
            </span>
          </div>
        </div>
      </div>

      {/* Bio text */}
      <div className="win98-box-inset" style={{ padding: '12px', fontSize: '12px', lineHeight: '1.6' }}>
        <p style={{ margin: 0, marginBottom: '8px' }}>
          {PERSONAL_INFO.bio}
        </p>
        <p style={{ margin: 0, color: '#444444' }}>
          Fokus utama: <strong>Modern Web App</strong>, <strong>Interactive 3D WebGL (Three.js/R3F)</strong>, dan arsitektur frontend performa tinggi. Saya selalu bersemangat mengubah ide kompleks menjadi produk digital interaktif yang memukau pengguna.
        </p>
      </div>

      {/* Highlights / Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        <div className="win98-box-outset" style={{ padding: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-color)' }}>15+</div>
          <div style={{ fontSize: '10px', color: '#666666' }}>Projects Built</div>
        </div>
        <div className="win98-box-outset" style={{ padding: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-color)' }}>3+</div>
          <div style={{ fontSize: '10px', color: '#666666' }}>Years Experience</div>
        </div>
        <div className="win98-box-outset" style={{ padding: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--accent-color)' }}>100%</div>
          <div style={{ fontSize: '10px', color: '#666666' }}>Passion & Quality</div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '10px', marginTop: 'auto', paddingTop: '8px', flexWrap: 'wrap' }}>
        <button 
          className="win98-btn"
          onClick={() => openWindow('projects')}
          style={{ flex: 1, padding: '8px 12px' }}
        >
          <Sparkles size={14} /> Lihat Proyek Karya
        </button>
        <button 
          className="win98-btn"
          onClick={() => openWindow('skills')}
          style={{ flex: 1, padding: '8px 12px' }}
        >
          <Code size={14} /> Keahlian Teknis
        </button>
        <button 
          className="win98-btn"
          onClick={handleResumeClick}
          style={{ padding: '8px 12px' }}
        >
          <Download size={14} /> Unduh CV
        </button>
      </div>
    </div>
  );
};
