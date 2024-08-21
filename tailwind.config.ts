/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        colors: {
          green: '#4CAF50',
          blue: '#1976D2',
          lightBlue: '#03A9F4',
          black: '#212121',
          strongBlack: '#000000',
          marineBlue: '#14161b',
          purple: '#7B1FA2',
          orange: '#E64A19',
          cyan: '#00BCD4',
          indigo: '#303F9F',
          strongWhite: '#FFFFF',
          white: '#fafafa',
          gray: '#ededed',
          strongGray: '#9E9E9E',
          yellow: '#FBC02D',
          red: '#D32F2F',
          lightIndigo: '#031227',
        },
        blue: {
          1: '#1976D2',
          2: '#03A9F4',
          3: '#2196F3',
          4: '#BBDEFB',
          5: '#182037',
          6: '#030b18',
          7: '#1e293b',
        },
        gray: {
          1: '#ededed',
          2: '#9E9E9E',
          3: '#37474f',
          4: '#263238',
          5: '#292c32',
          6: '#dad7d7',
        },
        teal: {
          1: '#009688',
          2: '#00897b',
          3: '#00796b',
          4: '#00695c',
          5: '#004d40',
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
      },
      fontFamily: {
        sans: ['Roboto', ...fontFamily.sans],
      },
    },
    screens: {
      mob: '375px',
      tablet: '768px',
      laptop: '1024px',
      desktop: '1280px',
      laptopl: '1440px',
    },
  },
} satisfies Config;
