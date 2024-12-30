import {Colors,Spacing} from './src/atomic/obj.constants/constants'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    spacing: Spacing,
    extend: {
      colors: {
        primary:Colors.primary,
      },
    },
  },
  plugins: [],
}

