const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
    './app/components/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
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
      'text-slate-600', 'text-zinc-700', 'text-stone-500', 'text-red-400', 'text-orange-400', 'text-yellow-700', 'text-lime-500', 'text-green-400', 'text-teal-400', 'text-blue-500', 'text-indigo-800', 'text-violet-700', 'text-purple-400', 'text-pink-600', 'text-rose-400'
    ]
  }

}
