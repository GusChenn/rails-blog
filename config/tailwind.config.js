const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
    './app/components/**/*.{rb,erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      rotate: {
        '30': '30deg',
      },
      spacing: {
        'fuller': '150%',
      },

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
  purge: {
    safelist: [
      {
        pattern: /text-.+-.+/
      },
      {
        pattern: /bg-.+-.+/
      }
    ]
  },
};
