import React from 'react';
import { sound } from '../../utils/sound';
import { Compass, HelpCircle, Laptop, MousePointer, Music, X } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="win98-box-outset"
        style={{
          width: '520px',
          maxWidth: '95vw',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
            color: '#fff',
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: 700,
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HelpCircle size={15} />
            <span>Petunjuk Navigasi 3D & Virtual OS</span>
          </div>
          <button
            className="win98-btn"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            style={{ width: '18px', height: '16px', padding: 0 }}
          >
            <X size={12} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '12px', lineHeight: '1.6' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Compass size={24} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '13px' }}>1. Navigasi Kamera 3D Ruangan (Room View)</strong>
              <p style={{ margin: '4px 0 0 0', color: '#444' }}>
                Klik & geser mouse (drag) untuk memutar sudut pandang ruang kerja retro. Gunakan scroll wheel mouse untuk memperbesar (zoom in/out).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Laptop size={24} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '13px' }}>2. Masuk ke Layar Komputer (Screen Focus)</strong>
              <p style={{ margin: '4px 0 0 0', color: '#444' }}>
                Klik langsung pada tabung monitor CRT atau klik tombol <strong>"Masuk Layar"</strong> di panel atas. Kamera akan meluncur halus mendekati layar monitor virtual.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <MousePointer size={24} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '13px' }}>3. Interaksi Desktop Retro</strong>
              <p style={{ margin: '4px 0 0 0', color: '#444' }}>
                Buka aplikasi portofolio (About Me, Projects, Tech Skills, Contact Mail, Bash Terminal, Lofi Player). Setiap jendela dapat digeser (drag), di-minimize, dan di-maximize.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Music size={24} color="#9333ea" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '13px' }}>4. Audio & Lofi Beats</strong>
              <p style={{ margin: '4px 0 0 0', color: '#444' }}>
                Dilengkapi efek audio ketikan keyboard mekanik, klik switch CRT, dan pemutar musik synthesizer ambient santai.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'right', marginTop: '6px' }}>
            <button
              className="win98-btn"
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              style={{ padding: '6px 20px', fontWeight: 700 }}
            >
              Mengerti & Lanjutkan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
