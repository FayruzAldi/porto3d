import { SceneCanvas } from './components/3d/SceneCanvas';
import { HUDOverlay } from './components/ui/HUDOverlay';
import { DirectOSModal } from './components/ui/DirectOSModal';
import { BiosStartup } from './components/ui/BiosStartup';
export function App() {
  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* BIOS POST & Retro Start Screen (Unlocks Web Audio API & Boot Chime) */}
      <BiosStartup />

      {/* Persistent Minimal Retro HUD Navigation Controls */}
      <HUDOverlay />

      {/* 3D Scene with Retro Room, Desk Lamp, and CRT Monitor */}
      <SceneCanvas />

      {/* Fallback Direct Fullscreen Virtual OS (for Mobile or direct inspection) */}
      <DirectOSModal />
    </main>
  );
}

export default App;
