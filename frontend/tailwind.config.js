/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E293B", // Dark Blue Gray
        secondary: "#10B981", // Emerald Green
        accent: "#F59E0B", // Amber Yellow
        text: "#F1F5F9", // Light Gray
        error: "#EF4444", // Bright Red
      },
      fontFamily: {
        mono: ['"Roboto Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
