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
  CheckCircle2,
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

  // Take single snapshot
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

  // Auto-sequence trigger: when auto is enabled and shot captured, schedule next
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
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              LIVE STUDIO
            </span>
            <span className="text-xs text-slate-400 font-mono">
              LAYOUT: {layout.name.toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Space_Grotesk'] text-white">
            CAPTURE <span className="text-neon-gradient">YOUR SHOTS</span>
          </h2>
        </div>

        {/* Counter Badge */}
        <div className="flex items-center gap-3">
          <div className="glass-panel px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Progress</div>
              <div className="text-lg font-black text-cyan-400 font-mono">
                {Math.min(currentShotIndex, layout.shotsCount)} / {layout.shotsCount}
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <Camera className="w-5 h-5 text-violet-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Viewport Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left/Center: Viewport & Live Camera */}
        <div className="lg:col-span-8 flex flex-col items-center">
          
          {/* Camera Frame Box */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#0b0b10] rounded-3xl overflow-hidden border-2 border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex items-center justify-center group">
            
            {/* Shutter Flash Animation */}
            {isFlashing && (
              <div className="absolute inset-0 bg-white z-40 animate-shutter pointer-events-none" />
            )}

            {/* Countdown Overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 z-30 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in">
                <span className="text-8xl sm:text-9xl font-black font-['Space_Grotesk'] text-white animate-bounce drop-shadow-[0_0_35px_rgba(236,72,153,0.9)]">
                  {countdown}
                </span>
                <span className="text-sm font-semibold tracking-widest text-cyan-300 uppercase mt-2">
                  STRIKE A POSE!
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
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-slate-950 via-[#13131c] to-purple-950"
                style={{ filter: activeFilter.cssFilter }}
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center mb-3">
                  <Tv className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Studio Simulator Active</h3>
                <p className="text-xs text-slate-300 max-w-sm mb-4">
                  Using high-definition portrait mock generator. You can test countdown, filters, and full export.
                </p>
                <div className="text-[11px] font-mono text-cyan-300 bg-cyan-950/40 px-3 py-1 rounded-full border border-cyan-500/30">
                  Ready to shoot simulated pose #{currentShotIndex + 1}
                </div>
              </div>
            )}

            {/* Camera Viewport HUD Crosshairs */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-cyan-400/60 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyan-400/60 pointer-events-none" />

            {/* Active Filter Tag in Viewport */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-slate-200 pointer-events-none flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-pink-400" />
              <span>Filter: {activeFilter.name}</span>
            </div>

            {/* Camera Viewport Controls Overlay */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
              <button
                onClick={toggleMirror}
                className="p-2.5 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 text-slate-200 hover:text-white transition-all shadow-lg"
                title={isMirrored ? 'Disable Mirror' : 'Enable Mirror'}
              >
                <FlipHorizontal className="w-4 h-4" />
              </button>
              <button
                onClick={toggleFacingMode}
                className="p-2.5 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 text-slate-200 hover:text-white transition-all shadow-lg"
                title="Switch Camera (Front/Back)"
              >
                <RotateCw className="w-4 h-4" />
              </button>
              {status !== 'simulated' && (
                <button
                  onClick={switchToSimulated}
                  className="p-2.5 rounded-xl bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 text-slate-200 hover:text-white transition-all shadow-lg"
                  title="Switch to Simulated Camera"
                >
                  <VideoOff className="w-4 h-4 text-amber-400" />
                </button>
              )}
            </div>

            {/* Notice if permission error */}
            {errorMessage && (
              <div className="absolute top-4 left-4 right-4 z-20 bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-200 text-xs px-3 py-2 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* Shutter Trigger Bar */}
          <div className="w-full mt-5 glass-panel p-4 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Auto Sequence Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAutoSequence(!isAutoSequence)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isAutoSequence
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-500/20'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Auto-Burst (1.8s delay)</span>
              </button>
            </div>

            {/* Central Snapshot Shutter Button */}
            <div>
              {isComplete ? (
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 bg-emerald-950/40 px-4 py-2 rounded-2xl border border-emerald-500/30">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>All {layout.shotsCount} shots captured!</span>
                </div>
              ) : (
                <button
                  onClick={startCountdown}
                  disabled={countdown !== null}
                  className="group relative flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white font-extrabold text-base tracking-wide shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                >
                  <span className="w-3 h-3 rounded-full bg-white animate-ping" />
                  <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>
                    {countdown !== null ? `COUNTING ${countdown}...` : `SNAP SHOT #${currentShotIndex + 1}`}
                  </span>
                </button>
              )}
            </div>

            {/* Retake All */}
            <div>
              {capturedShots.length > 0 && (
                <button
                  onClick={() => {
                    soundManager.playClick();
                    if (window.confirm('Retake all shots?')) {
                      onRetakeAll();
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 border border-transparent hover:border-rose-500/30 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </div>

          {/* Aesthetic Filter Selector Toolbar */}
          <div className="w-full mt-5">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-xs font-bold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Live Aesthetic Filters
              </span>
              <span className="text-[11px] text-slate-500">Instant real-time shader</span>
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
                        ? 'bg-[#1e1e2d] border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] scale-105'
                        : 'bg-[#121218]/90 hover:bg-[#181824] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div
                      className={`w-full h-10 rounded-xl bg-gradient-to-tr ${filter.previewGradient} border border-white/20 flex items-center justify-center overflow-hidden`}
                    >
                      {isActive && <CheckCircle2 className="w-4 h-4 text-white drop-shadow" />}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-200 truncate w-full">
                      {filter.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Filmstrip Gallery */}
        <div className="lg:col-span-4 w-full">
          <div className="glass-panel p-5 rounded-3xl border border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-bold text-white font-['Space_Grotesk'] text-base flex items-center gap-2">
                <Camera className="w-4 h-4 text-pink-400" />
                Captured Filmstrip
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                {capturedShots.length} of {layout.shotsCount}
              </span>
            </div>

            {/* Shots List */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {Array.from({ length: layout.shotsCount }).map((_, idx) => {
                const shot = capturedShots[idx];
                const isCurrent = idx === capturedShots.length;

                return (
                  <div
                    key={idx}
                    className={`relative rounded-2xl p-2.5 border transition-all flex items-center gap-3 ${
                      shot
                        ? 'bg-[#151522] border-violet-500/40 shadow-sm'
                        : isCurrent
                        ? 'bg-violet-950/20 border-pink-500/40 border-dashed animate-pulse'
                        : 'bg-white/[0.02] border-white/5 border-dashed'
                    }`}
                  >
                    {/* Thumbnail Slot */}
                    <div className="w-20 h-16 rounded-xl bg-black/60 border border-white/10 overflow-hidden relative shrink-0 flex items-center justify-center">
                      {shot ? (
                        <img
                          src={shot.dataUrl}
                          alt={`Shot #${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>Shot {idx + 1}</span>
                        {shot && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold">
                            READY
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {shot ? 'Captured & Filtered' : isCurrent ? 'Next in queue...' : 'Waiting...'}
                      </p>
                    </div>

                    {/* Actions */}
                    {shot && (
                      <button
                        onClick={() => {
                          soundManager.playClick();
                          onRemoveShot(shot.id);
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        title="Delete and retake this shot"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <Button
                variant="cyber"
                size="lg"
                glow={isComplete}
                disabled={!isComplete}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                onClick={onContinue}
                className="w-full justify-center"
              >
                {isComplete ? 'Customize Photo Strip' : `Take ${layout.shotsCount - capturedShots.length} More Photo${layout.shotsCount - capturedShots.length > 1 ? 's' : ''}`}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="w-full justify-center text-slate-400 hover:text-slate-200"
              >
                Change Frame Layout
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
