import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      spacing: {
        'navigation-height': 'var(--navigation-height)',
      },
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        transparent: 'transparent',
        white: '#fff',
        'off-white': '#f7f8f8',
        'transparent-white': 'rgba(255, 255, 255, 0.08)',
        grey: '#858699',
        'grey-dark': '#222326',
        'primary-text': '#D8D5D1',
      },
      backgroundImage: {
        'page-gradient':
          'linear-gradient(#161616, #161616 13%, rgba(22, 22, 22, 0) 89%, #161616), url(/Grid.svg)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 2000ms var(--animation-delay, 0ms) ease forwards',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },

    //custom animation utility class
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
