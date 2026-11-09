import { LayoutConfig, FilterConfig, FrameThemeConfig } from '../types/photobooth';

export const LAYOUT_OPTIONS: LayoutConfig[] = [
  {
    id: 'classic-4cut',
    name: 'Classic 4-Cut',
    tagline: 'Authentic Korean Photostrip',
    shotsCount: 4,
    previewRows: 4,
    previewCols: 1,
    aspectRatioLabel: '1:3 Vertical Strip',
    badge: 'Most Popular',
    description: 'The iconic vertical 4-cut filmstrip. Perfect for pocket prints, bookmarks, and phone cases.'
  },
  {
    id: 'grid-2x2',
    name: '2×2 Polaroid Grid',
    tagline: 'Modern Square Showcase',
    shotsCount: 4,
    previewRows: 2,
    previewCols: 2,
    aspectRatioLabel: '1:1 Square Grid',
    badge: 'Instagram Ready',
    description: 'Symmetric 4-photo grid layout. Clean, balanced, and perfectly proportioned for feed sharing.'
  },
  {
    id: 'cinematic-wide',
    name: 'Cinematic Wide',
    tagline: 'Single Shot Feature',
    shotsCount: 1,
    previewRows: 1,
    previewCols: 1,
    aspectRatioLabel: '16:9 / 4:3 Wide',
    badge: 'Editorial',
    description: 'High-impact standalone hero portrait with cinematic letterboxing and custom typography.'
  },
  {
    id: 'event-edition',
    name: 'Event Special Edition',
    tagline: 'CYBER-FREQZ 2026 Strip',
    shotsCount: 4,
    previewRows: 4,
    previewCols: 1,
    aspectRatioLabel: '1:3 Branded Strip',
    badge: 'VIP Limited',
    description: 'Exclusive commemorative strip featuring custom cyber badges, event branding, and decorative motifs.'
  }
];

export const FILTER_OPTIONS: FilterConfig[] = [
  {
    id: 'normal',
    name: 'Natural / Raw',
    subtitle: 'True color studio lighting',
    cssFilter: 'none',
    previewGradient: 'from-slate-400 to-slate-200'
  },
  {
    id: 'bw-noir',
    name: 'B&W Noir',
    subtitle: 'High contrast monochrome classic',
    cssFilter: 'grayscale(100%) contrast(125%) brightness(95%)',
    previewGradient: 'from-zinc-900 to-zinc-400'
  },
  {
    id: 'neon-cyber',
    name: 'Neon Cyber',
    subtitle: 'Electric cyan and violet glow',
    cssFilter: 'contrast(120%) saturate(160%) hue-rotate(290deg) brightness(105%)',
    previewGradient: 'from-fuchsia-600 via-purple-600 to-cyan-400'
  },
  {
    id: 'retro-vintage',
    name: 'Retro 90s',
    subtitle: 'Warm nostalgic film grain tone',
    cssFilter: 'sepia(35%) contrast(108%) saturate(120%) brightness(102%)',
    previewGradient: 'from-amber-700 via-orange-500 to-yellow-300'
  },
  {
    id: 'soft-aesthetic',
    name: 'Soft Dream',
    subtitle: 'Pastel diffused beauty glow',
    cssFilter: 'brightness(110%) contrast(92%) saturate(115%)',
    previewGradient: 'from-pink-300 via-purple-200 to-indigo-300'
  },
  {
    id: 'high-contrast',
    name: 'Tokyo Pop',
    subtitle: 'Deep punchy shadows and vibrant tones',
    cssFilter: 'contrast(140%) saturate(135%) brightness(98%)',
    previewGradient: 'from-rose-500 via-indigo-600 to-cyan-500'
  }
];

export const FRAME_THEMES: FrameThemeConfig[] = [
  {
    id: 'obsidian',
    name: 'Obsidian Black',
    bgClass: 'bg-[#0f0f12]',
    canvasBg: '#0f0f12',
    textColor: '#ffffff',
    subtextColor: '#94a3b8',
    borderClass: 'border-white/10'
  },
  {
    id: 'clean-white',
    name: 'Studio White',
    bgClass: 'bg-[#f8fafc]',
    canvasBg: '#f8fafc',
    textColor: '#0f172a',
    subtextColor: '#64748b',
    borderClass: 'border-slate-300'
  },
  {
    id: 'neon-violet',
    name: 'Neon Violet',
    bgClass: 'bg-[#4c1d95]',
    canvasBg: '#4c1d95',
    textColor: '#ffffff',
    subtextColor: '#c4b5fd',
    borderClass: 'border-purple-400/30'
  },
  {
    id: 'pastel-pink',
    name: 'Pastel Bubblegum',
    bgClass: 'bg-[#fbcfe8]',
    canvasBg: '#fbcfe8',
    textColor: '#831843',
    subtextColor: '#9d174d',
    borderClass: 'border-pink-300'
  },
  {
    id: 'gradient-cyber',
    name: 'Cyber Aurora',
    bgClass: 'bg-gradient-to-b from-[#8B5CF6] via-[#EC4899] to-[#06B6D4]',
    canvasBg: ['#8B5CF6', '#EC4899', '#06B6D4'],
    textColor: '#ffffff',
    subtextColor: '#f1f5f9',
    borderClass: 'border-cyan-400/40'
  },
  {
    id: 'hologram',
    name: 'Y2K Chrome',
    bgClass: 'bg-gradient-to-tr from-[#334155] via-[#94a3b8] to-[#cbd5e1]',
    canvasBg: ['#1e293b', '#64748b', '#cbd5e1'],
    textColor: '#0f172a',
    subtextColor: '#334155',
    borderClass: 'border-slate-400/50'
  }
];

// Helper to generate artistic mock portraits on canvas if camera is not connected
export function generateMockPortrait(shotIndex: number): string {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 540;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Gradients for mock shots
  const gradients = [
    ['#1e1b4b', '#4338ca', '#818cf8'],
    ['#311042', '#86198f', '#e879f9'],
    ['#083344', '#0891b2', '#38bdf8'],
    ['#18181b', '#27272a', '#52525b']
  ];

  const colors = gradients[shotIndex % gradients.length];
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, colors[0]);
  grad.addColorStop(0.5, colors[1]);
  grad.addColorStop(1, colors[2]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Decorative cyber silhouette / lighting
  ctx.save();
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height * 0.45, 120, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.fill();

  // Head/Shoulders stylized outline
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 210, 65, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, 380, 130, 100, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  // Fun pose indicator
  const poses = ['✌️ PEACE SIGN', '✨ BIG SMILE', '😎 CHILL POSE', '💖 HEART CHEEK'];
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  ctx.roundRect(canvas.width / 2 - 120, 440, 240, 44, 22);
  ctx.fill();

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 18px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`SIMULATED SHOT #${shotIndex + 1}`, canvas.width / 2, 468);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px "Outfit", sans-serif';
  ctx.fillText(poses[shotIndex % poses.length], canvas.width / 2, 100);

  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.9);
}

export const STICKER_PALETTE = [
  '❤️', '💖', '✨', '⚡', '⭐', '🦋', 
  '🍒', '👾', '🔥', '🎉', '🕶️', '🌸',
  '✌️', '💫', '💿', '🛸', '👑', '🌈'
];
