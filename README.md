# FREQZ Digital Photobooth 📸✨

A modern, sleek single-page digital photobooth web application built with **React**, **Tailwind CSS**, and **Lucide React** icons. Inspired by trendy Korean/Japanese photobooths (Life4Cuts, Haru Film) with a futuristic cyberpunk aesthetic.

---

## 🚀 Features

- **Futuristic UI & Aesthetic Theme**:
  - Dark mode background (`#0d0d0d`) with electric purple (`#8B5CF6`), neon pink (`#EC4899`), and cyan (`#06B6D4`) neon accents.
  - Glassmorphic card surfaces with backdrop blur, glowing borders, and smooth micro-interactions.
- **Interactive Multi-Step Workflow**:
  1. **Start Screen**: Landing hero with animated glowing CTA and feature highlights.
  2. **Frame & Layout Selection**:
     - *Classic 4-Cut Vertical Strip* (1×4 layout)
     - *2×2 Polaroid Grid* (4 photos)
     - *Cinematic Wide Single Frame* (16:9 hero shot)
     - *Event Special Edition Strip* (CYBER-FREQZ 2026 branded strip)
  3. **Live Camera & Capture Studio**:
     - Webcam stream via `getUserMedia` with mirror flip & camera switcher.
     - Studio camera simulator fallback when no camera is present.
     - 6 real-time aesthetic filters (Natural, B&W Noir, Neon Cyber, Retro 90s, Soft Dream, Tokyo Pop).
     - 3-2-1 animated countdown overlay.
     - Flash whiteout overlay and dual-curtain shutter sound FX.
     - Live captured filmstrip progress with single-shot retake.
  4. **Customization & WYSIWYG Preview**:
     - 6 frame background colors & gradients (Obsidian, Studio White, Neon Violet, Pastel Bubblegum, Cyber Aurora, Y2K Chrome).
     - Customizable frame typography and toggleable date stamp.
     - 18 decorative emoji stickers with tap-to-add and click-to-remove.
  5. **Final Export & Sharing**:
     - Print-ready 300 DPI composite rendered via HTML5 Canvas.
     - Direct PNG download.
     - Copy image to clipboard.
     - Mobile QR Code modal for quick mobile transfer.
- **Native Web Audio Synthesizer**:
  - Zero external sound files — procedural countdown beeps, mechanical shutter snaps, and success chimes generated via the Web Audio API (with global mute toggle).

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS + Custom Neon Gradients & Animations
- **Icons**: Lucide React
- **Export Engine**: HTML5 Canvas compositing
- **Celebration Effects**: `canvas-confetti`
- **Audio Engine**: Web Audio API (Oscillator / Noise Synthesizer)

---

## 💻 Getting Started

### Prerequisites

- Node.js (v18+)
- npm / pnpm / yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/earlyindrya/photo-booth.git
cd photo-booth

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🔒 Privacy & Security

All camera capture and composite rendering operations take place **100% locally in the browser**. No photos are uploaded or stored on any remote server.

---

## 📄 License

MIT License © 2026 earlyindrya
