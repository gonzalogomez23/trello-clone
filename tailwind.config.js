/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: 'rgb(var(--color-primary) / <alpha-value>)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // dark1: 'rgb(var(--color-dark1) / <alpha-value>)',
        dark1: {
          50:  '#f3f4f6',
          100: '#d9dce1',
          200: '#b6bbc5',
          300: '#8f95a3',
          400: '#69707d',
          500: '#4f5663',
          600: '#3d434e',
          700: '#2f343d',
          800: '#23282e',
          900: '#15191e',
        }
      },
      fontFamily: {
        "montserrat": ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [],
}

