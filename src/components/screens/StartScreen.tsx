import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">

      {/* Scattered red dots around the page */}
      <span className="absolute top-12 left-[8%] red-dot-xl animate-float" />
      <span className="absolute top-24 right-[10%] red-dot-lg" />
      <span className="absolute top-[18%] left-[22%] red-dot-sticker" />
      <span className="absolute top-[35%] right-[6%] red-dot-xl animate-float" style={{ animationDelay: '1.5s' }} />
      <span className="absolute bottom-[28%] left-[5%] red-dot-xl" />
      <span className="absolute bottom-[18%] right-[18%] red-dot-lg animate-float" style={{ animationDelay: '0.8s' }} />
      <span className="absolute bottom-16 left-[30%] red-dot-sticker" />
      <span className="absolute top-[55%] left-[14%] red-dot-sticker" />

      {/* Main card with blue stripes */}
      <div className="relative w-full max-w-sm rounded-3xl border-2 border-zinc-800 overflow-hidden shadow-xl">
        
        {/* Striped background */}
        <div className="absolute inset-0 bg-blue-stripes opacity-80" />

        {/* Content overlay */}
        <div className="relative z-10 p-7 pb-8 flex flex-col items-center text-center gap-4">
          
          {/* Big serif headline */}
          <div className="bg-[#F5EFE7]/90 rounded-2xl px-5 py-4 w-full shadow-sm">
            <h1 className="font-dotbooth text-4xl font-bold leading-tight text-[#5C1010]">
              The girls are in<br />
              the{' '}
              <em className="text-[#C8201A] not-italic font-bold">dot booth</em>
            </h1>
          </div>

          {/* Subtitle pill */}
          <div className="bg-white/90 rounded-full px-5 py-2 border border-zinc-200 shadow-sm">
            <p className="text-sm font-medium text-zinc-800">
              Four shots. Polka dots. One strip.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onStart}
            className="flex flex-col items-center gap-0.5 group"
          >
            <span className="text-base font-bold tracking-widest text-[#5C1010] uppercase group-hover:text-[#C8201A] transition-colors">
              TAKE A PIC
            </span>
            <span className="block h-0.5 w-full bg-[#5C1010] group-hover:bg-[#C8201A] transition-colors rounded-full" />
          </button>

          {/* Privacy note */}
          <div className="bg-white/90 rounded-full px-4 py-1.5 border border-zinc-200 shadow-sm">
            <p className="text-xs text-zinc-600">
              Your photos never leave your device.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
