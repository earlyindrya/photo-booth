import React, { useState } from 'react';
import { 
  Palette, 
  Smile, 
  Type, 
  Calendar, 
  Trash2, 
  ArrowRight, 
  Sparkles,
  Sliders,
  Folder
} from 'lucide-react';
import { 
  LayoutConfig, 
  CapturedShot, 
  CustomizationSettings, 
  FrameThemeId, 
  FontStyleId,
  StickerItem 
} from '../../types/photobooth';
import { FRAME_THEMES, STICKER_PALETTE } from '../../utils/mockData';
import { Button } from '../common/Button';
import { soundManager } from '../../utils/audio';

interface CustomizeScreenProps {
  layout: LayoutConfig;
  shots: CapturedShot[];
  settings: CustomizationSettings;
  onUpdateSettings: (settings: CustomizationSettings) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const CustomizeScreen: React.FC<CustomizeScreenProps> = ({
  layout,
  shots,
  settings,
  onUpdateSettings,
  onContinue,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'text' | 'stickers'>('theme');

  const currentTheme = FRAME_THEMES.find((t) => t.id === settings.theme) || FRAME_THEMES[0];

  const handleSelectTheme = (themeId: FrameThemeId) => {
    soundManager.playClick();
    onUpdateSettings({ ...settings, theme: themeId });
  };

  const handleSelectFont = (fontStyle: FontStyleId) => {
    soundManager.playClick();
    onUpdateSettings({ ...settings, fontStyle });
  };

  const handleAddSticker = (emoji: string) => {
    soundManager.playClick();
    const newSticker: StickerItem = {
      id: `${Date.now()}-${Math.random()}`,
      emoji,
      x: 18 + Math.floor(Math.random() * 64),
      y: 12 + Math.floor(Math.random() * 76),
      size: emoji === '🔴' || emoji === '⚪' ? 22 : 30,
    };
    onUpdateSettings({
      ...settings,
      stickers: [...settings.stickers, newSticker],
    });
  };

  const handleRemoveSticker = (id: string) => {
    soundManager.playClick();
    onUpdateSettings({
      ...settings,
      stickers: settings.stickers.filter((s) => s.id !== id),
    });
  };

  const handleClearStickers = () => {
    soundManager.playClick();
    onUpdateSettings({ ...settings, stickers: [] });
  };

  // Font CSS classes based on selected style
  const fontClass = {
    serif: "font-serif",
    sans: "font-sans",
    script: "font-script text-lg",
    mono: "font-mono",
  }[settings.fontStyle || 'serif'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#8B1E27]" />
              STEP 03: CURATE & CUSTOMIZE
            </span>
            <span className="text-xs text-stone-500 font-mono">
              LAYOUT: {layout.name}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900">
            Finesse your <span className="italic font-normal text-[#8B1E27]">curation</span>.
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={onBack}
          >
            Back to Studio
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={onContinue}
          >
            Review & Export
          </Button>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left/Center: Real-time Live WYSIWYG Strip Preview */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-8 bg-white/70 backdrop-blur-md rounded-3xl border border-stone-200 shadow-capsule relative min-h-[540px]">
          <div className="text-xs font-mono text-stone-500 mb-4 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#8B1E27]" />
            Real-time WYSIWYG Photostrip
          </div>

          {/* Interactive Strip Container */}
          <div
            className={`relative transition-all duration-300 shadow-polaroid rounded-2xl overflow-hidden select-none border ${currentTheme.borderClass} ${currentTheme.bgClass} ${
              settings.theme === 'baroque-gold' || layout.id === 'vintage-baroque' ? 'baroque-gold-border' : ''
            }`}
            style={{
              width: layout.id === 'grid-2x2' ? '390px' : layout.id === 'cinematic-wide' ? '460px' : '275px',
              maxWidth: '100%',
            }}
          >
            {/* Mac OS Window Header if theme or layout is Y2K (Ref 4) */}
            {(settings.theme === 'y2k-mac' || layout.id === 'mac-window-strip') && (
              <div className="mac-window-chrome px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                </div>
                <div className="font-mono text-[10px] text-zinc-700 font-semibold truncate px-2">
                  recap_vol08.strip
                </div>
                <Folder className="w-3.5 h-3.5 text-blue-500 fill-blue-500" />
              </div>
            )}

            {/* Zine Header if theme or layout is Zine (Ref 5) */}
            {(settings.theme === 'zine-cherry' || layout.id === 'zine-moodboard') && (
              <div className="px-4 pt-4 pb-1 flex items-center justify-between">
                <div className="font-serif italic text-xs font-bold text-[#8B1E27]">
                  things i loved (recap)
                </div>
                <span className="w-3 h-3 rounded-full bg-[#D92D20] shadow-sm" />
              </div>
            )}

            {/* Photos Layout Container */}
            {layout.id === 'classic-4cut' || layout.id === 'mac-window-strip' ? (
              <div className="p-4 flex flex-col gap-3">
                {shots.map((shot, idx) => (
                  <div
                    key={shot.id}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 border border-stone-300 shadow-sm"
                    style={{ borderRadius: `${settings.frameBorderRadius}px` }}
                  >
                    <img
                      src={shot.dataUrl}
                      alt={`Shot ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* Number tag badge in corner (Ref 5) */}
                    <span className="absolute top-1.5 left-2 text-[9px] font-mono text-zinc-800 bg-white/80 px-1.5 py-0.2 rounded shadow-xs">
                      ({idx + 1})
                    </span>
                  </div>
                ))}
              </div>
            ) : layout.id === 'zine-moodboard' ? (
              <div className="p-4 flex flex-col gap-3.5">
                {shots.map((shot, idx) => (
                  <div
                    key={shot.id}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 border border-stone-800 shadow-sm"
                    style={{ borderRadius: `${settings.frameBorderRadius}px` }}
                  >
                    <img
                      src={shot.dataUrl}
                      alt={`Shot ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-1.5 right-2 text-[10px] font-mono font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                      ({idx + 1})
                    </span>
                  </div>
                ))}
              </div>
            ) : layout.id === 'grid-2x2' ? (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-2.5 mb-2">
                  {shots.map((shot, idx) => (
                    <div
                      key={shot.id}
                      className="relative aspect-square w-full overflow-hidden bg-stone-100 border border-stone-300 shadow-sm"
                      style={{ borderRadius: `${settings.frameBorderRadius}px` }}
                    >
                      <img
                        src={shot.dataUrl}
                        alt={`Shot ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 left-1.5 text-[9px] font-mono text-zinc-800 bg-white/85 px-1 rounded">
                        ({idx + 1})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-5">
                {shots[0] && (
                  <div
                    className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 border border-stone-300 shadow-sm"
                    style={{ borderRadius: `${settings.frameBorderRadius}px` }}
                  >
                    <img
                      src={shots[0].dataUrl}
                      alt="Hero shot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Footer Typography Area */}
            <div className="px-4 pb-5 pt-1 text-center">
              <h4
                className={`text-sm sm:text-base font-bold tracking-tight ${fontClass}`}
                style={{ color: currentTheme.textColor }}
              >
                {settings.title || 'capsule photobooth'}
              </h4>
              <p
                className="text-xs font-medium opacity-85 mt-0.5 font-sans"
                style={{ color: currentTheme.subtextColor }}
              >
                {settings.subtitle || 'monthly recap • studio moments'}
              </p>
              
              {/* Handwritten script sign-off (Ref 2 "smm goza") */}
              {settings.fontStyle === 'script' && (
                <div className="font-script text-xl mt-1 select-none" style={{ color: currentTheme.textColor }}>
                  smm goza • atelier
                </div>
              )}

              {settings.showDateStamp && (
                <div
                  className="text-[9px] font-mono font-semibold mt-2 tracking-wider opacity-75 uppercase"
                  style={{ color: currentTheme.textColor }}
                >
                  • {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })} • vol.08
                </div>
              )}
            </div>

            {/* Rendered Stickers Overlay on the Strip */}
            {settings.stickers.map((sticker) => (
              <div
                key={sticker.id}
                onClick={() => handleRemoveSticker(sticker.id)}
                className="absolute cursor-pointer select-none transition-transform hover:scale-125 group z-20"
                style={{
                  left: `${sticker.x}%`,
                  top: `${sticker.y}%`,
                  fontSize: `${sticker.size}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                title="Click sticker to remove"
              >
                <span className="drop-shadow-sm inline-block filter">
                  {sticker.emoji}
                </span>
                <span className="absolute -top-2 -right-2 bg-stone-900 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-2.5 h-2.5" />
                </span>
              </div>
            ))}
          </div>

          <div className="text-[11px] font-mono text-stone-500 mt-4 flex items-center gap-1.5">
            <Smile className="w-3.5 h-3.5 text-[#8B1E27]" />
            <span>Click any sticker on the photo strip to remove it</span>
          </div>
        </div>

        {/* Right: Customization Controls Panel */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Tabs */}
          <div className="flex rounded-full bg-stone-200/70 p-1 border border-stone-300">
            <button
              onClick={() => setActiveTab('theme')}
              className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'theme'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-stone-600 hover:text-zinc-900'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Frame Theme</span>
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'text'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-stone-600 hover:text-zinc-900'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Typography</span>
            </button>
            <button
              onClick={() => setActiveTab('stickers')}
              className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'stickers'
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-stone-600 hover:text-zinc-900'
              }`}
            >
              <Smile className="w-3.5 h-3.5" />
              <span>Stickers ({settings.stickers.length})</span>
            </button>
          </div>

          {/* Tab 1: Theme & Color Palette */}
          {activeTab === 'theme' && (
            <div className="paper-card p-5 rounded-3xl border border-stone-200 flex flex-col gap-4">
              <h3 className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-[#8B1E27]" />
                Select Frame Aesthetic Preset
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {FRAME_THEMES.map((theme) => {
                  const isSelected = settings.theme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleSelectTheme(theme.id)}
                      className={`p-3 rounded-2xl flex items-center gap-2.5 transition-all border text-left ${
                        isSelected
                          ? 'bg-white border-zinc-900 shadow-md ring-1 ring-zinc-900'
                          : 'bg-white/70 hover:bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xl ${theme.bgClass} border border-stone-300 shrink-0 shadow-xs`}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-zinc-900 truncate">
                          {theme.name}
                        </div>
                        <div className="text-[10px] font-mono text-stone-500">
                          {theme.accentBadge || 'Theme'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Corner Rounding Slider */}
              <div className="pt-3 border-t border-stone-200">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#8B1E27]" />
                    Photo Corner Radius
                  </span>
                  <span className="font-mono text-zinc-900 font-bold">{settings.frameBorderRadius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={settings.frameBorderRadius}
                  onChange={(e) =>
                    onUpdateSettings({
                      ...settings,
                      frameBorderRadius: Number(e.target.value),
                    })
                  }
                  className="w-full accent-zinc-900 bg-stone-200 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Typography & Notes */}
          {activeTab === 'text' && (
            <div className="paper-card p-5 rounded-3xl border border-stone-200 flex flex-col gap-4">
              <h3 className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
                <Type className="w-3.5 h-3.5 text-[#8B1E27]" />
                Select Font & Strip Titles
              </h3>

              {/* Font Family Selector */}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                  Editorial Font Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'serif', label: 'Editorial Serif', sub: 'Playfair Display', fontClass: 'font-serif' },
                    { id: 'sans', label: 'Modern Sans', sub: 'Plus Jakarta', fontClass: 'font-sans' },
                    { id: 'script', label: 'Handwritten Script', sub: 'smm goza style', fontClass: 'font-script text-base' },
                    { id: 'mono', label: 'Typewriter Mono', sub: 'Space Mono', fontClass: 'font-mono' }
                  ].map((font) => (
                    <button
                      key={font.id}
                      onClick={() => handleSelectFont(font.id as FontStyleId)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        settings.fontStyle === font.id
                          ? 'bg-white border-zinc-900 shadow-sm ring-1 ring-zinc-900'
                          : 'bg-white/60 hover:bg-white border-stone-200'
                      }`}
                    >
                      <div className={`text-xs font-bold text-zinc-900 ${font.fontClass}`}>
                        {font.label}
                      </div>
                      <div className="text-[10px] text-stone-400 font-sans">{font.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">
                    Frame Header / Main Title
                  </label>
                  <input
                    type="text"
                    maxLength={32}
                    value={settings.title}
                    onChange={(e) =>
                      onUpdateSettings({ ...settings, title: e.target.value })
                    }
                    placeholder="e.g. things i loved"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-zinc-900 text-sm focus:outline-none focus:border-zinc-900 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">
                    Subtitle / Event Tagline
                  </label>
                  <input
                    type="text"
                    maxLength={40}
                    value={settings.subtitle}
                    onChange={(e) =>
                      onUpdateSettings({ ...settings, subtitle: e.target.value })
                    }
                    placeholder="e.g. (april edition)"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-zinc-900 text-sm focus:outline-none focus:border-zinc-900 shadow-sm"
                  />
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#8B1E27]" />
                    <div>
                      <div className="text-xs font-bold text-zinc-900">Date Stamp Badge</div>
                      <div className="text-[10px] text-stone-500">Show date and edition number on strip</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      onUpdateSettings({
                        ...settings,
                        showDateStamp: !settings.showDateStamp,
                      });
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      settings.showDateStamp ? 'bg-zinc-900' : 'bg-stone-300'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.showDateStamp ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Stickers Palette */}
          {activeTab === 'stickers' && (
            <div className="paper-card p-5 rounded-3xl border border-stone-200 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5 text-[#8B1E27]" />
                  Aesthetic Stickers Palette
                </h3>
                {settings.stickers.length > 0 && (
                  <button
                    onClick={handleClearStickers}
                    className="text-xs text-[#8B1E27] hover:underline font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear all
                  </button>
                )}
              </div>

              <div className="grid grid-cols-6 gap-2 bg-[#FAF7F2] p-3 rounded-2xl border border-stone-200">
                {STICKER_PALETTE.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddSticker(emoji)}
                    className="h-10 rounded-xl bg-white hover:bg-stone-100 active:scale-90 text-xl flex items-center justify-center transition-all border border-stone-200/80 shadow-xs"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <div className="text-xs text-stone-600 bg-white border border-stone-200 p-3 rounded-xl flex items-start gap-2 shadow-xs">
                <span className="text-base">📌</span>
                <span className="leading-relaxed">
                  Tap any sticker above to stick it to your photostrip. You can tap placed stickers directly on the preview to delete them!
                </span>
              </div>
            </div>
          )}

          {/* Quick Continue Card (Capsule style) */}
          <div className="bg-white/90 backdrop-blur-md p-5 rounded-3xl border border-stone-200 shadow-capsule flex items-center justify-between">
            <div>
              <div className="text-[11px] font-mono font-bold text-[#8B1E27] uppercase">Curated & Ready</div>
              <div className="text-sm font-bold text-zinc-900">Export high-resolution strip</div>
            </div>
            <Button
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={onContinue}
            >
              Export Strip
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};