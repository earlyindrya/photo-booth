import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LayoutConfig, CapturedShot, CustomizationSettings } from '../../types/photobooth';
import { FRAME_THEMES } from '../../utils/mockData';
import { exportPhotoStripDataUrl } from '../../utils/canvasRenderer';
import { soundManager } from '../../utils/audio';

interface DownloadScreenProps {
  layout: LayoutConfig;
  shots: CapturedShot[];
  settings: CustomizationSettings;
  onReset: () => void;
  onBackToEdit: () => void;
}

export const DownloadScreen: React.FC<DownloadScreenProps> = ({
  layout,
  shots,
  settings,
  onReset,
  onBackToEdit: _onBackToEdit,
}) => {
  const [exportedDataUrl, setExportedDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const currentTheme = FRAME_THEMES.find((t) => t.id === settings.theme) || FRAME_THEMES[0];

  useEffect(() => {
    let isMounted = true;
    setIsGenerating(true);

    exportPhotoStripDataUrl(layout, shots, currentTheme, settings)
      .then((dataUrl) => {
        if (!isMounted) return;
        setExportedDataUrl(dataUrl);
        setIsGenerating(false);
        soundManager.playSuccessChime();
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#C8201A', '#A8C5DA', '#F5EFE7', '#FFFFFF'],
        });
      })
      .catch(() => setIsGenerating(false));

    return () => { isMounted = false; };
  }, [layout, shots, currentTheme, settings]);

  const handleDownload = () => {
    if (!exportedDataUrl) return;
    soundManager.playClick();
    const link = document.createElement('a');
    link.href = exportedDataUrl;
    link.download = `dot-booth-${layout.id}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-2 flex flex-col items-center gap-4">

      {/* Printer illustration */}
      <div className="w-full relative">
        {/* Printer body */}
        <div className="relative bg-[#7B1D1D] rounded-2xl px-5 py-3 flex items-center justify-between shadow-xl"
          style={{ backgroundImage: 'radial-gradient(rgba(0,0,0,0.3) 1.5px, transparent 1.5px)', backgroundSize: '10px 10px' }}>
          <span className="font-dotbooth text-xl font-bold text-white">dot booth</span>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-400 shadow-sm" />
          </div>
        </div>

        {/* Paper/strip coming out of printer */}
        <div className="mx-auto mt-0 flex flex-col items-center">
          {/* Paper strip (the generated photo) */}
          <div className="w-full bg-white rounded-b-3xl border-l-2 border-r-2 border-b-2 border-zinc-200 overflow-hidden shadow-xl">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-8 h-8 rounded-full border-[3px] border-zinc-200 border-t-[#C8201A] animate-spin" />
                <span className="text-xs text-zinc-500">Printing your strip...</span>
              </div>
            ) : exportedDataUrl ? (
              <img
                src={exportedDataUrl}
                alt="Your photo strip"
                className="w-full object-contain"
              />
            ) : (
              <div className="py-8 text-center text-sm text-zinc-500">Could not generate strip.</div>
            )}
          </div>
        </div>
      </div>

      {/* Status text */}
      <p className="text-sm text-zinc-600 text-center">
        Your strip is ready.
      </p>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={isGenerating || !exportedDataUrl}
        className="w-full py-4 rounded-full border-2 border-zinc-900 bg-white text-zinc-900 font-bold text-base hover:bg-zinc-50 transition-colors shadow-sm disabled:opacity-40"
      >
        Download
      </button>

      {/* Take new photos link */}
      <button
        onClick={onReset}
        className="text-sm text-zinc-500 hover:text-zinc-800 underline underline-offset-2 transition-colors"
      >
        Take new photos
      </button>
    </div>
  );
};
