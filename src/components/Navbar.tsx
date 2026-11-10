import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { StepId } from '../types/photobooth';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentStep: StepId;
  onReset: () => void;
  onBack?: () => void;
}

const STEP_LABELS: Partial<Record<StepId, string>> = {
  layout: '(1) CHOOSE A FRAME · 4 FRAMES · 4 FILTERS',
  camera: '(2) SNAP 4 SHOTS',
  customize: '(3) PICK A FILTER',
  download: '(4) PRINT & DOWNLOAD',
};

export const Navbar: React.FC<NavbarProps> = ({ currentStep, onReset, onBack }) => {
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const stepLabel = STEP_LABELS[currentStep];
  const showBack = currentStep !== 'start';

  return (
    <header className="w-full px-5 pt-5 pb-2">
      <div className="max-w-2xl mx-auto">
        {/* Top row */}
        <div className="relative flex items-center justify-center min-h-[36px]">
          {/* Back button */}
          {showBack && (
            <button
              onClick={onBack || onReset}
              className="absolute left-0 flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-950 transition-colors"
            >
              <span>←</span>
              <span>Back</span>
            </button>
          )}

          {/* Logo */}
          <div
            onClick={onReset}
            className="cursor-pointer select-none flex items-baseline gap-0.5"
          >
            <span className="font-dotbooth text-2xl font-bold text-zinc-900 tracking-tight">
              dot booth
            </span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#C8201A] mb-0.5 ml-0.5" />
          </div>

          {/* Mute */}
          <button
            onClick={() => { const next = soundManager.toggleMute(); setIsMuted(next); }}
            className="absolute right-0 p-1.5 rounded-full text-zinc-500 hover:text-zinc-800 transition-colors"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Step label */}
        {stepLabel && (
          <p className="text-center text-[11px] font-semibold tracking-[0.12em] text-[#C8201A] uppercase mt-1">
            {stepLabel}
          </p>
        )}
      </div>
    </header>
  );
};
