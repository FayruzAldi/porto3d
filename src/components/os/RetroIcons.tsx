import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

/**
 * Authentic Official Windows 98 / Retro Pixel Art Icons
 * Rendered using SVG with shape-rendering="crispEdges" for authentic pixel perfection.
 */

// 1. My Computer / About Me (Beige CRT Monitor + PC Tower)
export const RetroMyComputerIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ shapeRendering: 'crispEdges' }}
    className={className}
  >
    {/* Monitor Case */}
    <rect x="3" y="2" width="22" height="18" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
    <path d="M4 3H24V4H4V3Z" fill="#ffffff" />
    <path d="M3 3H4V19H3V3Z" fill="#ffffff" />
    <path d="M24 3H25V19H24V3Z" fill="#808080" />
    <path d="M4 19H25V20H4V19Z" fill="#808080" />

    {/* Screen Glass */}
    <rect x="6" y="5" width="16" height="12" fill="#000080" stroke="#000000" strokeWidth="1" />
    <rect x="7" y="6" width="14" height="10" fill="#008080" />
    <rect x="9" y="8" width="6" height="4" fill="#ffffff" opacity="0.4" />

    {/* Monitor Base Stand */}
    <path d="M11 20H17V22H11V20Z" fill="#808080" />
    <path d="M8 22H20V24H8V22Z" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
    <path d="M9 22H19V23H9V22Z" fill="#ffffff" />

    {/* Desktop Computer Unit / Tower */}
    <rect x="18" y="11" width="11" height="18" fill="#d4d0c8" stroke="#000000" strokeWidth="1" />
    <path d="M19 12H28V13H19V12Z" fill="#ffffff" />
    {/* Floppy 3.5 Drive Slot */}
    <rect x="20" y="14" width="7" height="2" fill="#808080" />
    <rect x="21" y="14" width="5" height="1" fill="#000000" />
    {/* CD-ROM Tray */}
    <rect x="20" y="18" width="7" height="3" fill="#808080" />
    <rect x="21" y="19" width="4" height="1" fill="#000000" />
    <rect x="26" y="19" width="1" height="1" fill="#00ff00" /> {/* Green LED */}
    {/* Power Button */}
    <rect x="21" y="24" width="2" height="2" fill="#000080" />
    <rect x="25" y="24" width="2" height="1" fill="#ff0000" /> {/* Power LED */}
  </svg>
);

// 2. Folder / Projects
export const RetroFolderProjectsIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ shapeRendering: 'crispEdges' }}
    className={className}
  >
    {/* Folder Back Tab */}
    <path d="M3 7H13L15 10H28V24H3V7Z" fill="#d49b20" stroke="#000000" strokeWidth="1" />
    <path d="M4 8H12V9H4V8Z" fill="#ffeaa7" />

    {/* Inner Document */}
    <rect x="7" y="9" width="16" height="14" fill="#ffffff" stroke="#808080" strokeWidth="1" />
    <line x1="9" y1="12" x2="19" y2="12" stroke="#000080" strokeWidth="1" />
    <line x1="9" y1="14" x2="21" y2="14" stroke="#808080" strokeWidth="1" />
    <line x1="9" y1="16" x2="17" y2="16" stroke="#808080" strokeWidth="1" />
    <line x1="9" y1="18" x2="20" y2="18" stroke="#808080" strokeWidth="1" />

    {/* Folder Front Face (3D Outset) */}
    <path
      d="M3 13H29L26 27H2L3 13Z"
      fill="#f9ca24"
      stroke="#000000"
      strokeWidth="1"
    />
    <path d="M4 14H28L27 15H4V14Z" fill="#ffeaa7" />
    <path d="M26 15L25 26H3L4 15H26Z" fill="#f6b93b" />
    <path d="M3 26H25V27H3V26Z" fill="#b7791f" />
  </svg>
);

// 3. Programs / Tech Skills (Retro Executable with Gears)
export const RetroProgramsIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ shapeRendering: 'crispEdges' }}
    className={className}
  >
    {/* Window Frame */}
    <rect x="3" y="3" width="26" height="24" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
    <path d="M4 4H28V5H4V4Z" fill="#ffffff" />
    <path d="M4 4H5V26H4V4Z" fill="#ffffff" />
    <path d="M27 5H28V26H27V5Z" fill="#808080" />
    <path d="M5 26H28V27H5V26Z" fill="#808080" />

    {/* Title Bar */}
    <rect x="5" y="5" width="22" height="5" fill="#000080" />
    <rect x="6" y="6" width="3" height="3" fill="#ffffff" />
    <rect x="23" y="6" width="3" height="3" fill="#c0c0c0" />

    {/* Application Content / Code Brackets & Chip */}
    <rect x="5" y="11" width="22" height="14" fill="#ffffff" stroke="#808080" strokeWidth="1" />
    
    {/* Code Brackets < / > in Pixel Art */}
    <path d="M9 14L7 17L9 20" stroke="#000080" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M14 13L12 21" stroke="#ff0000" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M17 14L19 17L17 20" stroke="#000080" strokeWidth="1.5" strokeLinecap="square" />

    {/* Chip / Gear Icon overlay on bottom right */}
    <rect x="18" y="16" width="10" height="10" fill="#008080" stroke="#000000" strokeWidth="1" />
    <rect x="20" y="18" width="6" height="6" fill="#fcd34d" />
    <rect x="22" y="20" width="2" height="2" fill="#000080" />
  </svg>
);

// 4. Internet Mail / Contact (Classic Outlook Express Envelope)
export const RetroMailIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ shapeRendering: 'crispEdges' }}
    className={className}
  >
    {/* Envelope Body */}
    <rect x="2" y="7" width="28" height="18" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    
    {/* Airmail Red/Blue Stripes on Top */}
    <rect x="3" y="8" width="3" height="2" fill="#ff0000" />
    <rect x="7" y="8" width="3" height="2" fill="#000080" />
    <rect x="11" y="8" width="3" height="2" fill="#ff0000" />
    <rect x="15" y="8" width="3" height="2" fill="#000080" />
    <rect x="19" y="8" width="3" height="2" fill="#ff0000" />
    <rect x="23" y="8" width="3" height="2" fill="#000080" />

    {/* Postal Stamp */}
    <rect x="22" y="11" width="6" height="7" fill="#fcd34d" stroke="#b45309" strokeWidth="1" />
    <rect x="24" y="13" width="2" height="3" fill="#dc2626" />

    {/* Flap fold lines */}
    <line x1="3" y1="9" x2="16" y2="18" stroke="#808080" strokeWidth="1" />
    <line x1="28" y1="9" x2="16" y2="18" stroke="#808080" strokeWidth="1" />
    <line x1="3" y1="24" x2="12" y2="16" stroke="#c0c0c0" strokeWidth="1" />
    <line x1="28" y1="24" x2="20" y2="16" stroke="#c0c0c0" strokeWidth="1" />

    {/* Postmark cancellation stamp circles */}
    <circle cx="16" cy="13" r="3" stroke="#000080" strokeWidth="1" fill="none" opacity="0.5" />
    <line x1="19" y1="12" x2="23" y2="12" stroke="#000080" strokeWidth="1" opacity="0.5" />
    <line x1="19" y1="14" x2="23" y2="14" stroke="#000080" strokeWidth="1" opacity="0.5" />
  </svg>
);

// 5. MS-DOS Prompt / Terminal
export const RetroTerminalIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ shapeRendering: 'crispEdges' }}
    className={className}
  >
    {/* Frame */}
    <rect x="2" y="4" width="28" height="24" fill="#000000" stroke="#808080" strokeWidth="1" />
    <rect x="3" y="5" width="26" height="5" fill="#808080" />
    <path d="M3 5H28V6H3V5Z" fill="#ffffff" />
    <rect x="5" y="6" width="3" height="3" fill="#000000" />
    <rect x="23" y="6" width="2" height="2" fill="#000000" />
    <rect x="26" y="6" width="2" height="2" fill="#000000" />

    {/* DOS Screen Interior */}
    <rect x="3" y="10" width="26" height="17" fill="#000000" />

    {/* C:\> Prompt in Classic Green / Amber */}
    <text
      x="5"
      y="18"
      fill="#00ff00"
      fontFamily="monospace"
      fontSize="8px"
      fontWeight="bold"
    >
      C:\&gt;
    </text>

    {/* Blinking Cursor Box */}
    <rect x="20" y="13" width="4" height="6" fill="#00ff00" />
    <rect x="5" y="21" width="12" height="1" fill="#38bdf8" />
  </svg>
);

// 6. Media Player / CD-ROM / Lofi Music
export const RetroCdMusicIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ shapeRendering: 'crispEdges' }}
    className={className}
  >
    {/* Outer CD Ring */}
    <circle cx="16" cy="16" r="14" fill="#d4d4d8" stroke="#000000" strokeWidth="1" />
    <circle cx="16" cy="16" r="13" stroke="#ffffff" strokeWidth="1" />

    {/* Holographic Iridescent Sheen Waves */}
    <path d="M5 16C5 9.925 9.925 5 16 5V8C11.582 8 8 11.582 8 16H5Z" fill="#67e8f9" opacity="0.6" />
    <path d="M27 16C27 22.075 22.075 27 16 27V24C20.418 24 24 20.418 24 16H27Z" fill="#f472b6" opacity="0.6" />
    <path d="M16 27C9.925 27 5 22.075 5 16H8C8 20.418 11.582 24 16 24V27Z" fill="#a78bfa" opacity="0.6" />

    {/* Center Hole and Plastic Hub */}
    <circle cx="16" cy="16" r="6" fill="#a1a1aa" stroke="#52525b" strokeWidth="1" />
    <circle cx="16" cy="16" r="3" fill="#ffffff" stroke="#000000" strokeWidth="1" />

    {/* Floating Musical Note */}
    <rect x="21" y="4" width="2" height="7" fill="#000080" />
    <rect x="21" y="4" width="5" height="2" fill="#000080" />
    <circle cx="20" cy="11" r="2" fill="#000080" />
  </svg>
);

// 7. Notepad / 3D Guide
export const RetroNotepadIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ shapeRendering: 'crispEdges' }}
    className={className}
  >
    {/* Blue Notepad Cover & Spiral */}
    <rect x="5" y="3" width="20" height="26" fill="#0284c7" stroke="#000000" strokeWidth="1" />
    <path d="M6 4H24V5H6V4Z" fill="#38bdf8" />
    
    {/* White Paper Pages */}
    <rect x="7" y="6" width="17" height="22" fill="#ffffff" stroke="#808080" strokeWidth="1" />
    
    {/* Spiral Binder Rings */}
    <rect x="4" y="5" width="4" height="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <rect x="4" y="9" width="4" height="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <rect x="4" y="13" width="4" height="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <rect x="4" y="17" width="4" height="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <rect x="4" y="21" width="4" height="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
    <rect x="4" y="25" width="4" height="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />

    {/* Notepad Ruled Text Lines */}
    <line x1="10" y1="10" x2="22" y2="10" stroke="#93c5fd" strokeWidth="1" />
    <line x1="10" y1="14" x2="22" y2="14" stroke="#93c5fd" strokeWidth="1" />
    <line x1="10" y1="18" x2="22" y2="18" stroke="#93c5fd" strokeWidth="1" />
    <line x1="10" y1="22" x2="18" y2="22" stroke="#93c5fd" strokeWidth="1" />

    {/* Yellow Pencil leaning on the right */}
    <path d="M21 16L27 22L24 25L18 19L21 16Z" fill="#facc15" stroke="#000000" strokeWidth="1" />
    <path d="M18 19L16 26L22 24L18 19Z" fill="#e2e8f0" stroke="#000000" strokeWidth="1" />
    <circle cx="17" cy="25" r="1" fill="#000000" />
    <rect x="25" y="21" width="3" height="3" fill="#f43f5e" /> {/* Pink eraser */}
  </svg>
);

// 8. Control Panel / Settings
export const RetroSettingsIcon: React.FC<IconProps> = ({ size = 32, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ shapeRendering: 'crispEdges' }}
    className={className}
  >
    {/* Background Base Folder / Frame */}
    <rect x="3" y="5" width="26" height="22" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
    <path d="M4 6H28V7H4V6Z" fill="#ffffff" />
    <path d="M4 6H5V26H4V6Z" fill="#ffffff" />
    <path d="M27 7H28V26H27V7Z" fill="#808080" />
    <path d="M5 26H28V27H5V26Z" fill="#808080" />

    {/* Sliders and Gear */}
    {/* Slider track 1 */}
    <line x1="7" y1="11" x2="19" y2="11" stroke="#808080" strokeWidth="2" />
    <rect x="13" y="9" width="3" height="5" fill="#ffffff" stroke="#000000" strokeWidth="1" />

    {/* Slider track 2 */}
    <line x1="7" y1="18" x2="19" y2="18" stroke="#808080" strokeWidth="2" />
    <rect x="9" y="16" width="3" height="5" fill="#ffffff" stroke="#000000" strokeWidth="1" />

    {/* Slider track 3 */}
    <line x1="7" y1="23" x2="19" y2="23" stroke="#808080" strokeWidth="2" />
    <rect x="15" y="21" width="3" height="5" fill="#ffffff" stroke="#000000" strokeWidth="1" />

    {/* Gear / Cogwheel on the right */}
    <circle cx="23" cy="17" r="5" fill="#71717a" stroke="#000000" strokeWidth="1" />
    <rect x="22" y="10" width="2" height="14" fill="#71717a" />
    <rect x="16" y="16" width="14" height="2" fill="#71717a" />
    <circle cx="23" cy="17" r="2" fill="#ffffff" stroke="#000000" strokeWidth="1" />
  </svg>
);

// 9. Official Windows 4-Color Start Flag
export const RetroWindowsFlagIcon: React.FC<IconProps> = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ shapeRendering: 'crispEdges' }}
    className={className}
  >
    {/* Top Left Red Tile */}
    <path d="M1 2L7 1V7L1 8V2Z" fill="#ff0000" stroke="#000000" strokeWidth="0.5" />
    {/* Top Right Green Tile */}
    <path d="M8 1L15 2V8L8 7V1Z" fill="#00aa00" stroke="#000000" strokeWidth="0.5" />
    {/* Bottom Left Blue Tile */}
    <path d="M1 9L7 8V14L1 15V9Z" fill="#0000ff" stroke="#000000" strokeWidth="0.5" />
    {/* Bottom Right Yellow Tile */}
    <path d="M8 8L15 9V15L8 14V8Z" fill="#ffcc00" stroke="#000000" strokeWidth="0.5" />
  </svg>
);
