const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Mona Sans", "Inter", "sans-serif"],
      },
      fontSize: {
        sm: "0.875rem",
      },
      colors: {
        black: "#010203",
        lime: {
          50: "#fcffe5",
          100: "#f7ffc7",
          200: "#edff95",
          300: "#d8ff42",
          400: "#c8f625",
          500: "#aadd05",
          600: "#83b100",
          700: "#638605",
          800: "#4f690b",
          900: "#42590e",
          950: "#223201",
        },
        gray: colors.slate,
      },
    },
  },
  plugins: [],
};
