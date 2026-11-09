import React from 'react';
import { soundManager } from '../../utils/audio';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cyber';
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

  const baseStyles = 'relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-xl active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
    xl: 'text-lg px-8 py-4 gap-3 font-bold tracking-wide'
  }[size];

  const variantStyles = {
    primary: 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-700/50',
    cyber: 'bg-gradient-to-r from-cyan-500 via-violet-600 to-fuchsia-500 hover:brightness-110 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] font-bold',
    secondary: 'bg-white/10 hover:bg-white/15 text-slate-100 border border-white/10 hover:border-white/20 backdrop-blur-md',
    outline: 'bg-transparent border border-violet-500/50 hover:border-violet-400 text-violet-300 hover:text-white hover:bg-violet-950/30',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white'
  }[variant];

  const glowStyles = glow ? 'animate-pulse-glow' : '';

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
