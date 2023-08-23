/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      gray: {
        100: 'hsl(0deg 0% 94.51%)',
        200: 'hsl(0deg 0% 34.9%)',
        300: 'hsl(0deg 0% 20%)',
        400: '#D9D9D9'
      },
      purple: {
        100: '#EFEBFF',
        200: '#BEADFF',
        300: '#6500FF'
      },
      white: '#FFFFFF',
     blaclk: '#000',
      red: '#FF3939',
      transparent: 'transparent'
    }
  },
  plugins: []
}
