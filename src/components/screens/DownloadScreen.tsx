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

        // Sound & celebratory confetti
        soundManager.playSuccessChime();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#EC4899', '#06B6D4', '#ffffff'],
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
    link.download = `FREQZ-${layout.id}-${Date.now()}.png`;
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
      // Fallback: copy data URL
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Celebration Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-950/60 border border-pink-500/30 text-xs font-semibold text-pink-300 mb-3 animate-float">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>YOUR STRIP IS READY TO PRINT & SHARE!</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-['Space_Grotesk'] text-white tracking-tight">
          MEMORIES <span className="text-neon-gradient">PRESERVED</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          High-resolution 300 DPI composite generated. Download directly to your device or scan the QR code for instant mobile access.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-center">
        
        {/* Strip Preview Showcase */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center">
          <div className="relative p-6 sm:p-10 rounded-3xl bg-[#0b0b10] border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.25)] flex items-center justify-center max-w-full">
            {isGenerating ? (
              <div className="w-64 h-96 flex flex-col items-center justify-center gap-4 text-center">
                <div className="w-12 h-12 rounded-full border-4 border-violet-500 border-t-cyan-400 animate-spin" />
                <span className="text-sm font-semibold text-slate-300">
                  Rendering 300 DPI Composite...
                </span>
              </div>
            ) : exportedDataUrl ? (
              <div className="group relative transition-transform hover:scale-[1.01] duration-300">
                <img
                  src={exportedDataUrl}
                  alt="Final Photostrip"
                  className="rounded-2xl shadow-2xl max-h-[620px] object-contain border border-white/20 select-none"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-white/10">
                  HD PRINT 300 DPI
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Action Center Sidebar */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Main Download Card */}
          <div className="glass-panel-glow p-6 sm:p-7 rounded-3xl border border-violet-500/40 flex flex-col gap-4">
            <div>
              <div className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-1">
                Instant Export
              </div>
              <h3 className="text-xl font-extrabold text-white font-['Space_Grotesk']">
                Save to Your Device
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Lossless PNG format with crisp typography, color frames, and custom stickers.
              </p>
            </div>

            <Button
              variant="cyber"
              size="xl"
              glow={true}
              icon={<Download className="w-5 h-5" />}
              onClick={handleDownload}
              disabled={isGenerating || !exportedDataUrl}
              className="w-full justify-center text-base py-4"
            >
              Download Photo Strip (PNG)
            </Button>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="secondary"
                size="md"
                icon={copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                onClick={handleCopyImage}
                disabled={isGenerating}
                className="justify-center"
              >
                {copied ? 'Copied!' : 'Copy Image'}
              </Button>

              <Button
                variant="secondary"
                size="md"
                icon={<QrCode className="w-4 h-4 text-cyan-400" />}
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
          <div className="glass-panel p-5 rounded-3xl border border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Need adjustments?</span>
              <button
                onClick={onBackToEdit}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
              >
                Edit colors or stickers
              </button>
            </div>

            <div className="pt-3 border-t border-white/10">
              <Button
                variant="outline"
                size="lg"
                icon={<RotateCcw className="w-4 h-4 text-pink-400" />}
                onClick={() => {
                  soundManager.playClick();
                  onReset();
                }}
                className="w-full justify-center border-white/10 hover:border-violet-500/50 hover:bg-violet-950/20 text-slate-200"
              >
                Take Another Photo (New Session)
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/* QR Code Share Modal */}
      <Modal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        title="Scan for Mobile Access"
      >
        <div className="flex flex-col items-center text-center p-2">
          {/* Mock QR Code Graphic */}
          <div className="p-4 bg-white rounded-2xl shadow-xl mb-4 border-4 border-violet-400">
            <svg
              className="w-48 h-48"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Artistic SVG QR Code representation */}
              <rect width="100" height="100" fill="white" />
              {/* Corner 1 */}
              <rect x="10" y="10" width="25" height="25" fill="#0d0d12" rx="3" />
              <rect x="15" y="15" width="15" height="15" fill="white" rx="2" />
              <rect x="18" y="18" width="9" height="9" fill="#8B5CF6" rx="1.5" />

              {/* Corner 2 */}
              <rect x="65" y="10" width="25" height="25" fill="#0d0d12" rx="3" />
              <rect x="70" y="15" width="15" height="15" fill="white" rx="2" />
              <rect x="73" y="18" width="9" height="9" fill="#EC4899" rx="1.5" />

              {/* Corner 3 */}
              <rect x="10" y="65" width="25" height="25" fill="#0d0d12" rx="3" />
              <rect x="15" y="70" width="15" height="15" fill="white" rx="2" />
              <rect x="18" y="73" width="9" height="9" fill="#06B6D4" rx="1.5" />

              {/* Data matrix dots */}
              <rect x="42" y="12" width="6" height="6" fill="#0d0d12" />
              <rect x="52" y="12" width="6" height="6" fill="#0d0d12" />
              <rect x="42" y="24" width="6" height="6" fill="#0d0d12" />
              <rect x="52" y="32" width="6" height="6" fill="#8B5CF6" />
              
              <rect x="12" y="44" width="6" height="6" fill="#0d0d12" />
              <rect x="24" y="44" width="6" height="6" fill="#EC4899" />
              <rect x="36" y="44" width="8" height="8" fill="#0d0d12" />
              <rect x="48" y="44" width="6" height="6" fill="#06B6D4" />
              <rect x="60" y="44" width="8" height="8" fill="#0d0d12" />
              <rect x="76" y="44" width="6" height="6" fill="#0d0d12" />

              <rect x="44" y="56" width="6" height="6" fill="#0d0d12" />
              <rect x="56" y="56" width="6" height="6" fill="#8B5CF6" />
              <rect x="68" y="56" width="6" height="6" fill="#0d0d12" />
              <rect x="80" y="56" width="6" height="6" fill="#EC4899" />

              <rect x="44" y="68" width="6" height="6" fill="#06B6D4" />
              <rect x="56" y="76" width="8" height="8" fill="#0d0d12" />
              <rect x="72" y="68" width="6" height="6" fill="#0d0d12" />
              <rect x="80" y="80" width="8" height="8" fill="#8B5CF6" />

              {/* Center Icon badge */}
              <circle cx="50" cy="50" r="10" fill="#0d0d12" />
              <circle cx="50" cy="50" r="6" fill="#EC4899" />
            </svg>
          </div>

          <p className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            Scan with your Phone Camera
          </p>
          <p className="text-xs text-slate-400 max-w-xs mb-5">
            Instantly download or save your photostrip directly to your iOS or Android camera roll.
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
            Open in New Tab
          </Button>
        </div>
      </Modal>
    </div>
  );
};
