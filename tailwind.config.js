/** @type {import('tailwindcss').Config} */
const daisyui = require("daisyui");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
       xs:'400px'
      },
      colors: {
        background: "var(--background)", // Ensure CSS variable is defined in your CSS
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    daisyui, // DaisyUI plugin included
  ],
  daisyui: {
    themes: true, // Enable DaisyUI themes, you can customize or disable if needed
  },
};
