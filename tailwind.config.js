/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // Include your source files
  ],
  theme: {
    extend: {
      keyframes: {
        sparkle: {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(0)' },
          '50%': { transform: 'translate(-50%, -50%) scale(1)' },
        }
      },
    },
    animation: {
      sparkle: 'sparkle 0.75s ease-in-out forwards',
    },
  },
  plugins: [],
}
