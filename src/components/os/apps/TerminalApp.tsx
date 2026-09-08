import React, { useState, useRef, useEffect } from 'react';
import { PERSONAL_INFO, PROJECTS } from '../../../data/portfolioData';
import { sound } from '../../../utils/sound';
import { usePortfolioStore } from '../../../stores/portfolioStore';
import type { OSTheme } from '../../../types/portfolio';

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalApp = () => {
  const { setTheme, openWindow, closeWindow } = usePortfolioStore();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div>
          <div style={{ color: '#4ade80', fontWeight: 700 }}>
            ⚡ GarfieldOS Bash Terminal [Version 5.2.15-release]
          </div>
          <div style={{ color: '#94a3b8' }}>
            Ketik <span style={{ color: '#38bdf8' }}>help</span> untuk melihat daftar perintah yang tersedia.
          </div>
        </div>
      ),
    },
  ]);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Safe internal auto-scroll without disturbing browser window or 3D canvas
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Safe initial focus without scrolling parent containers
  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    sound.playClick();
    const parts = cmd.toLowerCase().split(' ');
    const main = parts[0];
    const arg = parts[1];

    let output: React.ReactNode = null;

    switch (main) {
      case 'help':
        output = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#cbd5e1' }}>
            <div><strong>Available Commands:</strong></div>
            <div><span style={{ color: '#38bdf8' }}>about</span> - Menampilkan profil dan bio Andrew Garfield</div>
            <div><span style={{ color: '#38bdf8' }}>projects</span> - Daftar portofolio dan karya terbaik</div>
            <div><span style={{ color: '#38bdf8' }}>skills</span> - Analisis tech stack dan keahlian</div>
            <div><span style={{ color: '#38bdf8' }}>contact</span> - Info kontak & link sosial</div>
            <div><span style={{ color: '#38bdf8' }}>gui [app]</span> - Buka jendela GUI (about, projects, skills, contact, music)</div>
            <div><span style={{ color: '#38bdf8' }}>theme [name]</span> - Ganti tema: classic, cyberpunk, amber, vaporwave</div>
            <div><span style={{ color: '#38bdf8' }}>cat resume.txt</span> - Baca ringkasan resume</div>
            <div><span style={{ color: '#38bdf8' }}>ls / dir</span> - Tampilkan file di direktori home</div>
            <div><span style={{ color: '#38bdf8' }}>date</span> - Tanggal & waktu server saat ini</div>
            <div><span style={{ color: '#38bdf8' }}>whoami</span> - Identitas user sesi saat ini</div>
            <div><span style={{ color: '#38bdf8' }}>clear</span> - Bersihkan layar konsol</div>
            <div><span style={{ color: '#38bdf8' }}>exit</span> - Tutup jendela terminal</div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div style={{ color: '#cbd5e1' }}>
            <div style={{ color: '#38bdf8', fontWeight: 700 }}>{PERSONAL_INFO.name} ({PERSONAL_INFO.role})</div>
            <div>{PERSONAL_INFO.tagline}</div>
            <div style={{ marginTop: '4px' }}>{PERSONAL_INFO.bio}</div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#cbd5e1' }}>
            <div style={{ color: '#38bdf8', fontWeight: 700 }}>Proyek Unggulan:</div>
            {PROJECTS.map((p, idx) => (
              <div key={p.id}>
                [{idx + 1}] <strong style={{ color: '#facc15' }}>{p.title}</strong> ({p.category})
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{p.tagline}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        output = (
          <div style={{ color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div>💻 <strong>Frontend/3D:</strong> React, Next.js, Three.js, R3F, TypeScript, TailwindCSS</div>
            <div>⚙️ <strong>Backend:</strong> Node.js, Express, Python FastAPI, PostgreSQL, Redis, REST/GraphQL</div>
            <div>🛠️ <strong>DevOps & Tools:</strong> Docker, Git, Linux, Blender 3D, Figma</div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div style={{ color: '#cbd5e1' }}>
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} style={{ color: '#38bdf8' }}>{PERSONAL_INFO.email}</a></div>
            <div>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>{PERSONAL_INFO.github}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>{PERSONAL_INFO.linkedin}</a></div>
          </div>
        );
        break;

      case 'ls':
      case 'dir':
        output = (
          <div style={{ color: '#facc15', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <span>resume.txt</span>
            <span>projects.dat</span>
            <span>skills.log</span>
            <span>lofi_chill.mp3</span>
            <span>multivision_setup.bin</span>
          </div>
        );
        break;

      case 'theme':
        if (['classic', 'cyberpunk', 'amber', 'vaporwave'].includes(arg)) {
          setTheme(arg as OSTheme);
          output = <div style={{ color: '#4ade80' }}>Tema berhasil diubah menjadi: {arg}</div>;
        } else {
          output = <div style={{ color: '#f87171' }}>Pilihan tema: classic, cyberpunk, amber, vaporwave</div>;
        }
        break;

      case 'cat':
        if (arg === 'resume.txt') {
          output = (
            <div style={{ color: '#cbd5e1' }}>
              === ANDREW GARFIELD RESUME ===<br />
              Role: Full Stack & Creative 3D Developer<br />
              Status: Available for hire & freelance<br />
              Skills: Three.js, React, Node.js, TypeScript, Python<br />
              Location: Indonesia<br />
              =============================
            </div>
          );
        } else {
          output = <div style={{ color: '#f87171' }}>File not found: {arg || ''}</div>;
        }
        break;

      case 'gui':
        if (['about', 'projects', 'skills', 'contact', 'music'].includes(arg)) {
          openWindow(arg as any);
          output = <div style={{ color: '#4ade80' }}>Membuka jendela GUI: {arg}</div>;
        } else {
          output = <div style={{ color: '#f87171' }}>Jendela tidak ditemukan. Contoh: gui projects</div>;
        }
        break;

      case 'whoami':
        output = <div style={{ color: '#facc15' }}>andrew@garfield (Welcome, Visitor!)</div>;
        break;

      case 'date':
        output = <div style={{ color: '#cbd5e1' }}>{new Date().toString()}</div>;
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'exit':
      case 'quit':
        closeWindow('terminal');
        return;

      case 'sudo':
        output = <div style={{ color: '#f87171' }}>Permission denied: you are already treated like a VIP!</div>;
        break;

      default:
        output = (
          <div style={{ color: '#f87171' }}>
            Command not found: "{cmd}". Ketik <strong>help</strong> untuk petunjuk perintah.
          </div>
        );
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
    setInput('');
  };

  return (
    <div 
      ref={containerRef}
      onClick={() => inputRef.current?.focus({ preventScroll: true })}
      className="terminal-font"
      style={{ 
        backgroundColor: '#0a0f1d', 
        color: '#f8fafc', 
        padding: '14px', 
        height: '100%', 
        overflowY: 'auto',
        fontSize: '12px',
        lineHeight: '1.6',
        cursor: 'text',
      }}
    >
      {history.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', gap: '8px', color: '#38bdf8' }}>
            <span>andrew@garfield:~$</span>
            <span style={{ color: '#ffffff' }}>{item.command}</span>
          </div>
          <div style={{ marginTop: '2px' }}>{item.output}</div>
        </div>
      ))}

      <form onSubmit={handleCommand} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <span style={{ color: '#38bdf8', whiteSpace: 'nowrap' }}>andrew@garfield:~$</span>
        <input 
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            sound.playKeyClack();
            setInput(e.target.value);
          }}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#4ade80',
            fontFamily: 'inherit',
            fontSize: 'inherit',
          }}
        />
      </form>
    </div>
  );
};
