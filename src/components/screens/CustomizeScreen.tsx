import React, { useState } from 'react';
import { LayoutConfig, CapturedShot, CustomizationSettings, FilterId } from '../../types/photobooth';
import { FILTER_OPTIONS } from '../../utils/mockData';
import { soundManager } from '../../utils/audio';

interface CustomizeScreenProps {
  layout: LayoutConfig;
  shots: CapturedShot[];
  settings: CustomizationSettings;
  onUpdateSettings: (settings: CustomizationSettings) => void;
  onContinue: () => void;
  onBack: () => void;
}

const DISPLAYED_FILTERS = [
  { id: 'cool-digicam', label: '2000' },
  { id: 'soft-glow', label: 'GLOW' },
  { id: 'noir-contrast', label: 'B&W' },
  { id: 'normal', label: 'BASIC' },
];

export const CustomizeScreen: React.FC<CustomizeScreenProps> = ({
  layout,
  shots,
  settings,
  onUpdateSettings,
  onContinue,
  onBack: _onBack,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterId>('normal');
  const previewShot = shots[shots.length - 1] || shots[0];

  const handleSelectFilter = (filterId: string) => {
    soundManager.playClick();
    setActiveFilter(filterId as FilterId);
    // Also store filter in settings for reference
    onUpdateSettings({ ...settings, editionText: filterId });
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-2 flex flex-col items-center gap-4">

      {/* Camera illustration with photo preview */}
      <div className="relative w-full" style={{ maxWidth: 360 }}>
        <div className="relative bg-zinc-900 rounded-2xl border-2 border-zinc-800 shadow-2xl overflow-hidden p-2.5">
          {/* Top bumps */}
          <div className="absolute -top-2 left-8 w-6 h-4 bg-zinc-800 rounded-t-md" />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-5 bg-zinc-700 rounded-t-md" />
          <div className="absolute -top-2 right-8 w-6 h-4 bg-zinc-800 rounded-t-md" />

          {/* Tassel */}
          <div className="absolute -left-1 top-1/3 flex flex-col items-center gap-0.5 z-20">
            <div className="flex gap-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8201A]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C8201A]" />
            </div>
            <div className="flex gap-1 mt-0.5">
              <div className="w-1 h-1 rounded-full bg-white" />
              <div className="w-1 h-1 rounded-full bg-white" />
              <div className="w-1 h-1 rounded-full bg-white" />
            </div>
            <div className="w-0.5 h-6 bg-[#C8201A]" />
            <div className="text-[#C8201A] text-xs">🧧</div>
          </div>

          <div className="flex gap-2">
            {/* Viewfinder with photo + shot count badge */}
            <div className="relative flex-1 aspect-[4/3] bg-zinc-950 rounded-xl overflow-hidden border border-zinc-700">
              {previewShot ? (
                <img
                  src={previewShot.dataUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  style={{ filter: FILTER_OPTIONS.find(f => f.id === activeFilter)?.cssFilter || 'none' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-900">
                  <span className="text-zinc-500 text-xs">No photo</span>
                </div>
              )}

              {/* Shot count overlay */}
              <div className="absolute top-2 left-2 font-bold text-amber-400 font-dotbooth text-lg drop-shadow-lg">
                {shots.length}/{layout.shotsCount}
              </div>
            </div>

            {/* Right side panel */}
            <div className="relative w-16 bg-[#7B1D1D] rounded-xl flex flex-col items-center justify-between py-3 overflow-hidden border border-[#5C1010]"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px)', backgroundSize: '8px 8px' }}>
              <div className="flex flex-col gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700" />
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-950 border-2 border-zinc-700 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-600 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2x2 Filter grid */}
      <div className="grid grid-cols-2 gap-2.5 w-full">
        {DISPLAYED_FILTERS.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => handleSelectFilter(filter.id)}
              className={`py-3 rounded-full border-2 font-bold text-sm transition-all ${
                isActive
                  ? 'bg-zinc-900 border-zinc-900 text-[#C8201A]'
                  : 'bg-white border-zinc-300 text-zinc-800 hover:border-zinc-500'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        onClick={onContinue}
        className="w-full py-4 rounded-full bg-[#C8201A] text-white font-bold text-base shadow-lg hover:bg-[#A01818] transition-colors"
      >
        Next
      </button>
    </div>
  );
};
