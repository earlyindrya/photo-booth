import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Camera, 
  FlipHorizontal, 
  RotateCw, 
  Sparkles, 
  Trash2, 
  ArrowRight, 
  Play, 
  AlertCircle,
  VideoOff,
  Check,
  Tv
} from 'lucide-react';
import { LayoutConfig, FilterId, CapturedShot } from '../../types/photobooth';
import { FILTER_OPTIONS } from '../../utils/mockData';
import { useWebcam } from '../../hooks/useWebcam';
import { soundManager } from '../../utils/audio';
import { Button } from '../common/Button';

interface CameraScreenProps {
  layout: LayoutConfig;
  capturedShots: CapturedShot[];
  onAddShot: (shot: CapturedShot) => void;
  onRemoveShot: (id: number) => void;
  onRetakeAll: () => void;
  onContinue: () => void;
  onBack: () => void;
}

export const CameraScreen: React.FC<CameraScreenProps> = ({
  layout,
  capturedShots,
  onAddShot,
  onRemoveShot,
  onRetakeAll,
  onContinue,
  onBack,
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

  const [activeFilterId, setActiveFilterId] = useState<FilterId>('normal');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isAutoSequence, setIsAutoSequence] = useState(false);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeFilter = FILTER_OPTIONS.find((f) => f.id === activeFilterId) || FILTER_OPTIONS[0];
  const isComplete = capturedShots.length >= layout.shotsCount;
  const currentShotIndex = capturedShots.length;

  // Single snapshot trigger
  const triggerCapture = useCallback(() => {
    setIsFlashing(true);
    soundManager.playShutterSound();

    setTimeout(() => {
      setIsFlashing(false);
    }, 280);

    const shotDataUrl = capturePhoto(capturedShots.length, activeFilter.cssFilter);
    const newShot: CapturedShot = {
      id: Date.now(),
      dataUrl: shotDataUrl,
      timestamp: Date.now(),
    };

    onAddShot(newShot);
    setCountdown(null);
  }, [capturePhoto, capturedShots.length, activeFilter.cssFilter, onAddShot]);

  // Start 3-2-1 Countdown
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

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, []);

  // Auto-sequence trigger
  useEffect(() => {
    if (isAutoSequence && !isComplete && countdown === null && capturedShots.length > 0) {
      const autoTimer = setTimeout(() => {
        startCountdown();
      }, 1800);
      return () => clearTimeout(autoTimer);
    }
  }, [isAutoSequence, isComplete, countdown, capturedShots.length, startCountdown]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      {/* Top Banner / Progress Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-stone-200 text-stone-700 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#8B1E27]" />
              STUDIO SESSION
            </span>
            <span className="text-xs text-stone-500 font-mono">
              FORMAT: {layout.name.toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-zinc-900">
            Capture your <span className="italic font-normal text-[#8B1E27]">moments</span>.
          </h2>
        </div>

        {/* Counter Badge (Ref 1 Capsule style) */}
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-full border border-stone-200 shadow-sm flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Progress</div>
              <div className="text-base font-black text-zinc-900 font-mono">
                {Math.min(currentShotIndex, layout.shotsCount)} / {layout.shotsCount}
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#FAF5EE] text-[#8B1E27] flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left/Center: Viewport & Live Camera */}
        <div className="lg:col-span-8 flex flex-col items-center">
          
          {/* Camera Frame Box (Styled as Retro Mac OS Window - Ref 4) */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-stone-900 rounded-3xl overflow-hidden border border-stone-300 shadow-capsule-lg flex flex-col group">
            
            {/* Mac OS Window Chrome Header (Ref 4) */}
            <div className="mac-window-chrome px-4 py-2.5 flex items-center justify-between shrink-0 select-none z-20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              <div className="font-mono text-xs text-zinc-700 font-medium flex items-center gap-1.5">
                <span>booth_studio_live.raw</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="text-[11px] font-mono text-zinc-500">
                {activeFilter.name}
              </div>
            </div>

            {/* Video Viewport Container */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
              
              {/* Shutter Flash Animation */}
              {isFlashing && (
                <div className="absolute inset-0 bg-white z-40 animate-shutter pointer-events-none" />
              )}

              {/* Countdown Overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 z-30 bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in">
                  <span className="text-8xl sm:text-9xl font-serif italic font-bold text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                    {countdown}
                  </span>
                  <span className="text-xs font-mono font-bold tracking-widest text-amber-200 uppercase mt-3">
                    • STRIKE A POSE •
                  </span>
                </div>
              )}

              {/* Live HTML5 Video Element */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transition-all duration-200 ${
                  isMirrored ? 'scale-x-[-1]' : ''
                } ${status === 'simulated' ? 'hidden' : 'block'}`}
                style={{ filter: activeFilter.cssFilter }}
              />

              {/* Fallback Simulator View when camera is simulated */}
              {status === 'simulated' && (
                <div 
                  className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-stone-900 via-stone-800 to-zinc-900"
                  style={{ filter: activeFilter.cssFilter }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-3">
                    <Tv className="w-7 h-7 text-stone-200" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-1">Studio Simulator Active</h3>
                  <p className="text-xs text-stone-300 max-w-sm mb-3">
                    Using high-definition portrait mock generator with editorial lighting.
                  </p>
                  <div className="text-[11px] font-mono text-amber-200 bg-black/40 px-3 py-1 rounded-full border border-white/10">
                    Ready to capture shot #{currentShotIndex + 1}
                  </div>
                </div>
              )}

              {/* Selection Bounding Box Handles (Ref 4) */}
              <div className="absolute inset-6 border border-blue-400/70 pointer-events-none">
                <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-blue-500 border border-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 border border-white" />
                <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-blue-500 border border-white" />
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-blue-500 border border-white" />
                
                {/* Tape Label in Viewport (Ref 4) */}
                <div className="absolute top-2 left-2 tape-label px-2 py-0.5 rounded text-[10px] font-bold">
                  take #{currentShotIndex + 1} • {layout.name}
                </div>
              </div>

              {/* Camera Viewport Controls Overlay */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
                <button
                  onClick={toggleMirror}
                  className="p-2.5 rounded-full bg-white/80 hover:bg-white text-zinc-900 backdrop-blur-md border border-stone-200 shadow-md transition-all"
                  title={isMirrored ? 'Disable Mirror' : 'Enable Mirror'}
                >
                  <FlipHorizontal className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleFacingMode}
                  className="p-2.5 rounded-full bg-white/80 hover:bg-white text-zinc-900 backdrop-blur-md border border-stone-200 shadow-md transition-all"
                  title="Switch Camera (Front/Back)"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                {status !== 'simulated' && (
                  <button
                    onClick={switchToSimulated}
                    className="p-2.5 rounded-full bg-white/80 hover:bg-white text-amber-700 backdrop-blur-md border border-stone-200 shadow-md transition-all"
                    title="Switch to Simulator"
                  >
                    <VideoOff className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Permission notice */}
              {errorMessage && (
                <div className="absolute top-4 left-4 right-4 z-20 bg-amber-500/90 backdrop-blur-md text-white text-xs px-3 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Shutter Trigger Bar (Ref 1 Capsule Pill Style) */}
          <div className="w-full mt-5 bg-white/90 backdrop-blur-md p-4 rounded-3xl border border-stone-200 shadow-capsule flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Auto Sequence Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoSequence(!isAutoSequence)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all border ${
                  isAutoSequence
                    ? 'bg-zinc-900 border-zinc-900 text-white shadow-sm'
                    : 'bg-stone-100 border-stone-200 text-stone-600 hover:text-zinc-900'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Auto-Burst (1.8s)</span>
              </button>
            </div>

            {/* Central Snapshot Shutter Button */}
            <div>
              {isComplete ? (
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 bg-emerald-50 px-5 py-2.5 rounded-full border border-emerald-200">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>All {layout.shotsCount} shots captured!</span>
                </div>
              ) : (
                <button
                  onClick={startCountdown}
                  disabled={countdown !== null}
                  className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#18181B] hover:bg-black text-white font-semibold text-sm tracking-wide shadow-capsule hover:shadow-capsule-lg transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E27]" />
                  <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>
                    {countdown !== null ? `Counting down ${countdown}...` : `Take Photo #${currentShotIndex + 1}`}
                  </span>
                </button>
              )}
            </div>

            {/* Clear all */}
            <div>
              {capturedShots.length > 0 && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    if (window.confirm('Retake all shots?')) {
                      onRetakeAll();
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium text-stone-500 hover:text-[#8B1E27] transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear shots</span>
                </button>
              )}
            </div>
          </div>

          {/* Aesthetic Filter Selector Toolbar */}
          <div className="w-full mt-5">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-mono font-semibold text-stone-500 tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#8B1E27]" />
                Editorial Presets
              </span>
              <span className="text-[11px] font-mono text-stone-400">Real-time studio tone</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {FILTER_OPTIONS.map((filter) => {
                const isActive = activeFilterId === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => {
                      soundManager.playClick();
                      setActiveFilterId(filter.id);
                    }}
                    className={`relative p-2 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-center border ${
                      isActive
                        ? 'bg-white border-zinc-900 shadow-md scale-102'
                        : 'bg-white/70 hover:bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div
                      className={`w-full h-10 rounded-xl bg-gradient-to-tr ${filter.previewGradient} border border-stone-200/80 flex items-center justify-center overflow-hidden`}
                    >
                      {isActive && <Check className="w-4 h-4 text-zinc-900 drop-shadow-sm" />}
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-900 truncate w-full">
                      {filter.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Scrapbook Gallery Column (Ref 2, 5) */}
        <div className="lg:col-span-4 w-full">
          <div className="paper-card p-5 rounded-3xl border border-stone-200 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-bold text-zinc-900 font-serif text-base flex items-center gap-2">
                <span>Filmstrip Queue</span>
              </h3>
              <span className="text-xs text-stone-500 font-mono">
                {capturedShots.length} of {layout.shotsCount}
              </span>
            </div>

            {/* Shots List styled like Polaroid / Scrapbook cards */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {Array.from({ length: layout.shotsCount }).map((_, idx) => {
                const shot = capturedShots[idx];
                const isCurrent = idx === capturedShots.length;

                return (
                  <div
                    key={idx}
                    className={`relative rounded-2xl p-2.5 border transition-all flex items-center gap-3 ${
                      shot
                        ? 'bg-white border-stone-200 shadow-sm'
                        : isCurrent
                        ? 'bg-[#FAF5EE] border-[#8B1E27]/40 border-dashed animate-pulse'
                        : 'bg-stone-50 border-stone-200/60 border-dashed'
                    }`}
                  >
                    {/* Thumbnail Slot */}
                    <div className="w-20 h-16 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden relative shrink-0 flex items-center justify-center">
                      {shot ? (
                        <img
                          src={shot.dataUrl}
                          alt={`Shot #${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-mono text-stone-400">({idx + 1})</span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                        <span className="font-mono">({idx + 1})</span>
                        <span>Shot {idx + 1}</span>
                        {shot && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold font-mono">
                            READY
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 truncate font-sans">
                        {shot ? 'Captured' : isCurrent ? 'Next in queue...' : 'Waiting...'}
                      </p>
                    </div>

                    {/* Delete shot */}
                    {shot && (
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          onRemoveShot(shot.id);
                        }}
                        className="p-2 rounded-full text-stone-400 hover:text-[#8B1E27] hover:bg-stone-100 transition-colors"
                        title="Delete and retake"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Continue Actions */}
            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
              <Button
                variant="primary"
                size="lg"
                disabled={!isComplete}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={onContinue}
                className="w-full justify-center"
              >
                {isComplete ? 'Customize & Curate' : `Take ${layout.shotsCount - capturedShots.length} More Photo${layout.shotsCount - capturedShots.length > 1 ? 's' : ''}`}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="w-full justify-center text-stone-500 hover:text-zinc-900 text-xs"
              >
                Change Layout Format
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};