/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        terminal: {
          blue: '#1793d1',
          'arch-blue': '#0088cc',
          'dark-bg': '#0c0c0c',
          'light-bg': '#1a1a1a',
          'border': '#2a2a2a',
          'text': '#c5c8c6',
          'green': '#5fd700',
        },
      },
    },
  },
  plugins: [],
};
