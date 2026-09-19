/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F7F3EA",
        surface: "#FFFFFF",
        primary: "#DD7147",
        secondary: "#33473E",
        accent: "#DCE5DD",
        textMuted: "#6B7280",
        danger: "#DC2626",
      },
    },
  },
  plugins: [],
};
