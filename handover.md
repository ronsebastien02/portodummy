# HANDOVER DOCUMENTATION / ALIH KELOLA KODE
**Project:** Motion Designer Portfolio Visual Sandbox
**Target Engine:** React 18+ / Vite / Tailwind CSS v4 / motion (from `motion/react`)

Dokumen ini ditujukan sebagai referensi teknis lengkap bagi AI model lain (seperti Claude) untuk melakukan analisis mendalam, pemeliharaan, maupun refaktorisasi terhadap struktur kode yang telah diimplementasikan.

---

## 1. Arsitektur Kode (Code Architecture)

Aplikasi ini dirancang sebagai SPA (Single Page Application) modular berukuran menengah-besar dengan pemisahan ketat antara **data statis (data layer)**, **definisi tipe (types layer)**, dan **komponen interaktif (presentation layer)**.

### Struktur Direktori & File Utama
```text
/
├── metadata.json           # Definsi nama, deskripsi, dan kapabilitas aplikasi
├── tsconfig.json           # Konfigurasi TypeScript compiler dengan alias paths
├── vite.config.ts          # Konfigurasi Vite & bundling (HMR dinonaktifkan di preview)
├── handover.md             # File dokumentasi alih kelola (dokumen ini)
└── src/
    ├── main.tsx            # Entry point utama React-DOM render
    ├── App.tsx             # Main container, routing filter, dan layout terpadu
    ├── index.css           # Konfigurasi global Tailwind CSS v4, Google Fonts, & keyframe anim
    ├── types.ts            # Tipe TypeScript (Interface Project, Tool, Sandbox, Brief)
    ├── data.ts             # Data statis ter-rigging (selected projects & capabilities)
    └── components/
        ├── MotionSandbox.tsx        # Interaksi WebGL-style Canvas 2D simulation
        ├── BriefGenerator.tsx       # Kuantifikasi kalkulator budget & timeline agile
        └── ProjectDetailsModal.tsx # Sidebar drawer geser (Case study detail spec)
```

---

## 2. Dokumentasi Kode & Komponen (Code Documentation)

### A. Tipe & Data (`types.ts` & `data.ts`)
*   **`Project` Interface**: Menyimpan spesifikasi metadata karya motion, tautan video visualizer, aspek rasio dinamis untuk grid masonry, software pipeline, peranan desainer, serta model narasi *Challenge & Solution*.
*   **`Tool` Interface**: Model data untuk diagram batang kemampuan desainer (*capabilities metrics*).

### B. Canvas Simulator (`components/MotionSandbox.tsx`)
Merupakan engine utama visual interaktif 2D berbasis HTML5 `Canvas` dengan kustomisasi real-time:
*   **Responsive Resize**: Menggunakan `ResizeObserver` yang mendeteksi dimensi container secara dinamis, mencegah distorsi peregangan piksel, dan melakukan re-init partikel.
*   **Stateful Controls**: Handler internal untuk memantau perubahan input slider (kecepatan sistem, tingkat gravitasi, dan density partikel) serta warna primer/sekunder.
*   **Interactive Pointer Physics**: Deteksi posisi kursor mouse secara presisi di atas canvas element dengan 3 mode interaksi: `ATTRACT` (menarik partikel ke koordinat mouse), `REPEL` (menolak partikel), dan `NONE` (lepas).
*   **Render Presets**:
    1.  *Quantum Wave*: Gelombang sinusoid mengambang harmonis.
    2.  *Cyber Grid*: Node terhubung dengan garis penghubung (*neural wires*) berdasarkan radius jarak terdekat.
    3.  *Gravity Sparks*: Partikel berenergi tinggi dengan pantulan elastis (bounce) di bawah pengaruh nilai gravitasi positif.
    4.  *Matrix Stream*: Aliran biner digital yang jatuh ke bawah, merombak karakter symbol font monospace secara acak.

### C. Estimator Brief (`components/BriefGenerator.tsx`)
Interactive budget estimator kalkulator yang menghitung estimasi biaya dan durasi pengerjaan proyek animasi secara realtime:
*   Kalkulasi biaya (*Budget calculation*) dinamis dipengaruhi oleh durasi video (detik), sub-style tingkat kerumitan (simulasi partikel membutuhkan rendering tinggi), serta tingkat kompleksitas pengerjaan (*fidelity tier*).
*   Fitur **"Attach to Contact"** mengirimkan blueprint spesifikasi langsung ke komponen formulir kontak di `App.tsx` agar pengguna dapat mengirimkan pesan dengan format budget terlampir otomatis.

### D. Case Study Spec Drawer (`components/ProjectDetailsModal.tsx`)
Drawer geser transisi elegan menggunakan library `motion/react` dengan status `AnimatePresence`. Menampilkan detail tantangan teknis desainer (*engineering challenges*) dan solusi prosedural yang dihadapi pada setiap karya motion graphics.

---

## 3. Alasan Pemilihan Desain Kode (Design Patterns Selection)

### A. Minimalist High-Contrast Light & Dark Canvas (The Dark Mode Switcher)
Formulasi skema warna didasarkan pada kontras ekstrem yang nyaman di mata untuk para profesional kreatif:
*   **Dark Mode (Default)**: Mengusung gaya *Industrial Cyber-slate* (`#0a0a0c` sebagai latar base, dikombinasikan dengan teks zinc lembut, neon biru akurat, dan pendaran partikel berpendar). Hal ini memberikan kesan estetika premium layaknya software profesional seperti DaVinci Resolve, Cinema 4D, atau Unreal Engine.
*   **Light Mode**: Dialihkan secara mulus menggunakan binding dinamik di tingkatan html node (`bg-[#f8f9fa]`) dengan tipografi Inter legibel tinggi.

### B. Modular Optimization Over Monolith File
Struktur kode sengaja dipecah dari `App.tsx` menjadi file sub-komponen terpisah:
*   **Pencegahan Token Limit**: Mencegah proses parsing kode terpotong di tengah jalan pada LLM yang memiliki kapasitas output terbatas.
*   **Reduksi Re-Render**: Dengan memisahkan `MotionSandbox` dan `BriefGenerator`, kalkulasi math frame-rate intensif di dalam loop animation canvas tidak memicu render ulang total pada navigasi header maupun galeri proyek di `App.tsx`.

### C. GPU-Optimized Math-Based Animation (HTML5 Canvas vs CSS animation)
Kami menggunakan HTML5 Canvas 2D murni untuk merender ratusan partikel dalam sandbox interaktif:
*   Jika menggunakan elemen DOM HTML untuk 250+ partikel, browser akan mengalami degradasi performa (*reflow & repaint lag*).
*   HTML5 Canvas memanipulasi piksel secara destruktif dalam frame buffer tunggal sehingga rendering tetap stabil pada 60 FPS bahkan pada perangkat seluler.

### D. Micro-Transitions & Interactivity (Cultural Localisation)
*   **Dynamic Greeting Header Block**: Mengimplementasikan sapaan rotatif bilingual (Sunda, Indonesia, Inggris) sebagai representasi sentuhan personal kultural desainer lokal namun tetap memiliki kualifikasi jangkauan global.
*   **Declarative Motion Animations**: Menggunakan entry spring animations (`motion/react`) untuk transisi drawer, tombol hover, dan filter tag guna memberikan impresi fluiditas studio motion profesional yang kohesif.

---

## 🚀 Panduan Refaktorisasi untuk AI Berikutnya (For Claude / Next Assistant)
Jika Anda ingin melakukan peningkatan pada kode ini, pertimbangkan beberapa arahan berikut:
1.  **WebGL Migration**: Anda dapat meningkatkan engine canvas 2D di `MotionSandbox.tsx` ke dalam pustaka WebGL murni (misalnya menggunakan Three.js atau React Three Fiber) apabila pengguna meminta visual 3D shader terkompilasi yang lebih realistis.
2.  **Sound FX integration**: Mengintegrasikan Web Audio API ke dalam interaksi mouse hover partikel canvas untuk sound generator sintesis yang lebih imersif.
3.  **Local Storage Persistence**: Melakukan cache data input estimasi budget brief desainer ke dalam local storage, agar data draf pilihan user tidak hilang saat dialihkan mode kegelapannya (*dark mode switcher*).
