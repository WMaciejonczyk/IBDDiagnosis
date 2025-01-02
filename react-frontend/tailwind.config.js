/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,svg}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'light-blue': '#7894EA',
        'deep-blue': '#4169E1',
        'bluee': '#106EBE',
        'mint': '#0FFCBE',
        'soft-blue': '#1C76DF',
        'muted-navy': '#2C3E50',
        'grayish-blue': '#F4F4F4',
        'faq-gradient-dark-blue': '#296BB8',
        'faq-gradient-light-blue': '#307BD3',},
      }
  },
  plugins: [],
}