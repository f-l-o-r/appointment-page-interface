module.exports = {
  darkMode: false,
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  variants: {
    xtend: {},
  },
  plugins: [
    require ('@tailwindcss/forms')
  ],
}