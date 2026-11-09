/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0a0c',
          charcoal: '#0d0d0d',
          dark: '#121217',
          surface: '#181820',
          border: '#262633',
          purple: '#8B5CF6',
          pink: '#EC4899',
          cyan: '#06B6D4',
          accent: '#A855F7',
        }
      },
      boxShadow: {
        'neon-purple': '0 0 25px -5px rgba(139, 92, 246, 0.5)',
        'neon-pink': '0 0 25px -5px rgba(236, 72, 153, 0.5)',
        'neon-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.5)',
        'glow-sm': '0 0 10px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 35px rgba(236, 72, 153, 0.4), 0 0 15px rgba(6, 182, 212, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'shutter': 'shutterFlash 0.35s ease-out forwards',
        'float': 'floating 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 20px 2px rgba(139, 92, 246, 0.4), 0 0 40px 6px rgba(236, 72, 153, 0.2)'
          },
          '50%': {
            boxShadow: '0 0 35px 8px rgba(139, 92, 246, 0.7), 0 0 60px 15px rgba(236, 72, 153, 0.4)'
          }
        },
        shutterFlash: {
          '0%': { opacity: '0.95', backgroundColor: '#ffffff' },
          '100%': { opacity: '0', backgroundColor: '#ffffff' }
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    },
  },
  plugins: [],
};
