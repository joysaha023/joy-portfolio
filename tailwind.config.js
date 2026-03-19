/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
      },
      colors: {
        space: '#060b18',
        mint: '#6EE7B7',
        blue: '#93C5FD',
        pink: '#F9A8D4',
        yellow: '#FCD34D',
      },
    },
  },
  plugins: [],
}
