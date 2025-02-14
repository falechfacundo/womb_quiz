/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        power: {
          100: "#DAD6DB",
          200: "#BCB5BF",
          300: "#9E94A2",
          400: "#807286",
          500: "#625169",
          600: "#44304D",
          800: "#59495f",
          900: "#4c3f50",
          950: "#2c2230",
        },
        clay: {
          100: "#EFDCDA",
          200: "#E2C0BC",
          300: "#D5A49E",
          400: "#C78780",
          500: "#BA6B62",
          600: "#AD4F44",
          700: "#8f4d46",
          800: "#77433d",
        },
        blush: {
          100: "#F9F1EF",
          200: "#F4E6E2",
          300: "#EFDBD6",
          400: "#EAD1C9",
          500: "#E5C6BD",
          600: "#E0BBB0",
          700: "#8f5746",
          900: "#654137",
        },
        sky: {
          100: "#F3F8FC",
          200: "#EAF2F9",
          300: "#D4E5F3",
          400: "#E1EDF7",
          500: "#CEE2F2",
          600: "#C5DCEF",
          800: "#3c5991",
        },
        sage: {
          100: "#F0EFE5",
          200: "#E4E2D0",
          300: "#D7D5BB",
          400: "#CBC7A7",
          500: "#BEBA92",
          600: "#B2AD7D",
        },
        golden: {
          100: "#FCF0DC",
          200: "#FAE4C0",
          300: "#F7D9A4",
          400: "#F5CD89",
          500: "#F2C26D",
          600: "#F0B651",
        },
        cloud: {
          100: "#E8E4E2",
        },
        rich_black: {
          100: "#050113",
        },
      },
    },
    fontFamily: {
      HVFlorentino: ["HVFlorentino", "sans-serif"],
      FiguraSans: ["FiguraSans", "sans-serif"],
    },
  },
  plugins: [],
};
