export type StepId = 'start' | 'layout' | 'camera' | 'customize' | 'download';

export type LayoutId = 
  | 'classic-4cut' 
  | 'zine-moodboard' 
  | 'mac-window-strip' 
  | 'vintage-baroque' 
  | 'grid-2x2' 
  | 'cinematic-wide';

export interface LayoutConfig {
  id: LayoutId;
  name: string;
  tagline: string;
  shotsCount: number;
  previewRows: number;
  previewCols: number;
  aspectRatioLabel: string;
  badge?: string;
  description: string;
}

export type FilterId = 
  | 'normal' 
  | 'warm-natural'
  | 'april-dream' 
  | 'vintage-ugc' 
  | 'noir-editorial' 
  | 'capsule-sky' 
  | 'retro-90s';

export interface FilterConfig {
  id: FilterId;
  name: string;
  subtitle: string;
  cssFilter: string;
  previewGradient: string;
}

export type FrameThemeId = 
  | 'cream-paper' 
  | 'retro-stripes' 
  | 'y2k-mac' 
  | 'zine-cherry' 
  | 'sky-capsule' 
  | 'baroque-gold' 
  | 'studio-noir';

export type FontStyleId = 'serif' | 'sans' | 'script' | 'mono';

export interface FrameThemeConfig {
  id: FrameThemeId;
  name: string;
  bgClass: string;
  canvasBg: string | string[]; // Single hex or array for linear gradient
  textColor: string;
  subtextColor: string;
  borderClass: string;
  accentBadge?: string;
}

export interface CapturedShot {
  id: number;
  dataUrl: string;
  timestamp: number;
}

export interface StickerItem {
  id: string;
  emoji: string;
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  size: number; // font size in px
}

export interface CustomizationSettings {
  theme: FrameThemeId;
  fontStyle: FontStyleId;
  title: string;
  subtitle: string;
  showDateStamp: boolean;
  showWatermark: boolean;
  frameBorderRadius: number; // px
  stickers: StickerItem[];
}
