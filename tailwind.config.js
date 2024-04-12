/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": ["Open Sans", "sans-serif"]
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      screens: {
        "3xs": "350px",
        "2xs": "450px",
        "xs": "550px"
      },
      boxShadow: {
        "top-shadow": "0 -1px 4px rgba(0, 0, 0, 0.3)"
      },
      keyframes: {
        codeFlash: {
          "0%, 60%": { opacity: 1 },
          "61%, 75%": { opacity: 0 },
          "76%": { opacity: 1 }
        }
      },
      animation: {
        codeFlash: "codeFlash 6s step-start infinite"
      }
    },
  },
  plugins: [],
}

