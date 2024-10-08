/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        dark: "var(--dark-color)",
        grey: "var(--grey-color)",
      },
    },
  },
  plugins: [require("tailwindcss-motion")],
};
