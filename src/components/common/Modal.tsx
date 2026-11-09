import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => {
          soundManager.playClick();
          onClose();
        }}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 z-10 border border-stone-200/90 text-zinc-900 shadow-capsule-lg transition-all transform scale-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-3.5 border-b border-stone-200/80 mb-5">
          {title && (
            <h3 className="text-lg font-bold font-serif text-zinc-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#8B1E27]" />
              {title}
            </h3>
          )}
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 rounded-full text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="text-zinc-700">
          {children}
        </div>
      </div>
    </div>
  );
};