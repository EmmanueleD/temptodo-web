/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',     // Nero
        secondary: '#FFF200',   // Giallo chiaro
        background: '#FFFFFF',
        surface: '#F8F9FA',
        text: '#2D3436',
        accent: '#FF6B6B',      // Rosso accento
        'text-secondary': '#B2BEC3'
      }
    },
  },
  plugins: [],
}