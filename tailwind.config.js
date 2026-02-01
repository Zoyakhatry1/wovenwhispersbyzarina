/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'cream': {
          50: '#fffef9',
          100: '#fffcf0',
        },
        'olive': {
          50: '#f7f8f3',
          100: '#e8ebe0',
          200: '#d1d7c1',
          300: '#b5be9c',
          400: '#9aa67a',
          500: '#7f8c5d',
          600: '#687149',
          700: '#51593a',
          800: '#434931',
          900: '#393d2a',
        },
      },
      fontFamily: {
        sans: ['var(--font-quicksand)', 'ui-sans-serif', 'system-ui'],
        serif: ['var(--font-playfair)', 'ui-serif', 'Georgia'],
      },
      animation: {
        'bounce': 'bounce 2s infinite',
        'pulse': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
