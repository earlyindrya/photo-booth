import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  FlipHorizontal,
  RotateCw,
  VideoOff,
  AlertCircle,
  RefreshCw,
  Upload,
} from 'lucide-react';
import { LayoutConfig, FilterId, CapturedShot } from '../../types/photobooth';
import { FILTER_OPTIONS } from '../../utils/mockData';
import { useWebcam } from '../../hooks/useWebcam';
import { soundManager } from '../../utils/audio';

interface CameraScreenProps {
  layout: LayoutConfig;
  capturedShots: CapturedShot[];
  onAddShot: (shot: CapturedShot) => void;
  onRemoveShot: (id: number) => void;
  onRetakeAll: () => void;
  onContinue: () => void;
  onBack: () => void;
}

// 3 filter modes shown as pills
const FILTER_PILLS = [
  { id: 'normal', icon: '∅' },
  { id: 'soft-glow', icon: '··' },
  { id: 'disposable-90s', icon: '★' },
];

export const CameraScreen: React.FC<CameraScreenProps> = ({
  layout,
  capturedShots,
  onAddShot,
  onRemoveShot: _onRemoveShot,
  onRetakeAll,
  onContinue,
  onBack: _onBack,
}) => {
  const {
    videoRef,
    status,
    errorMessage,
    isMirrored,
    toggleMirror,
    toggleFacingMode,
    switchToSimulated,
    capturePhoto,
  } = useWebcam();

  const [activeFilterId, setActiveFilterId] = useState<FilterId>('disposable-90s');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeFilter = FILTER_OPTIONS.find((f) => f.id === activeFilterId) || FILTER_OPTIONS[0];
  const isComplete = capturedShots.length >= layout.shotsCount;
  const currentShotIndex = capturedShots.length;

  const triggerCapture = useCallback(() => {
    setIsFlashing(true);
    soundManager.playShutterSound();
    setTimeout(() => setIsFlashing(false), 280);

    const shotDataUrl = capturePhoto(capturedShots.length, activeFilter.cssFilter);
    onAddShot({ id: Date.now(), dataUrl: shotDataUrl, timestamp: Date.now() });
    setCountdown(null);
  }, [capturePhoto, capturedShots.length, activeFilter.cssFilter, onAddShot]);

  const startCountdown = useCallback(() => {
    if (countdown !== null || isComplete) return;
    let count = 3;
    setCountdown(count);
    soundManager.playCountdownTick(false);
    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    countdownTimerRef.current = setInterval(() => {
      count -= 1;
      if (count > 0) {
        setCountdown(count);
        soundManager.playCountdownTick(false);
      } else {
        if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
        soundManager.playCountdownTick(true);
        triggerCapture();
      }
    }, 1000);
  }, [countdown, isComplete, triggerCapture]);

  useEffect(() => {
    return () => { if (countdownTimerRef.current) clearInterval(countdownTimerRef.current); };
  }, []);

  // Handle upload
  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (dataUrl && !isComplete) {
          onAddShot({ id: Date.now(), dataUrl, timestamp: Date.now() });
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-2 flex flex-col items-center gap-4">

      {/* Illustrated Camera Body */}
      <div className="relative w-full" style={{ maxWidth: 360 }}>
        {/* Camera outer shell */}
        <div className="relative bg-zinc-900 rounded-2xl border-2 border-zinc-800 shadow-2xl overflow-hidden" style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px' }}>

          {/* Top bumps */}
          <div className="absolute -top-2 left-8 w-6 h-4 bg-zinc-800 rounded-t-md" />
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-5 bg-zinc-700 rounded-t-md" />
          <div className="absolute -top-2 right-8 w-6 h-4 bg-zinc-800 rounded-t-md" />

          {/* Red tassel on left */}
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

          {/* Inner row: viewfinder + side panel */}
          <div className="flex gap-2">
            {/* Viewfinder (video area) */}
            <div className="relative flex-1 aspect-[4/3] bg-zinc-950 rounded-xl overflow-hidden border border-zinc-700">
              {/* Flash */}
              {isFlashing && <div className="absolute inset-0 bg-white z-40 animate-shutter pointer-events-none" />}

              {/* Countdown */}
              {countdown !== null && (
                <div className="absolute inset-0 z-30 bg-black/50 flex items-center justify-center">
                  <span className="font-dotbooth text-7xl font-bold text-white drop-shadow-lg">{countdown}</span>
                </div>
              )}

              {/* Video */}
              <video
                ref={videoRef}
                autoPlay playsInline muted
                className={`w-full h-full object-cover ${isMirrored ? 'scale-x-[-1]' : ''} ${status === 'simulated' ? 'hidden' : 'block'}`}
                style={{ filter: activeFilter.cssFilter }}
              />

              {/* Simulated / no camera */}
              {status === 'simulated' && (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-zinc-900"
                  style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
                  {/* Stars */}
                  {['top-4 left-6', 'top-8 right-10', 'top-16 left-16', 'bottom-10 left-8', 'bottom-6 right-6', 'top-20 right-4', 'bottom-16 right-16'].map((pos, i) => (
                    <span key={i} className={`absolute ${pos} text-xs opacity-80 ${i % 2 === 0 ? 'text-white' : 'text-[#C8201A]'}`}>★</span>
                  ))}
                  <p className="text-white/60 text-xs text-center px-4">
                    Camera is blocked here. Use Upload to add your photos.
                  </p>
                </div>
              )}

              {/* Error */}
              {errorMessage && (
                <div className="absolute top-2 left-2 right-2 z-20 bg-amber-500/90 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span className="truncate">{errorMessage}</span>
                </div>
              )}

              {/* Camera controls overlay */}
              <div className="absolute bottom-2 right-2 flex gap-1 z-20">
                <button onClick={toggleMirror} className="p-1.5 rounded-full bg-white/80 text-zinc-900 backdrop-blur-sm" title="Mirror">
                  <FlipHorizontal className="w-3 h-3" />
                </button>
                <button onClick={toggleFacingMode} className="p-1.5 rounded-full bg-white/80 text-zinc-900 backdrop-blur-sm" title="Flip camera">
                  <RotateCw className="w-3 h-3" />
                </button>
                {status !== 'simulated' && (
                  <button onClick={switchToSimulated} className="p-1.5 rounded-full bg-white/80 text-amber-700 backdrop-blur-sm" title="Simulate">
                    <VideoOff className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Right side panel – maroon/dark red with polka dots and lens */}
            <div className="relative w-16 bg-[#7B1D1D] rounded-xl flex flex-col items-center justify-between py-3 overflow-hidden border border-[#5C1010]"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1.5px, transparent 1.5px)', backgroundSize: '8px 8px' }}>
              {/* Lens holes (small dots) */}
              <div className="flex flex-col gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700" />
              </div>

              {/* Bullseye lens */}
              <div className="w-10 h-10 rounded-full bg-zinc-950 border-2 border-zinc-700 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-zinc-900 border border-zinc-600 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
              </div>

              {/* More dots */}
              <div className="flex flex-col gap-2">
                <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-900 border border-zinc-700" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-filter pill toggle */}
      <div className="flex items-center bg-white rounded-full border-2 border-zinc-200 shadow-sm overflow-hidden">
        {FILTER_PILLS.map((fp) => {
          const isActive = activeFilterId === fp.id;
          return (
            <button
              key={fp.id}
              onClick={() => setActiveFilterId(fp.id as FilterId)}
              className={`px-5 py-2 text-sm font-bold transition-all ${
                isActive
                  ? 'bg-[#C8201A] text-white rounded-full mx-1'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {fp.icon}
            </button>
          );
        })}
      </div>

      {/* Shot counter */}
      <div className="font-dotbooth text-5xl font-bold text-[#C8201A]">
        {currentShotIndex}/{layout.shotsCount}
      </div>

      {/* Action row: Upload | Snap | Rotate */}
      <div className="flex items-center gap-4 w-full justify-center">
        {/* Upload */}
        <button
          onClick={handleUpload}
          disabled={isComplete}
          className="flex flex-col items-center gap-0.5 disabled:opacity-40"
        >
          <Upload className="w-5 h-5 text-zinc-700" />
          <span className="text-xs text-zinc-700 font-semibold border-b border-zinc-700">Upload</span>
        </button>

        {/* Snap */}
        {isComplete ? (
          <button
            onClick={onContinue}
            className="px-10 py-3.5 rounded-full bg-[#C8201A] text-white font-bold text-base shadow-lg hover:bg-[#A01818] transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={startCountdown}
            disabled={countdown !== null}
            className="px-10 py-3.5 rounded-full bg-[#FBBDB8] hover:bg-[#f9a09a] text-white font-bold text-base shadow-lg disabled:opacity-60 transition-colors"
          >
            {countdown !== null ? `${countdown}...` : 'Snap'}
          </button>
        )}

        {/* Retake */}
        <button
          onClick={() => { if (window.confirm('Retake all?')) onRetakeAll(); }}
          className="p-2.5 rounded-full border-2 border-zinc-300 text-zinc-500 hover:border-zinc-500 hover:text-zinc-800 transition-all"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Helper text */}
      <p className="text-xs text-zinc-500 text-center">
        Each uploaded photo fills one shot.
      </p>
    </div>
  );
};
