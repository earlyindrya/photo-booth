import { LayoutConfig, FilterConfig, FrameThemeConfig } from '../types/photobooth';

export const LAYOUT_OPTIONS: LayoutConfig[] = [
  {
    id: 'polkadot-4cut',
    name: 'Polka Dot 4-Cut',
    tagline: 'Gen Z Red Dot Photostrip',
    shotsCount: 4,
    previewRows: 4,
    previewCols: 1,
    aspectRatioLabel: '1:3 Vertical Strip',
    badge: 'Trending 🔥',
    description: 'The viral Korean vertical 4-cut photostrip decorated with bold red polka dots, editorial parenthetical numbers (1)-(4), and clean borders.'
  },
  {
    id: 'zine-recap',
    name: 'Things I Loved Zine',
    tagline: 'August!! (recap) Moodboard',
    shotsCount: 3,
    previewRows: 3,
    previewCols: 1,
    aspectRatioLabel: 'Editorial Zine Format',
    badge: 'Viral Style',
    description: '3-cut asymmetrical editorial layout inspired by the trending "Things i loved (recap)" zine poster with red polka dots and volume metadata.'
  },
  {
    id: 'classic-4cut',
    name: 'Classic Minimal 4-Cut',
    tagline: 'Clean Monochrome Booth',
    shotsCount: 4,
    previewRows: 4,
    previewCols: 1,
    aspectRatioLabel: '1:3 Filmstrip',
    badge: 'Clean Minimal',
    description: 'Understated, modern Korean photostrip with ultra-clean white borders, modern grotesk typography, and date stamp.'
  },
  {
    id: 'polaroid-2x2',
    name: '2×2 Polaroid Square',
    tagline: 'Balanced 4-Photo Showcase',
    shotsCount: 4,
    previewRows: 2,
    previewCols: 2,
    aspectRatioLabel: '1:1 Square Grid',
    badge: 'Instagram Ready',
    description: 'Square 4-cut grid layout ideal for social media posts, album keepsakes, and lockscreens.'
  },
  {
    id: 'wide-hero',
    name: 'Single Hero Cut',
    tagline: 'Standalone Digicam Portrait',
    shotsCount: 1,
    previewRows: 1,
    previewCols: 1,
    aspectRatioLabel: '16:10 Wide Feature',
    badge: 'Solo Hero',
    description: 'High-impact standalone horizontal portrait with clean editorial captions and date stamp.'
  }
];

export const FILTER_OPTIONS: FilterConfig[] = [
  {
    id: 'normal',
    name: 'Natural Light',
    subtitle: 'True studio lighting',
    cssFilter: 'none',
    previewGradient: 'from-stone-100 to-stone-200'
  },
  {
    id: 'soft-glow',
    name: 'Soft Glow',
    subtitle: 'Diffused pastel beauty glow',
    cssFilter: 'brightness(106%) contrast(94%) saturate(108%) sepia(5%)',
    previewGradient: 'from-rose-100 via-amber-100 to-stone-100'
  },
  {
    id: 'vintage-35mm',
    name: 'Vintage 35mm',
    subtitle: 'Warm nostalgic film tones',
    cssFilter: 'sepia(25%) contrast(108%) saturate(115%) brightness(102%)',
    previewGradient: 'from-amber-200 via-orange-100 to-stone-300'
  },
  {
    id: 'noir-contrast',
    name: 'Noir Contrast',
    subtitle: 'Deep punchy B&W magazine tone',
    cssFilter: 'grayscale(100%) contrast(140%) brightness(96%)',
    previewGradient: 'from-zinc-900 via-stone-700 to-stone-200'
  },
  {
    id: 'cool-digicam',
    name: 'Y2K Digicam',
    subtitle: 'Crisp flash highlights & blue tint',
    cssFilter: 'contrast(115%) brightness(106%) saturate(125%) hue-rotate(185deg)',
    previewGradient: 'from-sky-200 via-blue-100 to-indigo-100'
  },
  {
    id: 'disposable-90s',
    name: 'Disposable 90s',
    subtitle: 'Punchy flash saturation & grain',
    cssFilter: 'contrast(122%) saturate(135%) sepia(16%) brightness(104%)',
    previewGradient: 'from-yellow-300 via-amber-200 to-rose-200'
  }
];

export const FRAME_THEMES: FrameThemeConfig[] = [
  {
    id: 'cherry-polkadot',
    name: 'Cherry Red Dot',
    bgClass: 'bg-[#FAF8F5]',
    canvasBg: '#FAF8F5',
    textColor: '#18181B',
    subtextColor: '#D92D20',
    borderClass: 'border-zinc-300',
    dotColor: '#D92D20',
    accentBadge: 'Trending 🔴'
  },
  {
    id: 'noir-polkadot',
    name: 'Noir Black Dot',
    bgClass: 'bg-white',
    canvasBg: '#FFFFFF',
    textColor: '#18181B',
    subtextColor: '#71717A',
    borderClass: 'border-zinc-900',
    dotColor: '#18181B',
    accentBadge: 'Monochrome ⚫'
  },
  {
    id: 'blush-polkadot',
    name: 'Blush Pink Dot',
    bgClass: 'bg-[#FFF0F2]',
    canvasBg: '#FFF0F2',
    textColor: '#881337',
    subtextColor: '#D92D20',
    borderClass: 'border-rose-200',
    dotColor: '#D92D20',
    accentBadge: 'Cute Pink 🎀'
  },
  {
    id: 'minimal-white',
    name: 'Studio White',
    bgClass: 'bg-[#FFFFFF]',
    canvasBg: '#FFFFFF',
    textColor: '#18181B',
    subtextColor: '#71717A',
    borderClass: 'border-zinc-200',
    accentBadge: 'Minimal ⚪'
  },
  {
    id: 'linen-paper',
    name: 'Warm Linen Paper',
    bgClass: 'bg-[#F5EFE6]',
    canvasBg: '#F5EFE6',
    textColor: '#1C1917',
    subtextColor: '#78716C',
    borderClass: 'border-[#E5DDD2]',
    accentBadge: 'Vintage 📜'
  },
  {
    id: 'obsidian-noir',
    name: 'Obsidian Dark',
    bgClass: 'bg-[#18181B]',
    canvasBg: '#18181B',
    textColor: '#FFFFFF',
    subtextColor: '#A1A1AA',
    borderClass: 'border-zinc-800',
    accentBadge: 'Dark Studio 🖤'
  }
];

// Helper to generate simulated mock portraits if webcam is disabled
export function generateMockPortrait(shotIndex: number): string {
  if (typeof document === 'undefined') return '';
  const canvas = document.createElement('canvas');
  canvas.width = 720;
  canvas.height = 540;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  const mockPalettes = [
    { bg: ['#F7F3EE', '#E9E2D8'], accent: '#D92D20', label: 'THINGS I LOVED (1)' },
    { bg: ['#FFF0F2', '#FDE2E6'], accent: '#D92D20', label: 'AUGUST!! (2)' },
    { bg: ['#F2F2F2', '#E2E2E2'], accent: '#18181B', label: 'MY PICKS (3)' },
    { bg: ['#FAF6F0', '#EFE7DC'], accent: '#D92D20', label: 'FAVORITE FINDS (4)' }
  ];

  const p = mockPalettes[shotIndex % mockPalettes.length];
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, p.bg[0]);
  grad.addColorStop(1, p.bg[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  // Aesthetic background circle
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height * 0.45, 130, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fill();

  // Head and silhouette
  ctx.beginPath();
  ctx.arc(canvas.width / 2, 210, 68, 0, Math.PI * 2);
  ctx.fillStyle = '#222222';
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, 385, 140, 110, 0, 0, Math.PI * 2);
  ctx.fillStyle = '#222222';
  ctx.fill();

  // Oval sunglasses (from the user's reference image!)
  ctx.fillStyle = '#111111';
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2 - 25, 205, 22, 12, 0, 0, Math.PI * 2);
  ctx.ellipse(canvas.width / 2 + 25, 205, 22, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Red Polka Dot Accent Sticker (Gen Z trend!)
  ctx.fillStyle = '#D92D20';
  ctx.beginPath();
  ctx.arc(canvas.width / 2 + 95, 155, 18, 0, Math.PI * 2);
  ctx.fill();

  // Bottom Label Badge
  ctx.fillStyle = '#FFFFFF';
  ctx.shadowColor = 'rgba(0,0,0,0.08)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;
  ctx.roundRect(canvas.width / 2 - 120, 440, 240, 42, 21);
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.fillStyle = p.accent;
  ctx.font = 'bold 15px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(p.label, canvas.width / 2, 467);

  // Top parenthetical badge
  ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#18181B';
  ctx.fillText(`(${shotIndex + 1})`, canvas.width / 2, 85);

  ctx.restore();

  return canvas.toDataURL('image/jpeg', 0.95);
}

export const STICKER_PALETTE = [
  '🔴', '⚫', '⚪', '🍒', '🎀', '🕶️',
  '💄', '📸', '🤍', '❤️', '☕', '✨',
  '⭐', '🧸', '💌', '🎧', '🥐', '🕊️'
];