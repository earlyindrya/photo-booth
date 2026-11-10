export type StepId = 'start' | 'layout' | 'camera' | 'customize' | 'download';

export type LayoutId = 
  | 'polkadot-4cut' 
  | 'zine-recap' 
  | 'classic-4cut' 
  | 'polaroid-2x2' 
  | 'wide-hero';

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
  | 'soft-glow' 
  | 'vintage-35mm' 
  | 'noir-contrast' 
  | 'disposable-90s' 
  | 'cool-digicam';

export interface FilterConfig {
  id: FilterId;
  name: string;
  subtitle: string;
  cssFilter: string;
  previewGradient: string;
}

export type FrameThemeId = 
  | 'cherry-polkadot' 
  | 'noir-polkadot' 
  | 'blush-polkadot' 
  | 'minimal-white' 
  | 'linen-paper' 
  | 'obsidian-noir';

export type FontStyleId = 'grotesk' | 'serif' | 'script' | 'mono';

export interface FrameThemeConfig {
  id: FrameThemeId;
  name: string;
  bgClass: string;
  canvasBg: string | string[];
  textColor: string;
  subtextColor: string;
  borderClass: string;
  dotColor?: string;
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
  editionText: string;
  showDateStamp: boolean;
  showPolkaDots: boolean;
  frameBorderRadius: number; // px
  stickers: StickerItem[];
}