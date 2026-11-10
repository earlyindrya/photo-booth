import React from 'react';
import { LayoutConfig } from '../../types/photobooth';
import { LAYOUT_OPTIONS } from '../../utils/mockData';

interface FrameLayoutScreenProps {
  selectedLayout: LayoutConfig;
  onSelectLayout: (layout: LayoutConfig) => void;
  onContinue: () => void;
  onBack: () => void;
}

// Swatch visual config for each layout
const SWATCH_CONFIGS: Record<string, { label: string; swatchContent: React.ReactNode }> = {
  'polkadot-4cut': {
    label: 'Polka dot',
    swatchContent: (
      <div className="w-full h-full rounded-full bg-[#C8201A] flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(white 2px, transparent 2px)', backgroundSize: '8px 8px' }}
      />
    ),
  },
  'classic-4cut': {
    label: 'Baby blue',
    swatchContent: (
      <div className="w-full h-full rounded-full overflow-hidden"
        style={{ background: 'repeating-linear-gradient(90deg, #A8C5DA 0px, #A8C5DA 4px, #EAF2F8 4px, #EAF2F8 8px)' }}
      />
    ),
  },
  'polaroid-2x2': {
    label: 'Recap',
    swatchContent: (
      <div className="w-full h-full rounded-full bg-[#C4956A] flex items-center justify-center">
        <span className="w-3 h-3 rounded-full bg-[#EDE5D8]" />
      </div>
    ),
  },
  'wide-hero': {
    label: 'Minimal',
    swatchContent: (
      <div className="w-full h-full rounded-full bg-white border-2 border-zinc-300 flex items-center justify-center">
        <div className="w-4 h-4 border-2 border-zinc-400 rounded-sm" />
      </div>
    ),
  },
};

// Strip preview for each layout  
const StripPreview: React.FC<{ layoutId: string }> = ({ layoutId }) => {
  const bgColors = ['#FECDD3', '#BAE6FD', '#FEF9C3', '#E9D5FF'];
  
  if (layoutId === 'polkadot-4cut' || layoutId === 'classic-4cut') {
    return (
      <div className="relative mx-auto" style={{ width: 160 }}>
        {/* Filmstrip container */}
        <div className="bg-[#EAF2F8] rounded-lg border-2 border-zinc-200 p-1.5 flex flex-col gap-1 shadow-md relative overflow-hidden"
          style={{
            backgroundImage: layoutId === 'classic-4cut'
              ? 'repeating-linear-gradient(90deg, #A8C5DA 0px, #A8C5DA 20px, #EAF2F8 20px, #EAF2F8 36px)'
              : undefined,
            backgroundColor: layoutId === 'polkadot-4cut' ? undefined : '#EAF2F8'
          }}
        >
          {bgColors.map((color, i) => (
            <div key={i} className="rounded-sm overflow-hidden" style={{ background: color, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Person silhouette placeholder */}
              <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
                <circle cx="16" cy="13" r="8" fill="#6B2D2D" />
                <ellipse cx="16" cy="34" rx="12" ry="10" fill="#6B2D2D" />
              </svg>
            </div>
          ))}
          {/* Bottom label */}
          <div className="bg-[#EAF2F8] rounded-sm px-2 py-1 mt-0.5 border border-zinc-200 text-center">
            <span className="text-[8px] font-bold text-zinc-700 uppercase tracking-wide">CREATOR HIGHLIGHTS</span>
            <div className="text-[6px] text-zinc-500">dot booth · 10.11.26</div>
          </div>
        </div>
        {/* Red dots scattered */}
        {layoutId === 'polkadot-4cut' && (
          <>
            <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-[#C8201A]" />
            <span className="absolute top-1/3 -right-1 w-2 h-2 rounded-full bg-[#C8201A]" />
            <span className="absolute bottom-8 -left-1 w-2 h-2 rounded-full bg-[#C8201A]" />
            <span className="absolute bottom-2 right-4 w-2 h-2 rounded-full bg-[#C8201A]" />
          </>
        )}
      </div>
    );
  }

  if (layoutId === 'polaroid-2x2') {
    // "Recap" – 2x2 grid with polaroid-style border
    return (
      <div className="relative mx-auto bg-white rounded-2xl border-2 border-zinc-200 p-3 shadow-md" style={{ width: 200 }}>
        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {bgColors.map((color, i) => (
            <div key={i} className="rounded-sm overflow-hidden relative" style={{ background: color, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
                <circle cx="16" cy="13" r="8" fill="#6B2D2D" />
                <ellipse cx="16" cy="34" rx="12" ry="10" fill="#6B2D2D" />
              </svg>
            </div>
          ))}
        </div>
        <div className="text-left pl-1">
          <div className="text-[10px] font-bold text-zinc-700">daily recap</div>
          <div className="text-[8px] text-zinc-500">(10.11.26 edition)</div>
          <div className="font-dotbooth text-sm text-zinc-800 italic mt-0.5">dot booth</div>
        </div>
      </div>
    );
  }

  // wide-hero / minimal
  return (
    <div className="mx-auto bg-white rounded-2xl border-2 border-zinc-200 p-3 shadow-md" style={{ width: 200 }}>
      <div className="rounded-sm overflow-hidden mb-3" style={{ background: bgColors[0], height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
          <circle cx="20" cy="16" r="10" fill="#6B2D2D" />
          <ellipse cx="20" cy="42" rx="16" ry="12" fill="#6B2D2D" />
        </svg>
      </div>
      <div className="text-center">
        <div className="font-dotbooth text-sm text-zinc-800">dot booth</div>
        <div className="text-[8px] text-zinc-500">10.11.26</div>
      </div>
    </div>
  );
};

// Get ordered layouts: polkadot, classic, polaroid, wide
const ORDERED_LAYOUTS = ['polkadot-4cut', 'classic-4cut', 'polaroid-2x2', 'wide-hero'];

export const FrameLayoutScreen: React.FC<FrameLayoutScreenProps> = ({
  selectedLayout,
  onSelectLayout,
  onContinue,
  onBack: _onBack,
}) => {
  const swatchConfig = SWATCH_CONFIGS[selectedLayout.id];
  const frameLabel = swatchConfig?.label || selectedLayout.name;

  return (
    <div className="max-w-sm mx-auto px-4 py-4 flex flex-col items-center gap-5">
      
      {/* Frame name */}
      <h2 className="font-dotbooth text-3xl font-bold text-[#5C1010]">
        {frameLabel}
      </h2>

      {/* Large preview card */}
      <div className="w-full bg-white rounded-3xl border-2 border-zinc-200 shadow-lg p-6 flex items-center justify-center min-h-[380px]">
        <StripPreview layoutId={selectedLayout.id} />
      </div>

      {/* 4 round swatches */}
      <div className="flex items-center gap-4">
        {ORDERED_LAYOUTS.map((layoutId) => {
          const layout = LAYOUT_OPTIONS.find((l) => l.id === layoutId);
          if (!layout) return null;
          const config = SWATCH_CONFIGS[layoutId];
          const isSelected = selectedLayout.id === layoutId;

          return (
            <button
              key={layoutId}
              onClick={() => onSelectLayout(layout)}
              className={`w-14 h-14 rounded-full overflow-hidden transition-all ${
                isSelected
                  ? 'ring-2 ring-offset-2 ring-[#C8201A] scale-110'
                  : 'hover:scale-105 ring-1 ring-zinc-200'
              }`}
              title={config?.label || layout.name}
            >
              {config?.swatchContent}
            </button>
          );
        })}
      </div>

      {/* Select button */}
      <button
        onClick={onContinue}
        className="px-14 py-3 rounded-full border-2 border-zinc-900 bg-white text-zinc-900 font-semibold text-sm hover:bg-zinc-50 transition-colors shadow-sm"
      >
        Select
      </button>
    </div>
  );
};
