/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow:{
        '3xl':['rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'],
        '2xl':['rgba(255,255,255,0.4) 0px 1px 2px 0px,rgba(255,255,255,0.4) 0px 2px 6px 2px'],

      }
    },
  },
  plugins: [],
}