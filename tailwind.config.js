/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0B0E',
        sidebar: '#0E0E14',
        card: {
          DEFAULT: '#13131B',
          hover: '#171723',
          border: '#20202E',
        },
        gold: {
          300: '#FDE047',
          400: '#FACC15',
          500: '#E5A93C',
          600: '#D4A843',
          700: '#B48427',
        },
        flame: {
          500: '#E8634A',
          600: '#D94E34',
        },
        status: {
          done: '#10B981', // Emerald green
          minimum: '#3B82F6', // Blue
          todo: '#6B7280', // Slate/Gray
          missed: '#71717A', // Muted slate, non-punitive, adult tone
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
        'amber-glow': '0 0 25px -5px rgba(229, 169, 60, 0.25)',
      }
    },
  },
  plugins: [],
}
