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
      colors: {
        neutral: {
          750: "#2b2b2b"
        }
      },
      boxShadow: {
        "top-shadow": "0 -2px 8px rgba(0, 0, 0, 0.4)",
        "bot-shadow": "0 5px 8px rgba(0, 0, 0, 0.4)",
        "accordion-shadow": "0 0 6px 3px rgba(0, 0, 0, 0.5)"
      },
      keyframes: {
        codeFlash: {
          "0%, 60%": { opacity: 1 },
          "61%, 70%": { opacity: 0 },
          "71%": { opacity: 1 }
        },
        scrollDown: {
          "0%": { 
            opacity: 0,
            transform: "rotate(45deg) translate(-15px, -15px)"
          },
          "50%": { opacity: 1 },
          "100%": { 
            opacity: 0,
            transform: "rotate(45deg) translate(15px, 15px)"
          }
        }
      },
      animation: {
        codeFlash: "codeFlash 4s step-start infinite",
        scrollDown: "scrollDown 2s infinite"
      }
    },
  },
  plugins: [],
}

