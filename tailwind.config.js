/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Caveat"', 'cursive'],
        mono: ['"Space Mono"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        paper: {
          50: '#FCFBF9',
          100: '#FAF7F2',
          200: '#F5EFE6',
          300: '#EBE2D5',
          400: '#D5C9B8',
          border: '#E8E2D6',
        },
        burgundy: {
          50: '#FDF2F4',
          100: '#FBE8EC',
          500: '#A62639',
          600: '#8B1E27',
          700: '#6E161E',
          800: '#541016',
          900: '#3A090D',
        },
        capsule: {
          blue: '#3B82F6',
          sky: '#E0EDFB',
          light: '#F0F6FF',
          dark: '#1E293B',
        },
        vintage: {
          gold: '#C5A059',
          goldDark: '#8F7135',
          goldLight: '#F7E7C4',
          redDot: '#D92D20',
          folder: '#60A5FA',
        }
      },
      boxShadow: {
        'capsule': '0 20px 40px -15px rgba(0, 0, 0, 0.07), 0 0 1px 1px rgba(0, 0, 0, 0.05)',
        'capsule-lg': '0 25px 60px -15px rgba(30, 41, 59, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'photo-frame': '0 12px 30px -8px rgba(30, 20, 10, 0.15), 0 2px 6px -1px rgba(0,0,0,0.08)',
        'vintage-gold': '0 8px 24px -4px rgba(197, 160, 89, 0.35)',
        'polaroid': '0 14px 28px rgba(0,0,0,0.1), 0 6px 10px rgba(0,0,0,0.06)',
      },
      animation: {
        'shutter': 'shutterFlash 0.35s ease-out forwards',
        'float': 'floating 4s ease-in-out infinite',
        'float-slow': 'floating 6s ease-in-out infinite',
        'subtle-pulse': 'subtlePulse 3s infinite ease-in-out',
      },
      keyframes: {
        shutterFlash: {
          '0%': { opacity: '0.95', backgroundColor: '#ffffff' },
          '100%': { opacity: '0', backgroundColor: '#ffffff' }
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        subtlePulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      }
    },
  },
  plugins: [],
};
