/** @type {import('tailwindcss').Config} */
function withOpacity(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgba(var(${variable}) / ${opacityValue})`
  }
}

module.exports = {
  content: ['./src/*.css', './src/**/*.css', './index.html'],
  theme: {
    extend: {
      colors: {
        // primary: withOpacity('--color-primary'),
      }
    }
  },
  plugins: [],
}
