/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        disabled: '#c0c4cc',
        bgColor: '#f2f3f5',
        primary: {
          100: '#e1e9ed',
          300: '#a5bdca',
          500: '#6a8ca0',
          700: '#4a6270',
          900: '#2a3840',
        },
        success: {
          100: '#e3e8e4',
          300: '#b9c9bb',
          500: '#8fa891',
          700: '#647666',
          900: '#39433a'
        },
        danger: {
          100: '#f4e5e4',
          300: '#ddb1b0',
          500: '#c67c7b',
          700: '#8b5756',
          900: '#4f3131'
        },
        warning: {
          100: '#f8f3e4',
          300: '#eadbac',
          500: '#dbc278',
          700: '#998854',
          900: '#574d30'
        },
      },
      boxShadow: (theme: any) => ({
        'around': '0 0 15px 5px rgba(0, 0, 0, 0.1)',
        'around-lg': '0 0 25px 10px rgba(0, 0, 0, 0.15)',
        'border': `0 0 0 1px ${theme('colors.neutral.300')}`,
        'focus': `0 0 0 1px ${theme('colors.primary.500')}`,
        'hover': `0 0 0 1px ${theme('colors.neutral.500')}`,
        'error': `0 0 0 1px ${theme('colors.danger.500')}`
      }),
    },
  },
  plugins: [],
}