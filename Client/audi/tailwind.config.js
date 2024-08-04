/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark-blue': 'rgb(20, 32, 70)',
        'custom-dark-pink': 'rgb(237, 108, 163)'
      },
      fontFamily: {
        rye: ['Rye', 'cursive'],
        press:['Bangers','system-ui'],
        cabin:['Cabin Sketch','sans-serif'],
        roboto: ['Roboto Condensed', 'sans-serif'],
        'sans': ['YourSansFont', 'sans-serif'],
        'mono': ['YourMonoFont', 'monospace'],
        'cursive': ['YourCursiveFont', 'cursive'],
        'display': ['YourDisplayFont', 'sans-serif'],

      },
      keyframes: {
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        'slide-in-left': 'slide-in-left 0.5s ease-out',
        'slide-in-right': 'slide-in-right 0.5s ease-out',
      },
    },
  },
  plugins: [],
}

