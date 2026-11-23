/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#030712',
          surface: '#080d22',
          card: '#0b132b',
          cardHover: '#111d40',
          border: '#1c2850',
          borderActive: '#00f3ff',
          cyan: '#00f3ff',
          blue: '#0066ff',
          neon: '#00ff66',
          amber: '#ffb703',
          purple: '#9d4edd',
          red: '#ff0055',
          muted: '#64748b',
          text: '#e2e8f0',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Consolas', 'Fira Code', 'monospace'],
        display: ['"Rajdhani"', '"Orbitron"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(0, 243, 255, 0.45)',
        'glow-cyan-lg': '0 0 35px -5px rgba(0, 243, 255, 0.6)',
        'glow-blue': '0 0 25px -3px rgba(0, 102, 255, 0.5)',
        'glow-neon': '0 0 20px -3px rgba(0, 255, 102, 0.5)',
        'glow-amber': '0 0 20px -3px rgba(255, 183, 3, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        'scan': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        'scan': {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
