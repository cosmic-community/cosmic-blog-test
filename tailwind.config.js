/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        technology: '#3B82F6',
        lifestyle: '#10B981',
        business: '#8B5CF6',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}