/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        myRocket: {
          "0%, 100%": { transform: "translateY(0px) scale(3) rotateY(0deg)" },
          // "25%": { transform: "translateY(-15px) scale(3.2) rotateY(30deg)" },
          "50%": { transform: "translateY(-100px) scale(3.4) rotateY(360deg)" },
          // "75%": { transform: "translateY(-15px) scale(3.2) rotateY(30deg)" },
        },
      },
      animation: {
        myRocket: "myRocket 2s cubic-bezier(0, 0.03, 0, 1.28) infinite",
      },
    },
  },
  plugins: [],
};