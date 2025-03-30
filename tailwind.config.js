/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'premium-gray': '#9CA3AF',
        'premium-green': '#10B981',
      },
      transitionDuration: {
        '400': '400ms',
      }
    },
  },
  plugins: [],
}

