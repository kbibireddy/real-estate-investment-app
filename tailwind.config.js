/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#64ffda',
        background: {
          start: '#05101f',
          end: '#0a192f',
          paper: '#0d2140',
        },
        text: {
          primary: '#e6edf7',
          secondary: '#8892b0',
        },
      },
    },
  },
  plugins: [],
} 