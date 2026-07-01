/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        pink: '#FFB5C8',
        sage: '#C8E6C9',
        purple: '#E8D5F5',
      },
      fontFamily: {
        sans: ['ZCOOL KuaiLe', 'Fredoka', 'sans-serif'],
      },

      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
