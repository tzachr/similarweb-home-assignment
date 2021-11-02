module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        480: "480px",
        88: "88%"
      },
      height: {
        558: "558px",
      }
    },
  },
  variants: {
    opacity: ['disabled'],
  },
  plugins: [],
}
