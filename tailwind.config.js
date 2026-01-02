/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'win-bg': '#1a1525',
        'win-surface': '#2a2135',
        'win-header': '#3d3148',
        'win-text': '#f5e6ff',
        'win-highlight': '#5a4a6a',
        'win-shadow': '#0f0c14',
        'win-accent': '#ff4d8d',
        'win-taskbar': '#221b2e',
        'win-secondary': '#ff85a1',
      },
      fontFamily: {
        'retro': ['Tahoma', '"MS Sans Serif"', 'Verdana', '"Segoe UI"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'sparkle': 'shimmer 1.5s ease-in-out infinite',
        'snowfall': 'snowfall 10s linear infinite',
        'christmas-glow': 'christmasGlow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '0.3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        snowfall: {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)' },
        },
        christmasGlow: {
          '0%, 100%': { textShadow: '0 0 5px currentColor, 0 0 10px currentColor' },
          '50%': { textShadow: '0 0 15px currentColor, 0 0 25px currentColor' },
        },
      },
    },
  },
  plugins: [],
}
