import React, { useState } from 'react';
import { PERSONAL_INFO } from '../../../data/portfolioData';
import { sound } from '../../../utils/sound';
import { CheckCircle2, Mail, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactApp = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playClick();
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.5 }
    });
    setIsSent(true);
  };

  const handleReset = () => {
    sound.playClick();
    setForm({ name: '', email: '', subject: '', message: '' });
    setIsSent(false);
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '2px groove #808080', paddingBottom: '8px' }}>
        <Mail size={18} color="var(--accent-color)" />
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700 }}>
          New Message / Inquiries
        </h3>
      </div>

      {isSent ? (
        <div className="win98-box-inset" style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <CheckCircle2 size={40} color="#16a34a" />
          <h4 style={{ margin: 0, fontSize: '15px' }}>Pesan Terkirim Berhasil!</h4>
          <p style={{ margin: 0, fontSize: '12px', color: '#555' }}>
            Terima kasih telah menghubungi, pesan Anda telah diteruskan ke inbox <strong>{PERSONAL_INFO.email}</strong>. Saya akan membalas segera!
          </p>
          <button className="win98-btn" onClick={handleReset} style={{ marginTop: '8px', padding: '6px 16px' }}>
            Kirim Pesan Lain
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600 }}>Nama Lengkap:</label>
            <input 
              type="text"
              required
              className="win98-box-inset"
              placeholder="e.g. Budi Santoso"
              value={form.name}
              onChange={(e) => {
                sound.playKeyClack();
                setForm({ ...form, name: e.target.value });
              }}
              style={{ padding: '6px 8px', fontSize: '12px', border: 'none', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600 }}>Email Anda:</label>
            <input 
              type="email"
              required
              className="win98-box-inset"
              placeholder="e.g. budi@company.com"
              value={form.email}
              onChange={(e) => {
                sound.playKeyClack();
                setForm({ ...form, email: e.target.value });
              }}
              style={{ padding: '6px 8px', fontSize: '12px', border: 'none', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600 }}>Subjek:</label>
            <input 
              type="text"
              required
              className="win98-box-inset"
              placeholder="e.g. Peluang Kerjasama Web 3D"
              value={form.subject}
              onChange={(e) => {
                sound.playKeyClack();
                setForm({ ...form, subject: e.target.value });
              }}
              style={{ padding: '6px 8px', fontSize: '12px', border: 'none', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <label style={{ fontSize: '11px', fontWeight: 600 }}>Pesan:</label>
            <textarea 
              rows={4}
              required
              className="win98-box-inset"
              placeholder="Tuliskan pesan atau penawaran proyek Anda di sini..."
              value={form.message}
              onChange={(e) => {
                sound.playKeyClack();
                setForm({ ...form, message: e.target.value });
              }}
              style={{ padding: '6px 8px', fontSize: '12px', border: 'none', outline: 'none', resize: 'vertical' }}
            />
          </div>

          <button 
            type="submit" 
            className="win98-btn"
            style={{ padding: '8px 16px', marginTop: '6px', fontWeight: 700 }}
          >
            <Send size={13} /> Kirim Pesan (Transmit)
          </button>
        </form>
      )}

      {/* Social links */}
      <div style={{ marginTop: 'auto', borderTop: '1px solid #aaa', paddingTop: '10px' }}>
        <div style={{ fontSize: '11px', fontWeight: 600, marginBottom: '6px', color: '#555' }}>
          Jalur Komunikasi Langsung:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a 
            href={PERSONAL_INFO.github} 
            target="_blank" 
            rel="noreferrer"
            className="win98-btn"
            style={{ textDecoration: 'none', fontSize: '11px' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a 
            href={PERSONAL_INFO.linkedin} 
            target="_blank" 
            rel="noreferrer"
            className="win98-btn"
            style={{ textDecoration: 'none', fontSize: '11px' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </a>
          <a 
            href={`mailto:${PERSONAL_INFO.email}`} 
            className="win98-btn"
            style={{ textDecoration: 'none', fontSize: '11px' }}
          >
            <Mail size={12} /> Direct Email
          </a>
        </div>
      </div>
    </div>
  );
};
