/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#2EC4B6",

          "secondary": "#FF9F1C",

          "accent": "#c084fc",

          "neutral": "#CBF3F0",

          "base-100": "#545454",

          "info": "#ffff",

          "success": "#84cc16",

          "warning": "#facc15",

          "error": "#b91c1c",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};