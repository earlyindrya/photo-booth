import React from 'react';
import { 
  ArrowRight, 
  Camera, 
  ShieldCheck, 
  Folder, 
  Heart
} from 'lucide-react';
import { Button } from '../common/Button';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[calc(100vh-76px)] flex flex-col justify-between overflow-hidden">
      
      {/* Subtle Aesthetic Background Accents (Ref 1, 3, 4) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
        {/* Soft dreamy sky glow (Ref 1) */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-[#DCE7F6]/50 via-[#F3EBE1]/40 to-transparent blur-[120px] rounded-full" />
        
        {/* Faint retro calendar typography watermark (Ref 4 & 5) */}
        <div className="absolute top-24 left-10 font-mono text-[90px] font-bold text-stone-200/40 tracking-tighter leading-none hidden lg:block">
          August
        </div>
        <div className="absolute top-44 right-12 font-serif italic text-[70px] text-stone-200/30 leading-none hidden lg:block">
          (recap)
        </div>

        {/* Scattered Red Dot Stickers (Ref 5) */}
        <span className="absolute top-36 left-[18%] w-3.5 h-3.5 rounded-full bg-[#D92D20] shadow-sm animate-float" />
        <span className="absolute top-52 right-[22%] w-4 h-4 rounded-full bg-[#D92D20] shadow-sm" style={{ animationDelay: '1.5s' }} />
        <span className="absolute bottom-40 left-[12%] w-3 h-3 rounded-full bg-[#D92D20] shadow-sm" />
        <span className="absolute bottom-56 right-[14%] w-4 h-4 rounded-full bg-[#D92D20] shadow-sm animate-float" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Main Hero Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-12 flex-1 flex flex-col items-center text-center justify-center">
        
        {/* Editorial Subtitle Pill (Ref 2 & 5) */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-stone-200 shadow-[0_2px_8px_rgba(0,0,0,0.03)] backdrop-blur-md mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E27]" />
          <span className="text-xs font-mono font-medium text-stone-700 tracking-wide uppercase">
            monthly recap • photobooth edition
          </span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-stone-100 text-stone-600 font-mono">vol. 08</span>
        </div>

        {/* Main Editorial Headline (Ref 1, 3, 5) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-zinc-900 tracking-tight max-w-4xl leading-[1.08] mb-5">
          Things we <span className="italic font-normal font-serif text-[#8B1E27]">loved</span>, captured forever.
        </h1>

        {/* Editorial Body / Tagline (Ref 1 & 3) */}
        <p className="text-base sm:text-lg text-stone-600 max-w-2xl font-normal leading-relaxed mb-8 text-balance font-sans">
          Real stories, creative visuals, and photobooth memories that connect. Curate Korean 4-cut filmstrips, Y2K desktop collages, and vintage gilded baroque portraits.
        </p>

        {/* Primary CTA Buttons (Ref 1 Capsule Pill Style) */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-12">
          <Button
            size="xl"
            variant="primary"
            icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            iconPosition="right"
            onClick={onStart}
            className="group px-9 py-4 text-base font-semibold shadow-capsule hover:shadow-capsule-lg transition-all"
          >
            Start Photobooth Session
          </Button>

          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/90 hover:bg-white text-zinc-800 text-sm font-semibold border border-stone-200/90 shadow-sm transition-all"
          >
            <Camera className="w-4 h-4 text-[#8B1E27]" />
            <span>Open Studio</span>
          </button>
        </div>

        {/* =========================================================================
            Interactive Visual Collage Moodboard (Inspired by Ref 1, 2, 3, 4, 5)
            ========================================================================= */}
        <div className="relative w-full max-w-4xl py-6 px-2 my-2 flex items-center justify-center">
          
          {/* Story circles preview row (Ref 2) */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-stone-200/80 shadow-sm text-[11px] font-sans text-stone-600">
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-[9px]">☕</span>
              <span>spring walks</span>
            </span>
            <span className="text-stone-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-rose-200 flex items-center justify-center text-[9px]">🥐</span>
              <span>delicious meals</span>
            </span>
            <span className="text-stone-300">•</span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-sky-200 flex items-center justify-center text-[9px]">✈️</span>
              <span>travel moments</span>
            </span>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Card Left: Vintage Baroque Gold Museum Portrait (Ref 3) */}
            <div className="md:col-span-3 hidden md:flex flex-col items-center transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-[#FAF7F2] p-2.5 rounded-2xl baroque-gold-border shadow-vintage-gold max-w-[210px] w-full text-center">
                <div className="aspect-[3/4] w-full bg-stone-800 rounded-lg overflow-hidden relative shadow-inner mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    alt="Vintage Baroque Portrait"
                    className="w-full h-full object-cover filter contrast-105 brightness-95"
                  />
                  <div className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full bg-white/90 shadow-sm" />
                </div>
                <div className="font-serif italic text-xs text-[#541016] font-semibold">
                  Curious by Heart.
                </div>
                <div className="font-mono text-[9px] text-[#8F7135] uppercase tracking-wider mt-0.5">
                  Museum Edition
                </div>
              </div>
            </div>

            {/* Card Center: Y2K Mac OS Window Collage with handles & tape (Ref 4) */}
            <div className="md:col-span-6 flex flex-col items-center z-10">
              <div className="relative bg-white rounded-2xl border border-stone-300/80 shadow-polaroid w-full max-w-[340px] overflow-hidden group">
                
                {/* Mac OS Window Header with 3 Traffic Light Dots (Ref 4) */}
                <div className="mac-window-chrome px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                  </div>
                  <div className="font-mono text-[10px] text-zinc-600 font-medium">
                    photobooth.mov
                  </div>
                  <div className="w-6" />
                </div>

                {/* Photo with Blue Selection Bounding Box & Handles (Ref 4) */}
                <div className="relative p-3 bg-stone-100/50">
                  <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-blue-400">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80"
                      alt="Photobooth portrait"
                      className="w-full h-full object-cover"
                    />

                    {/* Transform Handles at Corners and Midpoints (Ref 4) */}
                    <span className="absolute top-1 left-1 w-2 h-2 bg-blue-500 border border-white" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 border border-white" />
                    <span className="absolute bottom-1 left-1 w-2 h-2 bg-blue-500 border border-white" />
                    <span className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500 border border-white" />

                    {/* Contextual Popover Bubble: Copy | Share... (Ref 4) */}
                    <div className="absolute bottom-2 left-2 flex items-center bg-zinc-900/90 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded-md shadow-lg gap-2 pointer-events-none">
                      <span>Copy</span>
                      <span className="text-zinc-500">|</span>
                      <span>Share...</span>
                    </div>

                    {/* White circle dot stickers (Ref 2) */}
                    <span className="absolute top-4 left-6 white-dot-sticker" />
                    <span className="absolute bottom-6 right-5 white-dot-sticker" />
                  </div>

                  {/* Tape Label Tag (Ref 4) */}
                  <div className="mt-2.5 flex items-center justify-between">
                    <div className="tape-label px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-tight rotate-[-1deg]">
                      studio rec. 01 • recap
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-stone-500">
                      <span>(3)</span>
                      <span>August!!</span>
                    </div>
                  </div>
                </div>

                {/* Floating Mac OS Folder Icon (Ref 4) */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-blue-100 border border-blue-300 flex items-center justify-center shadow-md transform -rotate-12">
                  <Folder className="w-4 h-4 text-blue-500 fill-blue-500" />
                </div>
              </div>

              {/* Handwritten Signature Script at Bottom (Ref 2 "smm goza") */}
              <div className="mt-4 font-script text-2xl text-zinc-700 tracking-wide select-none">
                smm goza • capsule atelier
              </div>
            </div>

            {/* Card Right: Capsule Ticket & Booking Card (Ref 1) */}
            <div className="md:col-span-3 hidden md:flex flex-col items-center transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-stone-200/90 shadow-capsule max-w-[210px] w-full text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">
                    Strip #WE975
                  </span>
                  <span className="text-xs">✈️</span>
                </div>
                <div className="text-xs font-bold text-zinc-900 leading-tight mb-1">
                  Manage your strips, prints & memories 🎞️
                </div>
                <p className="text-[10px] text-stone-500 mb-3 leading-snug">
                  Lossless 300 DPI composite export stored directly in your browser.
                </p>
                <div className="w-full py-1.5 px-3 rounded-full bg-zinc-900 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5">
                  <span className="text-xs">⊕</span>
                  <span>Add your stuff</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Feature Highlights Grid (Ref 1 & 3 Aesthetic Cards) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl mt-10">
          
          <div className="paper-card p-4 rounded-2xl text-left hover:border-stone-400 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <span className="font-mono text-xs font-bold text-[#8B1E27]">(01)</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 mb-0.5">Editorial Formats</h4>
            <p className="text-[11px] text-stone-500 leading-relaxed">Korean 4-cut, Zine Moodboard, and Baroque Frame.</p>
          </div>

          <div className="paper-card p-4 rounded-2xl text-left hover:border-stone-400 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <span className="font-mono text-xs font-bold text-[#8B1E27]">(02)</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 mb-0.5">Film Tones & Glow</h4>
            <p className="text-[11px] text-stone-500 leading-relaxed">April Dream, Vintage UGC, Noir Zine, and 90s Flash.</p>
          </div>

          <div className="paper-card p-4 rounded-2xl text-left hover:border-stone-400 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <span className="font-mono text-xs font-bold text-[#8B1E27]">(03)</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 mb-0.5">Scrapbook Stickers</h4>
            <p className="text-[11px] text-stone-500 leading-relaxed">Red polka dots, white circles, washi tape, and cute emojis.</p>
          </div>

          <div className="paper-card p-4 rounded-2xl text-left hover:border-stone-400 transition-colors group">
            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
              <span className="font-mono text-xs font-bold text-[#8B1E27]">(04)</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 mb-0.5">Client-Side Private</h4>
            <p className="text-[11px] text-stone-500 leading-relaxed">Webcam feed never leaves your local browser memory.</p>
          </div>

        </div>

        {/* Private Privacy Guarantee Capsule (Ref 1) */}
        <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-stone-200/80 text-xs text-stone-600 shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>100% Private in Browser • No Photos Saved to External Servers</span>
        </div>

      </div>

      {/* Editorial Footer (Ref 2 & 5) */}
      <footer className="w-full py-5 border-t border-stone-200/70 text-center text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 font-mono">
        <span>capsule photobooth atelier © 2026</span>
        <span className="hidden sm:inline">•</span>
        <span>edition 08.26 / vol. 08</span>
        <span className="hidden sm:inline">•</span>
        <span className="inline-flex items-center gap-1 font-sans">
          curated with <Heart className="w-3 h-3 text-[#8B1E27] fill-[#8B1E27]" /> for memory lovers
        </span>
      </footer>

    </div>
  );
};