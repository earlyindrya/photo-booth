export type StepId = 'start' | 'layout' | 'camera' | 'customize' | 'download';

export type LayoutId = 'classic-4cut' | 'grid-2x2' | 'cinematic-wide' | 'event-edition';

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
  | 'bw-noir' 
  | 'neon-cyber' 
  | 'retro-vintage' 
  | 'soft-aesthetic' 
  | 'high-contrast';

export interface FilterConfig {
  id: FilterId;
  name: string;
  subtitle: string;
  cssFilter: string;
  previewGradient: string;
}

export type FrameThemeId = 
  | 'obsidian' 
  | 'clean-white' 
  | 'neon-violet' 
  | 'pastel-pink' 
  | 'gradient-cyber' 
  | 'hologram';

export interface FrameThemeConfig {
  id: FrameThemeId;
  name: string;
  bgClass: string;
  canvasBg: string | string[]; // Single hex or array for linear gradient
  textColor: string;
  subtextColor: string;
  borderClass: string;
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
  title: string;
  subtitle: string;
  showDateStamp: boolean;
  showWatermark: boolean;
  frameBorderRadius: number; // px
  stickers: StickerItem[];
}
