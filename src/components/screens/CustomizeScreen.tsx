import React, { useState } from 'react';
import { 
  Palette, 
  Smile, 
  Type, 
  Calendar, 
  Trash2, 
  ArrowRight, 
  Sparkles,
  Sliders
} from 'lucide-react';
import { 
  LayoutConfig, 
  CapturedShot, 
  CustomizationSettings, 
  FrameThemeId, 
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

  const handleAddSticker = (emoji: string) => {
    soundManager.playClick();
    // Place new sticker in a random or centered aesthetic location on the frame
    const newSticker: StickerItem = {
      id: `${Date.now()}-${Math.random()}`,
      emoji,
      x: 20 + Math.floor(Math.random() * 60),
      y: 10 + Math.floor(Math.random() * 80),
      size: 32,
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              STEP 3: CUSTOMIZE STRIP
            </span>
            <span className="text-xs text-slate-400 font-mono">
              LAYOUT: {layout.name}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Space_Grotesk'] text-white">
            FINESSE YOUR <span className="text-neon-gradient">DESIGN</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            onClick={onBack}
          >
            Back to Camera
          </Button>
          <Button
            variant="cyber"
            size="md"
            glow={true}
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
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-8 bg-[#0b0b10] rounded-3xl border border-white/10 shadow-2xl relative min-h-[520px]">
          <div className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Real-time WYSIWYG Strip Preview
          </div>

          {/* Interactive Strip Container */}
          <div
            className={`relative transition-all duration-300 shadow-2xl rounded-2xl overflow-hidden select-none border ${currentTheme.borderClass} ${currentTheme.bgClass}`}
            style={{
              width: layout.id === 'grid-2x2' ? '380px' : layout.id === 'cinematic-wide' ? '460px' : '260px',
              maxWidth: '100%',
            }}
          >
            {/* Header (for Event Edition) */}
            {layout.id === 'event-edition' && (
              <div className="text-center pt-5 pb-2 px-3">
                <div
                  className="font-black text-sm tracking-widest font-['Space_Grotesk']"
                  style={{ color: currentTheme.textColor }}
                >
                  ⚡ CYBER FREQZ ⚡
                </div>
                <div
                  className="text-[9px] font-semibold tracking-wider opacity-80"
                  style={{ color: currentTheme.subtextColor }}
                >
                  SPECIAL EDITION PHOTOBOOTH
                </div>
              </div>
            )}

            {/* Photos Layout Container */}
            {layout.id === 'classic-4cut' || layout.id === 'event-edition' ? (
              <div className="p-4 sm:p-5 flex flex-col gap-3">
                {shots.map((shot, idx) => (
                  <div
                    key={shot.id}
                    className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-black/40 border border-white/10 shadow-sm"
                    style={{ borderRadius: `${settings.frameBorderRadius}px` }}
                  >
                    <img
                      src={shot.dataUrl}
                      alt={`Shot ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : layout.id === 'grid-2x2' ? (
              <div className="p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-2.5 mb-2">
                  {shots.map((shot, idx) => (
                    <div
                      key={shot.id}
                      className="relative aspect-square w-full rounded-lg overflow-hidden bg-black/40 border border-white/10 shadow-sm"
                      style={{ borderRadius: `${settings.frameBorderRadius}px` }}
                    >
                      <img
                        src={shot.dataUrl}
                        alt={`Shot ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-5">
                {shots[0] && (
                  <div
                    className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-black/40 border border-white/10 shadow-sm"
                    style={{ borderRadius: `${settings.frameBorderRadius}px` }}
                  >
                    <img
                      src={shots[0].dataUrl}
                      alt="Cinematic shot"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Footer Typography Area */}
            <div className="px-4 pb-6 pt-2 text-center">
              <h4
                className="font-extrabold text-sm sm:text-base font-['Space_Grotesk'] tracking-wide"
                style={{ color: currentTheme.textColor }}
              >
                {settings.title || 'FREQZ PHOTOBOOTH'}
              </h4>
              <p
                className="text-xs font-medium opacity-85 mt-0.5"
                style={{ color: currentTheme.subtextColor }}
              >
                {settings.subtitle || 'CAPTURE THE MOMENT'}
              </p>
              {settings.showDateStamp && (
                <div
                  className="text-[10px] font-mono font-bold mt-2 tracking-wider opacity-75"
                  style={{ color: currentTheme.textColor }}
                >
                  • {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase()} •
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
                <span className="drop-shadow-lg inline-block filter">
                  {sticker.emoji}
                </span>
                <span className="absolute -top-2 -right-2 bg-rose-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 className="w-2.5 h-2.5" />
                </span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-slate-500 mt-4 flex items-center gap-1.5">
            <Smile className="w-3.5 h-3.5 text-pink-400" />
            <span>Click any sticker on the photo strip to delete it</span>
          </div>
        </div>

        {/* Right: Customization Controls Panel */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Tabs */}
          <div className="flex rounded-2xl bg-[#121218] p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('theme')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'theme'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Frame Theme</span>
            </button>
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'text'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Text & Date</span>
            </button>
            <button
              onClick={() => setActiveTab('stickers')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'stickers'
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smile className="w-4 h-4" />
              <span>Stickers ({settings.stickers.length})</span>
            </button>
          </div>

          {/* Tab 1: Theme & Color Palette */}
          {activeTab === 'theme' && (
            <div className="glass-panel p-5 rounded-3xl border border-white/10 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                <Palette className="w-4 h-4 text-cyan-400" />
                Select Frame Background Color
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {FRAME_THEMES.map((theme) => {
                  const isSelected = settings.theme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleSelectTheme(theme.id)}
                      className={`p-3 rounded-2xl flex items-center gap-3 transition-all border text-left ${
                        isSelected
                          ? 'bg-[#181826] border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]'
                          : 'bg-[#121218]/90 hover:bg-[#181826] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl ${theme.bgClass} border border-white/20 shrink-0 shadow-sm`}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-100 truncate">
                          {theme.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {isSelected ? 'Active' : 'Click to apply'}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Corner Rounding Slider */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-pink-400" />
                    Photo Corner Curvature
                  </span>
                  <span className="font-mono text-cyan-400">{settings.frameBorderRadius}px</span>
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
                  className="w-full accent-fuchsia-500 bg-white/10 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Typography & Date */}
          {activeTab === 'text' && (
            <div className="glass-panel p-5 rounded-3xl border border-white/10 flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                <Type className="w-4 h-4 text-violet-400" />
                Customize Frame Typography
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Frame Header / Main Title
                  </label>
                  <input
                    type="text"
                    maxLength={32}
                    value={settings.title}
                    onChange={(e) =>
                      onUpdateSettings({ ...settings, title: e.target.value })
                    }
                    placeholder="e.g. FREQZ PHOTOBOOTH"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Subtitle / Event Tagline
                  </label>
                  <input
                    type="text"
                    maxLength={40}
                    value={settings.subtitle}
                    onChange={(e) =>
                      onUpdateSettings({ ...settings, subtitle: e.target.value })
                    }
                    placeholder="e.g. CAPTURE THE MOMENT"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0f0f14] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-pink-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Date Stamp Badge</div>
                      <div className="text-[10px] text-slate-400">Display today's date on the bottom</div>
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
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      settings.showDateStamp ? 'bg-fuchsia-600' : 'bg-white/10'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        settings.showDateStamp ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Stickers Palette */}
          {activeTab === 'stickers' && (
            <div className="glass-panel p-5 rounded-3xl border border-white/10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
                  <Smile className="w-4 h-4 text-pink-400" />
                  Tap to Add Aesthetic Stickers
                </h3>
                {settings.stickers.length > 0 && (
                  <button
                    onClick={handleClearStickers}
                    className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear all
                  </button>
                )}
              </div>

              <div className="grid grid-cols-6 gap-2 bg-[#0d0d12] p-3 rounded-2xl border border-white/5">
                {STICKER_PALETTE.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddSticker(emoji)}
                    className="h-11 rounded-xl bg-white/5 hover:bg-white/15 active:scale-90 text-2xl flex items-center justify-center transition-all hover:shadow-md"
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400 bg-violet-950/20 border border-violet-500/20 p-3 rounded-xl flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Tip: Added stickers appear immediately on your strip. You can tap any sticker on the preview to delete it!
                </span>
              </div>
            </div>
          )}

          {/* Quick Continue Card */}
          <div className="glass-panel-glow p-5 rounded-3xl border border-violet-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-cyan-400">DESIGN READY</div>
              <div className="text-sm font-bold text-white">Export high-resolution PNG</div>
            </div>
            <Button
              variant="cyber"
              size="lg"
              glow={true}
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
