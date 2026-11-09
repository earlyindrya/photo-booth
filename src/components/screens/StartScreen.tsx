import React from 'react';
import { Sparkles, ArrowRight, Camera, Sliders, Palette, Zap, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '../common/Button';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[calc(100vh-73px)] flex flex-col justify-between overflow-hidden">
      {/* Background Cyber Ambient Lights */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-cyan-500/10 blur-[130px] rounded-full -z-10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-violet-600/15 blur-[120px] rounded-full -z-10" />
      <div className="pointer-events-none absolute -top-20 -right-20 w-[400px] h-[400px] bg-pink-600/15 blur-[120px] rounded-full -z-10" />

      {/* Main Hero Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12 flex-1 flex flex-col items-center text-center justify-center">
        
        {/* Glowing Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-950/60 border border-violet-500/30 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(139,92,246,0.25)] animate-float">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-xs font-semibold uppercase tracking-widest bg-gradient-to-r from-pink-300 via-purple-200 to-cyan-300 bg-clip-text text-transparent">
            FREQZ DIGITAL PHOTOBOOTH • NEXT GEN
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-['Space_Grotesk'] tracking-tight max-w-4xl leading-[1.08] mb-6">
          CAPTURE THE <br className="hidden sm:inline" />
          <span className="text-neon-gradient relative">
            MOMENT
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full blur-[1px]" />
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10 text-balance">
          Experience the authentic Korean-style 4-cut photobooth right in your browser. Real-time studio filters, customizable holographic frames, decorative stickers, and instant high-res print downloads.
        </p>

        {/* Glowing Hero CTA Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14">
          <Button
            size="xl"
            variant="cyber"
            glow={true}
            icon={<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            iconPosition="right"
            onClick={onStart}
            className="group px-10 py-5 text-lg font-bold shadow-[0_0_40px_rgba(139,92,246,0.6)] hover:shadow-[0_0_60px_rgba(236,72,153,0.8)]"
          >
            START SESSION
          </Button>
        </div>

        {/* Quick Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-violet-500/40 hover:bg-violet-950/20 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-violet-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-100 mb-1">Instant Download</h4>
            <p className="text-xs text-slate-400">High-resolution composite PNG ready for print & social.</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-pink-500/40 hover:bg-pink-950/20 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-pink-600/20 border border-pink-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Sliders className="w-5 h-5 text-pink-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-100 mb-1">Aesthetic Filters</h4>
            <p className="text-xs text-slate-400">B&W Noir, Neon Cyber, Retro 90s, and Soft Dream tones.</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Palette className="w-5 h-5 text-cyan-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-100 mb-1">Custom Frames</h4>
            <p className="text-xs text-slate-400">Obsidian, Pastel Pink, Neon Violet, and Cyber Auroras.</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/10 hover:border-amber-500/40 hover:bg-amber-950/20 transition-all text-left group">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5 text-amber-400" />
            </div>
            <h4 className="text-sm font-bold text-slate-100 mb-1">Live Webcam or Mock</h4>
            <p className="text-xs text-slate-400">Works with webcams or instant simulated portrait mode.</p>
          </div>
        </div>

        {/* Strip preview teaser cards */}
        <div className="mt-14 w-full max-w-4xl glass-panel-glow p-6 rounded-3xl border border-violet-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase flex items-center gap-1.5 mb-1">
              <ShieldCheck className="w-4 h-4" /> 100% Client-Side & Private
            </span>
            <h3 className="text-lg font-bold text-white">No photos are saved to external servers</h3>
            <p className="text-xs text-slate-400 mt-0.5">Your webcam feed and captures stay securely inside your browser memory.</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-violet-600 border-2 border-[#0d0d12] flex items-center justify-center text-xs">✌️</div>
              <div className="w-8 h-8 rounded-full bg-pink-600 border-2 border-[#0d0d12] flex items-center justify-center text-xs">✨</div>
              <div className="w-8 h-8 rounded-full bg-cyan-600 border-2 border-[#0d0d12] flex items-center justify-center text-xs">💖</div>
            </div>
            <span className="text-xs font-semibold text-slate-300">Ready in 30 seconds</span>
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <footer className="w-full py-4 border-t border-white/[0.06] text-center text-xs text-slate-500 flex items-center justify-center gap-2">
        <span>FREQZ Digital Photobooth © 2026</span>
        <span>•</span>
        <span className="inline-flex items-center gap-1">Made with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> for photobooth lovers</span>
      </footer>
    </div>
  );
};
