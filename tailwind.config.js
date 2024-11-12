/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: 'rgb(var(--color-primary) / <alpha-value>)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      fontFamily: {
        "montserrat": ["Montserrat", "sans-serif"]
      }
    },
  },
  plugins: [],
}

