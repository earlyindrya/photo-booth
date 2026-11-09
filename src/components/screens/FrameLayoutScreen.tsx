import React from 'react';
import { LayoutConfig } from '../../types/photobooth';
import { LAYOUT_OPTIONS } from '../../utils/mockData';
import { Button } from '../common/Button';
import { ArrowRight, Check } from 'lucide-react';

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
      {/* Header (Ref 2, 3, 5 Editorial Style) */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 border border-stone-200 text-xs font-mono text-stone-600 mb-3 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E27]" />
          <span>STEP 01: SELECT FORMAT</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-zinc-900 tracking-tight">
          Choose your <span className="italic font-normal text-[#8B1E27]">layout</span> format.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 font-sans">
          Select how your memories will be composed. Each layout has distinct print proportions, shot counts, and frame styling.
        </p>
      </div>

      {/* Grid of Layout Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {LAYOUT_OPTIONS.map((layout) => {
          const isSelected = selectedLayout.id === layout.id;

          return (
            <div
              key={layout.id}
              onClick={() => onSelectLayout(layout)}
              className={`relative cursor-pointer rounded-3xl p-5 transition-all duration-200 flex flex-col justify-between group ${
                isSelected
                  ? 'bg-white border-2 border-zinc-900 shadow-capsule-lg scale-[1.01]'
                  : 'bg-white/70 hover:bg-white border border-stone-200/90 hover:border-stone-400 shadow-sm'
              }`}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#F5EFE6] text-stone-700 uppercase tracking-wider">
                  {layout.badge || 'Standard'}
                </span>
                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-zinc-900 text-white flex items-center justify-center shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border border-stone-300 group-hover:border-stone-500" />
                )}
              </div>

              {/* Wireframe Mockup Preview */}
              <div className="w-full h-52 bg-[#F9F7F2] rounded-2xl border border-stone-200 p-3 flex flex-col items-center justify-center relative overflow-hidden mb-4 group-hover:border-stone-300 transition-colors">
                
                {/* Visual Representation based on layout */}
                {layout.id === 'classic-4cut' && (
                  <div className="w-20 h-full bg-white rounded-lg border border-stone-300 p-1.5 flex flex-col gap-1 shadow-sm">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex-1 bg-stone-100 rounded-[3px] border border-stone-200 flex items-center justify-center"
                      >
                        <span className="text-[9px] font-mono text-stone-400">#{i}</span>
                      </div>
                    ))}
                    <div className="h-2 w-full bg-stone-100 rounded-[2px]" />
                  </div>
                )}

                {layout.id === 'zine-moodboard' && (
                  <div className="w-36 h-full bg-[#FAF6F0] rounded-xl border border-stone-300 p-2 flex flex-col justify-between relative shadow-sm">
                    <div className="flex items-center justify-between px-1">
                      <span className="font-serif italic text-[9px] text-[#8B1E27] font-bold">things i loved</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D92D20]" />
                    </div>
                    <div className="space-y-1.5 my-1">
                      <div className="h-10 bg-white rounded border border-stone-300 flex items-center justify-center text-[8px] font-mono text-stone-400">
                        (1)
                      </div>
                      <div className="h-10 bg-white rounded border border-stone-300 flex items-center justify-center text-[8px] font-mono text-stone-400">
                        (2)
                      </div>
                      <div className="h-10 bg-white rounded border border-stone-300 flex items-center justify-center text-[8px] font-mono text-stone-400">
                        (3)
                      </div>
                    </div>
                    <div className="text-[8px] font-mono text-stone-400 text-center">vol.08 (recap)</div>
                  </div>
                )}

                {layout.id === 'mac-window-strip' && (
                  <div className="w-24 h-full bg-white rounded-lg border border-stone-300 overflow-hidden flex flex-col shadow-sm">
                    <div className="mac-window-chrome px-1.5 py-1 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <div className="p-1 flex flex-col gap-1 flex-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex-1 bg-stone-100 rounded-[2px] border border-blue-200 flex items-center justify-center text-[8px] font-mono text-blue-600">
                          #{i}
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#B9D6F3] text-[7px] font-mono px-1 py-0.5 text-center font-bold">
                      rec.01
                    </div>
                  </div>
                )}

                {layout.id === 'vintage-baroque' && (
                  <div className="w-32 h-40 bg-[#FAF7F2] p-2 rounded-xl baroque-gold-border shadow-vintage-gold flex flex-col items-center justify-center text-center">
                    <div className="w-full h-24 bg-stone-100 rounded border border-amber-200 flex items-center justify-center mb-1">
                      <span className="font-serif italic text-xs text-[#541016]">Portrait</span>
                    </div>
                    <div className="font-serif italic text-[9px] text-[#541016]">Museum Frame</div>
                    <div className="font-script text-xs text-stone-500">smm goza</div>
                  </div>
                )}

                {layout.id === 'grid-2x2' && (
                  <div className="w-36 h-40 bg-white rounded-xl border border-stone-300 p-2 flex flex-col shadow-sm">
                    <div className="grid grid-cols-2 gap-1.5 flex-1 mb-1.5">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="bg-stone-100 rounded-md border border-stone-200 flex items-center justify-center"
                        >
                          <span className="text-[9px] font-mono text-stone-400">#{i}</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-2 w-full bg-stone-100 rounded flex items-center justify-center">
                      <div className="w-10 h-0.5 bg-stone-300 rounded-full" />
                    </div>
                  </div>
                )}

                {layout.id === 'cinematic-wide' && (
                  <div className="w-44 h-32 bg-white rounded-xl border border-stone-300 p-2 flex flex-col shadow-sm">
                    <div className="flex-1 bg-stone-100 rounded-lg border border-stone-200 flex items-center justify-center mb-1.5">
                      <span className="text-xs font-mono text-stone-500">16:9 HERO</span>
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <div className="w-14 h-1 bg-stone-300 rounded-full" />
                      <div className="w-6 h-1 bg-stone-200 rounded-full" />
                    </div>
                  </div>
                )}

                {/* Shots count badge */}
                <div className="absolute bottom-2 right-2 text-[10px] font-mono text-stone-600 bg-white/90 px-2 py-0.5 rounded-full border border-stone-200 shadow-sm">
                  {layout.shotsCount} {layout.shotsCount === 1 ? 'shot' : 'shots'}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold text-zinc-900 font-serif mb-0.5 group-hover:text-[#8B1E27] transition-colors">
                  {layout.name}
                </h3>
                <p className="text-xs font-medium text-[#8B1E27] mb-1.5">{layout.tagline}</p>
                <p className="text-xs text-stone-500 leading-relaxed font-sans line-clamp-2">
                  {layout.description}
                </p>
              </div>

              {/* Selection Bar */}
              <div className="mt-4 pt-3 border-t border-stone-200/80 flex items-center justify-between text-xs">
                <span className="text-stone-400 font-mono text-[11px]">{layout.aspectRatioLabel}</span>
                <span className={`font-semibold text-xs ${isSelected ? 'text-zinc-900' : 'text-stone-400'}`}>
                  {isSelected ? 'Selected' : 'Select'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer (Capsule Glass Style - Ref 1) */}
      <div className="bg-white/80 backdrop-blur-xl p-5 sm:p-6 rounded-3xl border border-stone-200 shadow-capsule flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-11 h-11 rounded-2xl bg-zinc-900 text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="font-serif italic font-bold text-base">At</span>
          </div>
          <div>
            <div className="text-[11px] font-mono font-bold text-[#8B1E27] uppercase tracking-wider">
              Ready to shoot
            </div>
            <div className="text-sm font-bold text-zinc-900">
              Selected: <span className="font-serif italic">{selectedLayout.name}</span> ({selectedLayout.shotsCount} {selectedLayout.shotsCount === 1 ? 'Shot' : 'Shots'})
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            size="md"
            onClick={onBack}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={onContinue}
            className="w-full sm:w-auto"
          >
            Continue to Studio
          </Button>
        </div>
      </div>
    </div>
  );
};