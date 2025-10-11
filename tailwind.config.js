/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        spaced: ["Spaced", "sans-serif"],
        ethenocentric: ["Ethenocentric", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
      },
      keyframes: {
        scrollDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        scrollUp: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        scrollDown: 'scrollDown 6s linear infinite',
        scrollUp: 'scrollUp 6s linear infinite',
      },
    },
  },
  plugins: [],
};
