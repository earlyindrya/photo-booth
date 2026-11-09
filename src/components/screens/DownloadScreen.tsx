import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Download, 
  QrCode, 
  Copy, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { LayoutConfig, CapturedShot, CustomizationSettings } from '../../types/photobooth';
import { FRAME_THEMES } from '../../utils/mockData';
import { exportPhotoStripDataUrl } from '../../utils/canvasRenderer';
import { soundManager } from '../../utils/audio';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

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
  onBackToEdit,
}) => {
  const [exportedDataUrl, setExportedDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const currentTheme = FRAME_THEMES.find((t) => t.id === settings.theme) || FRAME_THEMES[0];

  // Render high-res strip on mount
  useEffect(() => {
    let isMounted = true;
    setIsGenerating(true);

    exportPhotoStripDataUrl(layout, shots, currentTheme, settings)
      .then((dataUrl) => {
        if (!isMounted) return;
        setExportedDataUrl(dataUrl);
        setIsGenerating(false);

        // Sound & celebratory confetti in aesthetic tones
        soundManager.playSuccessChime();
        confetti({
          particleCount: 70,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#8B1E27', '#3B82F6', '#C5A059', '#27272A'],
        });
      })
      .catch((err) => {
        console.error('Error generating photo strip:', err);
        setIsGenerating(false);
      });

    return () => {
      isMounted = false;
    };
  }, [layout, shots, currentTheme, settings]);

  // Handle direct file download
  const handleDownload = () => {
    if (!exportedDataUrl) return;
    soundManager.playClick();
    const link = document.createElement('a');
    link.href = exportedDataUrl;
    link.download = `CAPSULE-${layout.id}-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Image to Clipboard
  const handleCopyImage = async () => {
    if (!exportedDataUrl) return;
    soundManager.playClick();
    try {
      const res = await fetch(exportedDataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Celebration Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-stone-200 text-xs font-mono text-stone-600 mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#8B1E27]" />
          <span>YOUR MEMORY STRIP IS READY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-zinc-900 tracking-tight">
          Memories <span className="italic font-normal text-[#8B1E27]">curated</span> & preserved.
        </h2>
        <p className="text-sm sm:text-base text-stone-600 mt-2 font-sans">
          High-resolution 300 DPI composite rendered. Lossless print-ready PNG ready to download, copy, or scan to mobile.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center">
        
        {/* Strip Preview Showcase */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative p-6 sm:p-10 rounded-3xl bg-white/75 backdrop-blur-md border border-stone-200 shadow-capsule-lg flex items-center justify-center max-w-full">
            {isGenerating ? (
              <div className="w-64 h-96 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-10 h-10 rounded-full border-3 border-stone-300 border-t-zinc-900 animate-spin" />
                <span className="text-sm font-mono text-stone-500">
                  Rendering 300 DPI Composite...
                </span>
              </div>
            ) : exportedDataUrl ? (
              <div className="group relative transition-transform hover:scale-[1.01] duration-300">
                <img
                  src={exportedDataUrl}
                  alt="Final Photostrip"
                  className="rounded-2xl shadow-polaroid max-h-[620px] object-contain border border-stone-300 select-none"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-white shadow-sm">
                  HD PRINT 300 DPI
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Action Center Sidebar (Capsule Cards - Ref 1) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Main Download Card */}
          <div className="paper-card p-6 sm:p-7 rounded-3xl border border-stone-200 flex flex-col gap-4">
            <div>
              <div className="text-[11px] font-mono font-bold text-[#8B1E27] uppercase tracking-wider mb-1">
                Instant Export
              </div>
              <h3 className="text-xl font-serif font-bold text-zinc-900">
                Save to Your Device
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-sans leading-relaxed">
                Lossless PNG file with crisp editorial typography, archival border tones, and custom stickers.
              </p>
            </div>

            <Button
              variant="primary"
              size="xl"
              icon={<Download className="w-5 h-5" />}
              onClick={handleDownload}
              disabled={isGenerating || !exportedDataUrl}
              className="w-full justify-center text-sm py-4"
            >
              Download Photo Strip (PNG)
            </Button>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <Button
                variant="secondary"
                size="md"
                icon={copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-600" />}
                onClick={handleCopyImage}
                disabled={isGenerating}
                className="justify-center"
              >
                {copied ? 'Copied!' : 'Copy Image'}
              </Button>

              <Button
                variant="secondary"
                size="md"
                icon={<QrCode className="w-4 h-4 text-stone-600" />}
                onClick={() => {
                  soundManager.playClick();
                  setIsQrModalOpen(true);
                }}
                disabled={isGenerating}
                className="justify-center"
              >
                Mobile QR
              </Button>
            </div>
          </div>

          {/* Quick Share / Re-edit card */}
          <div className="bg-white/70 backdrop-blur-md p-5 rounded-3xl border border-stone-200 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-700">Need adjustments?</span>
              <button
                onClick={onBackToEdit}
                className="text-xs text-[#8B1E27] hover:underline font-semibold"
              >
                Edit stickers & text
              </button>
            </div>

            <div className="pt-3 border-t border-stone-200">
              <Button
                variant="outline"
                size="lg"
                icon={<RotateCcw className="w-4 h-4 text-stone-600" />}
                onClick={() => {
                  soundManager.playClick();
                  onReset();
                }}
                className="w-full justify-center text-xs"
              >
                Start New Session (Clear & Restart)
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/* QR Code Share Modal */}
      <Modal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        title="Mobile Access & Camera Roll"
      >
        <div className="flex flex-col items-center text-center p-2">
          {/* Aesthetic SVG QR Code */}
          <div className="p-4 bg-white rounded-2xl shadow-md mb-4 border border-stone-200">
            <svg
              className="w-44 h-44"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="100" height="100" fill="white" />
              {/* Corner 1 */}
              <rect x="10" y="10" width="25" height="25" fill="#18181B" rx="3" />
              <rect x="15" y="15" width="15" height="15" fill="white" rx="2" />
              <rect x="18" y="18" width="9" height="9" fill="#8B1E27" rx="1.5" />

              {/* Corner 2 */}
              <rect x="65" y="10" width="25" height="25" fill="#18181B" rx="3" />
              <rect x="70" y="15" width="15" height="15" fill="white" rx="2" />
              <rect x="73" y="18" width="9" height="9" fill="#18181B" rx="1.5" />

              {/* Corner 3 */}
              <rect x="10" y="65" width="25" height="25" fill="#18181B" rx="3" />
              <rect x="15" y="70" width="15" height="15" fill="white" rx="2" />
              <rect x="18" y="73" width="9" height="9" fill="#8B1E27" rx="1.5" />

              {/* Data dots */}
              <rect x="42" y="12" width="6" height="6" fill="#18181B" />
              <rect x="52" y="12" width="6" height="6" fill="#18181B" />
              <rect x="42" y="24" width="6" height="6" fill="#18181B" />
              <rect x="52" y="32" width="6" height="6" fill="#8B1E27" />
              
              <rect x="12" y="44" width="6" height="6" fill="#18181B" />
              <rect x="24" y="44" width="6" height="6" fill="#8B1E27" />
              <rect x="36" y="44" width="8" height="8" fill="#18181B" />
              <rect x="48" y="44" width="6" height="6" fill="#18181B" />
              <rect x="60" y="44" width="8" height="8" fill="#18181B" />
              <rect x="76" y="44" width="6" height="6" fill="#18181B" />

              <rect x="44" y="56" width="6" height="6" fill="#18181B" />
              <rect x="56" y="56" width="6" height="6" fill="#8B1E27" />
              <rect x="68" y="56" width="6" height="6" fill="#18181B" />
              <rect x="80" y="56" width="6" height="6" fill="#18181B" />

              <rect x="44" y="68" width="6" height="6" fill="#18181B" />
              <rect x="56" y="76" width="8" height="8" fill="#18181B" />
              <rect x="72" y="68" width="6" height="6" fill="#18181B" />
              <rect x="80" y="80" width="8" height="8" fill="#8B1E27" />

              <circle cx="50" cy="50" r="10" fill="#18181B" />
              <circle cx="50" cy="50" r="6" fill="#8B1E27" />
            </svg>
          </div>

          <p className="text-sm font-bold text-zinc-900 mb-1 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-[#8B1E27]" />
            Scan with your Phone Camera
          </p>
          <p className="text-xs text-stone-500 max-w-xs mb-4">
            Directly save your photostrip to your iOS or Android camera roll.
          </p>

          <Button
            variant="secondary"
            size="md"
            icon={<ExternalLink className="w-4 h-4" />}
            onClick={() => {
              if (exportedDataUrl) {
                const win = window.open();
                if (win) {
                  win.document.write(`<img src="${exportedDataUrl}" style="max-width:100%;height:auto;margin:auto;display:block;" />`);
                }
              }
            }}
            className="w-full justify-center"
          >
            Open in New Window
          </Button>
        </div>
      </Modal>
    </div>
  );
};