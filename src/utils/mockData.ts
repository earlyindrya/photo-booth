import { LayoutConfig, FilterConfig, FrameThemeConfig } from '../types/photobooth';

export const LAYOUT_OPTIONS: LayoutConfig[] = [
  {
    id: 'classic-4cut',
    name: 'Classic 4-Cut Strip',
    tagline: 'Authentic Korean Photostrip',
    shotsCount: 4,
    previewRows: 4,
    previewCols: 1,
    aspectRatioLabel: '1:3 Vertical Strip',
    badge: 'Popular',
    description: 'The iconic vertical filmstrip format with clean editorial borders, customizable typography, and date stamp.'
  },
  {
    id: 'zine-moodboard',
    name: 'Zine Moodboard',
    tagline: 'Things I Loved (Recap) Style',
    shotsCount: 3,
    previewRows: 3,
    previewCols: 1,
    aspectRatioLabel: 'Aesthetic Editorial Strip',
    badge: 'Editorial Choice',
    description: 'Artistic asymmetrical layout with numbered badges (1)-(3), polka dot stickers, and editorial typography.'
  },
  {
    id: 'mac-window-strip',
    name: 'Y2K Mac OS Window',
    tagline: 'Desktop Window Collage',
    shotsCount: 4,
    previewRows: 4,
    previewCols: 1,
    aspectRatioLabel: 'Retro Desktop Strip',
    badge: 'Y2K Retro',
    description: 'Retro system window chrome with red, yellow, green traffic dots, blue folder icon, and tape label tags.'
  },
  {
    id: 'vintage-baroque',
    name: 'Vintage Baroque Frame',
    tagline: 'Antique Gilded Museum Edition',
    shotsCount: 1,
    previewRows: 1,
    previewCols: 1,
    aspectRatioLabel: 'Gilded Museum Portrait',
    badge: 'Vintage',
    description: 'Regal ornate golden picture frame with handwritten cursive signature and warm museum archival background.'
  },
  {
    id: 'grid-2x2',
    name: '2×2 Polaroid Scrapbook',
    tagline: 'Square Feed & Keepsake',
    shotsCount: 4,
    previewRows: 2,
    previewCols: 2,
    aspectRatioLabel: '1:1 Square Grid',
    badge: 'Instagram Ready',
    description: 'Balanced 4-photo grid layout inspired by scrapbook albums and social media highlights.'
  },
  {
    id: 'cinematic-wide',
    name: 'Capsule Feature',
    tagline: 'Airy Wide Hero Portrait',
    shotsCount: 1,
    previewRows: 1,
    previewCols: 1,
    aspectRatioLabel: '16:9 Editorial Wide',
    badge: 'Hero Showcase',
    description: 'High-impact standalone horizontal portrait with clean ticket letterboxing and glassmorphic badge typography.'
  }
];

export const FILTER_OPTIONS: FilterConfig[] = [
  {
    id: 'normal',
    name: 'Natural Light',
    subtitle: 'True studio lighting',
    cssFilter: 'none',
    previewGradient: 'from-amber-100 to-stone-200'
  },
  {
    id: 'april-dream',
    name: 'April Dream',
    subtitle: 'Soft diffused warm pastel glow',
    cssFilter: 'brightness(106%) contrast(92%) saturate(110%) sepia(8%)',
    previewGradient: 'from-amber-200 via-rose-100 to-sky-100'
  },
  {
    id: 'vintage-ugc',
    name: 'Vintage UGC',
    subtitle: 'Warm nostalgic 35mm film tones',
    cssFilter: 'sepia(30%) contrast(106%) saturate(115%) brightness(102%)',
    previewGradient: 'from-amber-300 via-orange-200 to-stone-300'
  },
  {
    id: 'noir-editorial',
    name: 'Noir Editorial',
    subtitle: 'High contrast magazine monochrome',
    cssFilter: 'grayscale(100%) contrast(135%) brightness(96%)',
    previewGradient: 'from-stone-900 via-zinc-600 to-stone-200'
  },
  {
    id: 'capsule-sky',
    name: 'Capsule Sky',
    subtitle: 'Cool airy blue and clean highlights',
    cssFilter: 'contrast(105%) brightness(104%) saturate(120%) hue-rotate(190deg)',
    previewGradient: 'from-sky-300 via-blue-200 to-indigo-100'
  },
  {
    id: 'retro-90s',
    name: 'Disposable 90s',
    subtitle: 'Punchy flash shadows & golden hue',
    cssFilter: 'contrast(120%) saturate(130%) sepia(18%) brightness(104%)',
    previewGradient: 'from-yellow-400 via-amber-300 to-rose-200'
  }
];

export const FRAME_THEMES: FrameThemeConfig[] = [
  {
    id: 'cream-paper',
    name: 'Warm Linen Paper',
    bgClass: 'bg-[#FBF9F5]',
    canvasBg: '#FBF9F5',
    textColor: '#1F1E1D',
    subtextColor: '#706B65',
    borderClass: 'border-[#E8E2D6]',
    accentBadge: 'Editorial'
  },
  {
    id: 'retro-stripes',
    name: 'Pastel Awning Stripes',
    bgClass: 'retro-awning-stripes',
    canvasBg: '#D7E5F5',
    textColor: '#6E161E',
    subtextColor: '#8B1E27',
    borderClass: 'border-[#BDD3EB]',
    accentBadge: 'Retro Blue'
  },
  {
    id: 'y2k-mac',
    name: 'Y2K Desktop Window',
    bgClass: 'bg-[#E5E5E5]',
    canvasBg: '#E5E5E5',
    textColor: '#1A1A1A',
    subtextColor: '#4A4A4A',
    borderClass: 'border-[#B0B0B0]',
    accentBadge: 'Mac OS'
  },
  {
    id: 'zine-cherry',
    name: 'Cherry Polka Dot Zine',
    bgClass: 'bg-[#FAF6F0]',
    canvasBg: '#FAF6F0',
    textColor: '#1A1A1A',
    subtextColor: '#8B1E27',
    borderClass: 'border-zinc-300',
    accentBadge: 'Polka Dots'
  },
  {
    id: 'sky-capsule',
    name: 'Dreamy Sky Capsule',
    bgClass: 'bg-gradient-to-b from-[#DCEAFC] via-[#EAF3FD] to-[#F5F9FF]',
    canvasBg: ['#DCEAFC', '#EAF3FD', '#F5F9FF'],
    textColor: '#1E3A8A',
    subtextColor: '#3B82F6',
    borderClass: 'border-blue-200',
    accentBadge: 'Capsule'
  },
  {
    id: 'baroque-gold',
    name: 'Antique Baroque Gold',
    bgClass: 'bg-[#F9F5EC]',
    canvasBg: '#F9F5EC',
    textColor: '#541016',
    subtextColor: '#8F7135',
    borderClass: 'border-[#C5A059]',
    accentBadge: 'Museum'
  },
  {
    id: 'studio-noir',
    name: 'Minimalist Noir',
    bgClass: 'bg-[#1C1C1F]',
    canvasBg: '#1C1C1F',
    textColor: '#FFFFFF',
    subtextColor: '#A1A1AA',
    borderClass: 'border-white/10',
    accentBadge: 'Dark'
  }
];

// Helper to generate aesthetic editorial mock portraits if camera is inactive
export function generateMockPortrait(shotIndex: number): string {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 540;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Warm editorial palettes inspired by the reference images
  const palettes = [
    { bg: ['#F3ECE2', '#E2D4C3'], accent: '#8B1E27', tag: 'APRIL RECAP' },
    { bg: ['#DCE8F6', '#C7D9EF'], accent: '#1E3A8A', tag: 'CAPSULE MOMENT' },
    { bg: ['#EFE7DD', '#DFD3C3'], accent: '#541016', tag: 'EDITORIAL VOGUE' },
    { bg: ['#ECE7DF', '#D9CFC4'], accent: '#1F1E1D', tag: 'THINGS I LOVED' }
  ];

  const palette = palettes[shotIndex % palettes.length];
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, palette.bg[0]);
  grad.addColorStop(1, palette.bg[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  // Aesthetic background arch / circle
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height * 0.42, 130, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.fill();

  // Head and shoulders portrait silhouette
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 210, 68, 0, Math.PI * 2);
  ctx.fillStyle = '#262422';
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, 385, 140, 110, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#262422';
  ctx.fill();

  // Chic sunnies/glasses representation
  ctx.fillStyle = '#111111';
  ctx.roundRect(canvas.width / 2 - 38, 195, 32, 18, 6);
  ctx.roundRect(canvas.width / 2 + 6, 195, 32, 18, 6);
  ctx.fill();

  // Aesthetic sticker tag pill on portrait
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0,0,0,0.08)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;
  ctx.roundRect(canvas.width / 2 - 110, 440, 220, 42, 21);
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.fillStyle = palette.accent;
  ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '1px';
  ctx.fillText(`• ${palette.tag} •`, canvas.width / 2, 467);

  // Top editorial note
  const poses = ['spring walks ☕', 'delicious meals 🥐', 'travel moments ✈️', 'favorite finds 🤍'];
  ctx.font = 'italic 20px "Playfair Display", serif';
  ctx.fillStyle = '#1F1E1D';
  ctx.fillText(poses[shotIndex % poses.length], canvas.width / 2, 85);

  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.95);
}

export const STICKER_PALETTE = [
  '🔴', '⚪', '🍒', '🎀', '☕', '🕶️',
  '📸', '🤍', '🥐', '🪞', '🍎', '🕊️',
  '💌', '🎞️', '✈️', '💐', '📖', '🚲',
  '📁', '📎', '🏷️', '⭐', '✦', '✨'
];