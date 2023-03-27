const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    fontSize: {
      xxs: ['10px', { lineHeight: '14px' }],
      xs: ['12px', { lineHeight: '18px' }],
      sm: ['14px', { lineHeight: '20px' }],
      md: ['16px', { lineHeight: '22px' }],
      lg: ['18px', { lineHeight: '24px' }],
      xl: ['20px', { lineHeight: '26px' }],
      '2xl': ['24px', { lineHeight: '30px' }],
      '3xl': ['32px', { lineHeight: '38px' }],
      '4xl': ['40px', { lineHeight: '46px' }],
      '5xl': ['48px', { lineHeight: '46px' }],
    },
    fontWeight: {
      'extra-light': 200,
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        a: {
          fontSize: theme('fontSize.xs'),
          fontWeight: theme('fontWeight.regular'),
          textTransform: 'uppercase',
        },
        h1: {
          fontSize: theme('fontSize.4xl'),
          fontWeight: theme('fontWeight.medium'),
          textTransform: 'uppercase',
        },
        h2: {
          fontSize: theme('fontSize.3xl'),
          fontWeight: theme('fontWeight.medium'),
          textTransform: 'uppercase',
        },
        h3: {
          fontSize: theme('fontSize.2xl'),
          fontWeight: theme('fontWeight.medium'),
          textTransform: 'uppercase',
        },
        h4: {
          fontSize: theme('fontSize.xl'),
          fontWeight: theme('fontWeight.medium'),
          textTransform: 'uppercase',
        },
        h5: {
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.medium'),
          textTransform: 'uppercase',
        },
        h6: {
          fontSize: theme('fontSize.xs'),
          fontWeight: theme('fontWeight.medium'),
          textTransform: 'uppercase',
        },
      });
    }),
  ],
};
