import React from 'react';
import { LayoutConfig } from '../../types/photobooth';
import { LAYOUT_OPTIONS } from '../../utils/mockData';
import { Button } from '../common/Button';
import { ArrowRight, CheckCircle2, Sparkles, Layers } from 'lucide-react';

interface FrameLayoutScreenProps {
  selectedLayout: LayoutConfig;
  onSelectLayout: (layout: LayoutConfig) => void;
  onContinue: () => void;
  onBack: () => void;
}

export const FrameLayoutScreen: React.FC<FrameLayoutScreenProps> = ({
  selectedLayout,
  onSelectLayout,
  onContinue,
  onBack,
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/30 text-xs font-semibold text-violet-300 mb-3">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>STEP 1: SELECT FRAME LAYOUT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk'] text-white tracking-tight">
          CHOOSE YOUR <span className="text-neon-gradient">BOOTH FORMAT</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          Select how your photo strip will be composed. Each layout has dedicated dimensions, shot counts, and print geometry.
        </p>
      </div>

      {/* Grid of Layout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {LAYOUT_OPTIONS.map((layout) => {
          const isSelected = selectedLayout.id === layout.id;

          return (
            <div
              key={layout.id}
              onClick={() => onSelectLayout(layout)}
              className={`relative cursor-pointer rounded-3xl p-5 transition-all duration-300 flex flex-col justify-between group ${
                isSelected
                  ? 'bg-[#151522] border-2 border-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.4)] scale-[1.02]'
                  : 'bg-[#101017]/80 hover:bg-[#151522] border border-white/10 hover:border-violet-500/40 hover:scale-[1.01]'
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
                  {layout.badge || 'Standard'}
                </span>
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-fuchsia-400 fill-fuchsia-400/20 animate-in zoom-in" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-violet-400/50" />
                )}
              </div>

              {/* Wireframe Mockup Preview */}
              <div className="w-full h-52 bg-[#09090d] rounded-2xl border border-white/[0.08] p-3 flex flex-col items-center justify-center relative overflow-hidden mb-5 group-hover:border-violet-500/30 transition-colors">
                {/* Visual representation based on layout */}
                {layout.id === 'classic-4cut' && (
                  <div className="w-24 h-full bg-[#181824] rounded-lg border border-white/10 p-1.5 flex flex-col gap-1 shadow-md">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-tr from-violet-900/60 to-pink-900/40 rounded-[4px] border border-white/10 flex items-center justify-center"
                      >
                        <span className="text-[9px] font-mono text-slate-400">#{i}</span>
                      </div>
                    ))}
                    <div className="h-2.5 w-full bg-white/5 rounded-[2px] flex items-center justify-center">
                      <div className="w-8 h-0.5 bg-violet-400/50 rounded-full" />
                    </div>
                  </div>
                )}

                {layout.id === 'grid-2x2' && (
                  <div className="w-40 h-44 bg-[#181824] rounded-xl border border-white/10 p-2 flex flex-col shadow-md">
                    <div className="grid grid-cols-2 gap-1.5 flex-1 mb-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="bg-gradient-to-tr from-pink-900/60 to-purple-900/40 rounded-md border border-white/10 flex items-center justify-center"
                        >
                          <span className="text-[9px] font-mono text-slate-400">#{i}</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-3 w-full bg-white/5 rounded flex items-center justify-center">
                      <div className="w-12 h-1 bg-pink-400/40 rounded-full" />
                    </div>
                  </div>
                )}

                {layout.id === 'cinematic-wide' && (
                  <div className="w-48 h-36 bg-[#181824] rounded-xl border border-white/10 p-2 flex flex-col shadow-md">
                    <div className="flex-1 bg-gradient-to-tr from-cyan-950 via-slate-900 to-violet-950 rounded-lg border border-white/10 flex items-center justify-center mb-1.5">
                      <span className="text-xs font-mono text-cyan-300">16:9 HERO</span>
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <div className="w-16 h-1 bg-cyan-400/40 rounded-full" />
                      <div className="w-8 h-1 bg-white/20 rounded-full" />
                    </div>
                  </div>
                )}

                {layout.id === 'event-edition' && (
                  <div className="w-24 h-full bg-[#181824] rounded-lg border border-cyan-500/30 p-1.5 flex flex-col gap-1 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    <div className="h-3 w-full bg-cyan-500/20 rounded-[2px] flex items-center justify-center">
                      <Sparkles className="w-2 h-2 text-cyan-300" />
                    </div>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-tr from-purple-900/70 to-cyan-900/50 rounded-[4px] border border-cyan-400/20 flex items-center justify-center"
                      >
                        <span className="text-[9px] font-mono text-cyan-300">#{i}</span>
                      </div>
                    ))}
                    <div className="h-2 w-full bg-pink-500/20 rounded-[2px]" />
                  </div>
                )}

                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-slate-500 bg-black/40 px-1.5 py-0.5 rounded border border-white/5">
                  {layout.shotsCount} {layout.shotsCount === 1 ? 'shot' : 'shots'}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-lg font-bold text-white font-['Space_Grotesk'] mb-0.5 group-hover:text-cyan-300 transition-colors">
                  {layout.name}
                </h3>
                <p className="text-xs font-medium text-pink-400 mb-2">{layout.tagline}</p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {layout.description}
                </p>
              </div>

              {/* Selection Bar */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">{layout.aspectRatioLabel}</span>
                <span className={`font-semibold ${isSelected ? 'text-violet-400' : 'text-slate-500'}`}>
                  {isSelected ? 'Selected' : 'Click to select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="glass-panel-glow p-5 sm:p-6 rounded-3xl border border-violet-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center text-white shrink-0 shadow-lg shadow-purple-900/40">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Ready for Studio</div>
            <div className="text-base font-bold text-white">
              Selected: <span className="text-pink-400">{selectedLayout.name}</span> ({selectedLayout.shotsCount} {selectedLayout.shotsCount === 1 ? 'Shot' : 'Shots'})
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="secondary"
            size="lg"
            onClick={onBack}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
          <Button
            variant="cyber"
            size="lg"
            glow={true}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            onClick={onContinue}
            className="w-full sm:w-auto"
          >
            Continue to Camera
          </Button>
        </div>
      </div>
    </div>
  );
};
