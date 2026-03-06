/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/sanity/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#002b3a',
        darkOrange: '#cf5a20',
        orange: '#f68f1e',
        blueStart: '#2497c8',
        blueEnd: '#65c6db',
      },
      fontFamily: {
        heading: ['var(--font-comfortaa)', 'sans-serif'],
        body: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
