import React from 'react';

export const GuideApp: React.FC = () => {
  return (
    <div 
      className="terminal-font"
      style={{ 
        padding: '16px', 
        height: '100%', 
        overflowY: 'auto', 
        backgroundColor: '#ffffff', 
        color: '#000000',
        fontSize: '12px',
        lineHeight: '1.7',
        userSelect: 'text'
      }}
    >
      <pre style={{ margin: 0, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
{`=============================================================
PANDUAN ASET 3D (.GLB) & WORKFLOW PERSIS HENRY HEFFERNAN
=============================================================

1. FORMAT FILE APA YANG DIGUNAKAN?
-------------------------------------------------------------
Format utama adalah: .GLB (Binary glTF).
- .GLB membungkus model 3D (geometri/mesh), material, UV mapping, 
  dan animasi dalam 1 file terkompresi tunggal.
- Jangan gunakan file mentah .blend atau .fbx di web karena 
  ukurannya jauh lebih besar dan butuh parser kompleks.

2. RAHASIA VISUAL & PERFORMA HENRY HEFFERNAN:
-------------------------------------------------------------
A. Texture Baking (Blender):
   - Cahaya lampu, bayangan lembut (soft ambient shadows), dan 
     pantulan di-bake ke dalam image texture di Blender.
   - Di Three.js, gunakan MeshBasicMaterial dengan map tekstur hasil 
     bake tersebut.
   - Hasilnya: 60 FPS super enteng tanpa dynamic shadow berat!

B. Kompresi Draco / Meshopt:
   - Gunakan gltf-pipeline atau gltf-transform untuk kompresi model.
   - Contoh command:
     npx gltf-pipeline -i room.gltf -o scene.glb -d

3. CARA MEMASANG MODEL .GLB KUSTOM ANDA KE WEB INI:
-------------------------------------------------------------
1. Siapkan model ruangan/meja Anda dalam format .glb.
2. Simpan file tersebut ke dalam folder:
   /public/models/scene.glb
3. Buka "Control Panel (Settings)" di desktop OS ini, lalu centang:
   "Load Custom Model (.glb di /models/scene.glb)"
   Atau aktifkan di file src/stores/portfolioStore.ts.
4. Komponen CustomModelLoader.tsx akan otomatis me-load model 
   tersebut dengan three.js GLTFLoader!

4. CARA POSISIKAN LAYAR INTERAKTIF:
-------------------------------------------------------------
Di dalam src/components/3d/CRTMonitor.tsx, terdapat komponen 
<Html transform occlude ...> dari @react-three/drei.
Anda cukup sesuaikan [x, y, z] position dan rotation agar pas 
dengan permukaan kaca monitor pada model 3D Anda.

=============================================================
Selamat Berkreasi! Proyek ini sudah disiapkan agar modular.
=============================================================`}
      </pre>
    </div>
  );
};
