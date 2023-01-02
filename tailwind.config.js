/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./prototype/*.html"],
  theme: {
    extend: {
      keyframes: {
        moveto: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      animation: {
        'moveto-right': 'moveto 1s ease-in infinite',
      },
    },
  },
  variants: {},
  plugins: [],
}
