import React, { useState } from 'react';
import { Camera, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { StepId } from '../types/photobooth';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentStep: StepId;
  onReset: () => void;
  onStepClick?: (step: StepId) => void;
}

const STEPS: { id: StepId; label: string; number: string }[] = [
  { id: 'start', label: 'Start', number: '01' },
  { id: 'layout', label: 'Format', number: '02' },
  { id: 'camera', label: 'Studio', number: '03' },
  { id: 'customize', label: 'Curate', number: '04' },
  { id: 'download', label: 'Export', number: '05' },
];

export const Navbar: React.FC<NavbarProps> = ({ currentStep, onReset }) => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  const handleToggleMute = () => {
    const next = soundManager.toggleMute();
    setIsMuted(next);
  };

  const getStepIndex = (step: StepId) => STEPS.findIndex((s) => s.id === step);
  const currentIdx = getStepIndex(currentStep);

  return (
    <header className="sticky top-0 z-40 w-full pt-3 px-4 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-3 bg-white/75 backdrop-blur-xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.05)] rounded-full px-4 sm:px-6 py-2.5 pointer-events-auto">
        
        {/* Brand (Inspired by Capsule / Ref 1 & Editorial Ref 2) */}
        <div 
          onClick={onReset}
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-zinc-900 text-white shadow-sm group-hover:scale-105 transition-transform">
            <Camera className="w-4 h-4 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#8B1E27]" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-serif font-bold text-lg tracking-tight text-zinc-900">
              capsule
            </span>
            <span className="text-[11px] font-sans font-medium text-stone-500 lowercase tracking-wide hidden sm:inline">
              booth atelier
            </span>
          </div>
        </div>

        {/* Step Indicator Pill (Editorial numbering like Ref 2 & 5) */}
        {currentStep !== 'start' && (
          <nav aria-label="Workflow progress" className="hidden md:flex items-center gap-1 bg-[#F5EFE6]/80 px-2.5 py-1 rounded-full border border-stone-200/60 shadow-inner">
            {STEPS.slice(1).map((step, idx) => {
              const actualIdx = idx + 1;
              const isActive = step.id === currentStep;
              const isPassed = actualIdx < currentIdx;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all ${
                      isActive
                        ? 'bg-[#18181B] text-white font-semibold shadow-sm'
                        : isPassed
                        ? 'text-zinc-900 font-medium hover:text-[#8B1E27]'
                        : 'text-stone-400 font-normal'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-mono ${
                        isActive
                          ? 'text-zinc-200'
                          : isPassed
                          ? 'text-[#8B1E27] font-semibold'
                          : 'text-stone-400'
                      }`}
                    >
                      ({step.number})
                    </span>
                    <span className="lowercase">{step.label}</span>
                  </div>

                  {idx < STEPS.length - 2 && (
                    <span className="text-stone-300 text-[10px] mx-0.5">•</span>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Audio toggle button */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-full border transition-all ${
              isMuted
                ? 'bg-stone-100 border-stone-200 text-stone-400 hover:text-zinc-800'
                : 'bg-white border-stone-200 text-zinc-800 shadow-sm'
            }`}
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Reset button */}
          {currentStep !== 'start' && (
            <button
              onClick={() => {
                soundManager.playClick();
                if (window.confirm('Start a new session? Current photos will be cleared.')) {
                  onReset();
                }
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200 text-xs font-medium text-stone-600 hover:text-zinc-900 transition-all shadow-sm"
              title="New Session"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline lowercase">reset</span>
            </button>
          )}

          {/* Editorial Edition Tag (Ref 5: edition 08.26 vol.08) */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] border border-stone-200 text-[11px] font-mono text-stone-600">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E27]" />
            <span>vol. 08 • recap</span>
          </div>
        </div>

      </div>
    </header>
  );
};