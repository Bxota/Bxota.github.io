/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#05668D',
          light: '#028090',
        },
        secondary: {
          DEFAULT: '#00A896',
          light: '#02C39A',
        },
        accent: '#F0F3BD',
      },
      fontFamily: {
        balgin: ['Balgin Black', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}