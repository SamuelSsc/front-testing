import { Colors, Spacing } from "./src/atomic/obj.constants/constants";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    spacing: Spacing,
    fontSize: {
      "3xs": "12px",
      "2xs": "14px",
      xs: "16px",
      sm: "18px",
      md: "20px",
      lg: "24px",
      xl: "32px",
    },
    extend: {
      colors: Colors,
    },
  },
  plugins: [],
};
