import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#e8dfd0',
          300: '#d4c4a8',
          400: '#bfa882',
          500: '#a68c5b',
          600: '#8a7048',
          700: '#6e5839',
          800: '#52412b',
          900: '#362a1c',
        },
        ink: {
          50: '#f5f5f5',
          100: '#e5e5e5',
          200: '#cccccc',
          300: '#b3b3b3',
          400: '#999999',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#1a1a1a',
          900: '#0d0d0d',
        },
        pop: {
          100: '#e07850',
          50: '#f0a080',
          200: '#c05830',
        },
        // Wave/Water palette extracted from the image
        wave: {
          50: '#e8f4f8',   // Lightest - soft sky reflection
          100: '#b8e4f0',  // Light cyan highlights
          200: '#7ec8e3',  // Sky blue reflections
          300: '#4aa8c7',  // Bright water
          400: '#3a9bb5',  // Teal cyan
          500: '#1a5a7a',  // Ocean blue (primary)
          600: '#0d3a5c',  // Deep water
          700: '#0d2637',  // Dark navy shadows
          800: '#0a1a28',  // Very dark blue
          900: '#0a0f14',  // Near black - deepest shadows
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        futuralt: ['FuturaLT', 'sans-serif'],
        goudy: ['Goudi', 'serif'],
      },
    },
  },
  plugins: [],
};

export default config;
