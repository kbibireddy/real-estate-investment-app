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
          start: '#0a192f',
          end: '#112240',
        },
        text: {
          primary: '#ccd6f6',
          secondary: '#8892b0',
        },
      },
    },
  },
  plugins: [],
} 