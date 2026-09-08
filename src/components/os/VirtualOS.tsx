import { usePortfolioStore } from '../../stores/portfolioStore';
import { WindowFrame } from './WindowFrame';
import { DesktopIcon } from './DesktopIcon';
import { Taskbar } from './Taskbar';
import { AboutApp } from './apps/AboutApp';
import { ProjectsApp } from './apps/ProjectsApp';
import { SkillsApp } from './apps/SkillsApp';
import { ContactApp } from './apps/ContactApp';
import { TerminalApp } from './apps/TerminalApp';
import { MusicPlayerApp } from './apps/MusicPlayerApp';
import { SettingsApp } from './apps/SettingsApp';
import { GuideApp } from './apps/GuideApp';
import {
  RetroMyComputerIcon,
  RetroFolderProjectsIcon,
  RetroProgramsIcon,
  RetroMailIcon,
  RetroTerminalIcon,
  RetroCdMusicIcon,
  RetroNotepadIcon,
  RetroSettingsIcon,
} from './RetroIcons';

interface VirtualOSProps {
  isEmbedded?: boolean;
}

export const VirtualOS = ({ isEmbedded = false }: VirtualOSProps) => {
  const { windows, openWindow, theme, scanlinesEnabled } = usePortfolioStore();

  return (
    <div
      className={`theme-${theme} crt-screen-overlay ${scanlinesEnabled ? 'crt-scanlines' : ''}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-desktop)',
        backgroundImage: "radial-gradient(ellipse at 50% 20%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.75) 100%), url('/bg-pattern.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: 'var(--font-sans)',
        fontSize: isEmbedded ? '12px' : '13px',
      }}
    >
      {/* Desktop Workspace Grid for Icons */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          bottom: '38px',
          right: '12px',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          gap: '8px 12px',
          pointerEvents: 'none',
        }}
      >
        {/* Desktop Icons with Official Windows 98 Pixel Art */}
        <div style={{ pointerEvents: 'auto' }}>
          <DesktopIcon
            label="My Computer"
            icon={<RetroMyComputerIcon size={34} />}
            onClick={() => openWindow('about')}
          />
        </div>

        <div style={{ pointerEvents: 'auto' }}>
          <DesktopIcon
            label="Projects"
            icon={<RetroFolderProjectsIcon size={34} />}
            onClick={() => openWindow('projects')}
          />
        </div>

        <div style={{ pointerEvents: 'auto' }}>
          <DesktopIcon
            label="Tech Skills"
            icon={<RetroProgramsIcon size={34} />}
            onClick={() => openWindow('skills')}
          />
        </div>

        <div style={{ pointerEvents: 'auto' }}>
          <DesktopIcon
            label="Contact Me"
            icon={<RetroMailIcon size={34} />}
            onClick={() => openWindow('contact')}
          />
        </div>

        <div style={{ pointerEvents: 'auto' }}>
          <DesktopIcon
            label="MS-DOS"
            icon={<RetroTerminalIcon size={34} />}
            onClick={() => openWindow('terminal')}
          />
        </div>

        <div style={{ pointerEvents: 'auto' }}>
          <DesktopIcon
            label="CD Player"
            icon={<RetroCdMusicIcon size={34} />}
            onClick={() => openWindow('music')}
          />
        </div>

        <div style={{ pointerEvents: 'auto' }}>
          <DesktopIcon
            label="3D Guide"
            icon={<RetroNotepadIcon size={34} />}
            onClick={() => openWindow('guide')}
          />
        </div>

        <div style={{ pointerEvents: 'auto' }}>
          <DesktopIcon
            label="Control Panel"
            icon={<RetroSettingsIcon size={34} />}
            onClick={() => openWindow('settings')}
          />
        </div>
      </div>

      {/* Windows Layer */}
      <WindowFrame windowState={windows.about} icon={<RetroMyComputerIcon size={16} />}>
        <AboutApp />
      </WindowFrame>

      <WindowFrame windowState={windows.projects} icon={<RetroFolderProjectsIcon size={16} />}>
        <ProjectsApp />
      </WindowFrame>

      <WindowFrame windowState={windows.skills} icon={<RetroProgramsIcon size={16} />}>
        <SkillsApp />
      </WindowFrame>

      <WindowFrame windowState={windows.contact} icon={<RetroMailIcon size={16} />}>
        <ContactApp />
      </WindowFrame>

      <WindowFrame windowState={windows.terminal} icon={<RetroTerminalIcon size={16} />}>
        <TerminalApp />
      </WindowFrame>

      <WindowFrame windowState={windows.music} icon={<RetroCdMusicIcon size={16} />}>
        <MusicPlayerApp />
      </WindowFrame>

      <WindowFrame windowState={windows.guide} icon={<RetroNotepadIcon size={16} />}>
        <GuideApp />
      </WindowFrame>

      <WindowFrame windowState={windows.settings} icon={<RetroSettingsIcon size={16} />}>
        <SettingsApp />
      </WindowFrame>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};
