import React, { useState } from 'react';
import { Camera, Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';
import { StepId } from '../types/photobooth';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentStep: StepId;
  onReset: () => void;
  onStepClick?: (step: StepId) => void;
}

const STEPS: { id: StepId; label: string }[] = [
  { id: 'start', label: 'Start' },
  { id: 'layout', label: 'Frame' },
  { id: 'camera', label: 'Capture' },
  { id: 'customize', label: 'Customize' },
  { id: 'download', label: 'Export' },
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
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/[0.08] px-4 lg:px-8 py-3.5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-cyan-400 p-[1.5px] shadow-lg shadow-purple-900/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0d0d12] rounded-[10px] flex items-center justify-center">
              <Camera className="w-5 h-5 text-cyan-400 group-hover:text-fuchsia-400 transition-colors" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Space_Grotesk'] font-extrabold text-xl tracking-wider text-white">
                FREQZ
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 tracking-widest uppercase">
                STUDIO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-tight hidden sm:block">Digital Photobooth Experience</p>
          </div>
        </div>

        {/* Step Indicator (Desktop/Tablet) */}
        {currentStep !== 'start' && (
          <div className="hidden md:flex items-center gap-1 bg-[#121218]/90 px-3 py-1.5 rounded-full border border-white/10 shadow-inner">
            {STEPS.map((step, idx) => {
              const isActive = step.id === currentStep;
              const isPassed = idx < currentIdx;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-sm shadow-purple-500/40'
                        : isPassed
                        ? 'text-cyan-400 hover:text-cyan-300'
                        : 'text-slate-500'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? 'bg-white text-purple-700'
                          : isPassed
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : 'bg-white/5 text-slate-500'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span>{step.label}</span>
                  </div>

                  {idx < STEPS.length - 1 && (
                    <div
                      className={`w-4 h-[2px] mx-1 transition-colors ${
                        idx < currentIdx ? 'bg-cyan-500/50' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Audio toggle button */}
          <button
            onClick={handleToggleMute}
            className={`p-2.5 rounded-xl border transition-all ${
              isMuted
                ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                : 'bg-violet-950/40 border-violet-500/40 text-cyan-300 shadow-sm shadow-violet-800/30'
            }`}
            title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Reset button if inside flow */}
          {currentStep !== 'start' && (
            <button
              onClick={() => {
                soundManager.playClick();
                if (window.confirm('Restart session? Unsaved photos will be reset.')) {
                  onReset();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-rose-950/30 hover:border-rose-500/40 border border-white/10 text-xs font-medium text-slate-300 hover:text-rose-300 transition-all"
              title="Restart Session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}

          {/* Cyber Accent Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-500/10 to-pink-500/10 border border-purple-500/20 text-xs font-medium text-purple-300">
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>K-Booth 2026</span>
          </div>
        </div>
      </div>
    </header>
  );
};
