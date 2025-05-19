/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'preto': '#121212',
        'dourado': '#D4AF37',
        'dourado-claro': '#F5E7A0',
        'marrom': '#8B4513',
        'cinza-escuro': '#333333',
        'cinza-claro': '#EFEFEF',
      },
      fontFamily: {
        'titulo': ['Playfair Display', 'serif'],
        'corpo': ['Roboto', 'sans-serif'],
      },
      animation: {
        'aparecer': 'aparecer 0.5s ease-out',
        'deslizar': 'deslizar 0.3s ease-in-out',
      },
      keyframes: {
        aparecer: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        deslizar: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};