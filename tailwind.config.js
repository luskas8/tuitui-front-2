/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-black': '#212529',
        'light-black': '#495057',
        'dark-gray': '#495057',
        gray: '#495057',
        'light-gray': '#212529',

        'dark-purple': '#8E94F2',
        'smooth-purplr': '#ADA7FF',
        purple: '#BBADFF',
        'light-purple': '#E0C3FC',

        'dark-green': '#008000',
        green: '#9EF01A',
        'light-green': '#38B000',

        // blue: '#00B4D8',
        'dark-blue': '#03045E',
        'alter-blue': '#74D2E7',
        'smooth-blue': '#90E0EF',
        'light-blue': '#CAF0F8'
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      }
    }
  },
  plugins: []
}
