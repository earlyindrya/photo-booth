import React from 'react';
import { soundManager } from '../../utils/audio';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'capsule' | 'burgundy' | 'outline' | 'ghost' | 'cyber';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  glow = false,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    soundManager.playClick();
    if (onClick) onClick(e);
  };

  const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-full active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 shadow-sm';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-sm sm:text-base px-6 py-3 gap-2.5 font-semibold',
    xl: 'text-base sm:text-lg px-8 py-3.5 gap-3 font-semibold tracking-wide'
  }[size];

  const variantStyles = {
    primary: 'bg-[#18181B] hover:bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]',
    capsule: 'bg-[#3B82F6] hover:bg-[#2563EB] text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_24px_rgba(59,130,246,0.4)]',
    burgundy: 'bg-[#8B1E27] hover:bg-[#72151D] text-white shadow-[0_4px_16px_rgba(139,30,39,0.25)] hover:shadow-[0_6px_20px_rgba(139,30,39,0.35)]',
    secondary: 'bg-white/90 hover:bg-white text-zinc-900 border border-zinc-200/90 hover:border-zinc-300 shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
    outline: 'bg-transparent border border-zinc-300 hover:border-zinc-800 text-zinc-800 hover:text-black hover:bg-black/[0.03]',
    ghost: 'bg-transparent hover:bg-zinc-100/80 text-zinc-700 hover:text-zinc-950 shadow-none',
    cyber: 'bg-[#18181B] hover:bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]'
  }[variant];

  const glowStyles = glow ? 'ring-2 ring-blue-400/40' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${glowStyles} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex shrink-0">{icon}</span>}
    </button>
  );
};