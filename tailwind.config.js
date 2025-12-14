/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        serif: ['var(--font-cinzel)', 'serif'],
        jp: ['var(--font-noto-serif-jp)', 'serif'],
      },
      colors: {
        'samurai': {
          black: '#0f0f10',
          dark: '#1a1a1c',
        },
        'paper': '#f0f0f0',
        'gold': {
          DEFAULT: '#ccaa6c',
          light: '#e6c88d',
          dark: '#b89655',
        },
        'blood': '#8a1c1c',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
