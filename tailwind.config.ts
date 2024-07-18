import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: '1.3rem',
      sm: '1.4rem',
      md: '1.6rem',
      lg: '1.8rem',
      xl: ['2.2rem', '1.3'],
      '2xl': '2.4rem',
      '3xl': '2.6rem',
      '4xl': '3.2rem',
      '5xl': '4rem',
      '6xl': ['4.4rem', '1'],
      '7xl': ['4.8rem', '1'],
      '8xl': ['8rem', '1'],
    },
    spacing: {
      0: '0',
      1: '0.4rem',
      2: '0.8rem',
      3: '1.2rem',
      4: '1.6rem',
      5: '2rem',
      6: '2.4rem',
      7: '2.8rem',
      8: '3.2rem',
      9: '3.6rem',
      10: '4rem',
      11: '4.4rem',
      12: '4.8rem',
      13: '5.2rem',
      14: '5.6rem',
      15: '6rem',
      16: '6.4rem',
      'navigation-height': 'var(--navigation-height)',
    },
    extend: {
      colors: {
        transparent: 'transparent',
        white: '#fff',
        'off-white': '#f7f8f8',
        'transparent-white': 'rgba(255, 255, 255, 0.08)',
        background: '#161616',
        grey: '#858699',
        'grey-dark': '#222326',
        'primary-text': '#D8D5D1',
      },

      backgroundImage: {
        'page-gradient':
          'linear-gradient(#161616, #161616 13%, rgba(22, 22, 22, 0) 89%, #161616), url(/Grid.svg)',
      },
    },

    keyframes: {
      'fade-in': {
        from: { opacity: '0', transform: 'translateY(-10px)' },
        to: { opacity: '1', transform: 'none' },
      },
    },
    //custom animation utility class
    animation: {
      'fade-in': 'fade-in 2000ms var(--animation-delay, 0ms) ease forwards',
    },
  },
  plugins: [],
} satisfies Config;
