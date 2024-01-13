/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base : {
          "100" : "rgb(8,8,8)",
          "200" : "rgb(10,10,10)",
          "300" : "rgb(13,13,13)",
          "400" : "rgb(16,16,16)",
          "450" : "rgb(18,18,18)",
          "500" : "rgb(20,20,20)",
          "600" : "rgb(22,22,22)",
          "700" : "rgb(25,25,25)",
          "800" : "rgb(32,32,32)",
          "900" : "rgb(40,40,40)",
        }
      }
    },

    fontSize : {
      "mini": "0.875rem", // 14px
      "thin" : ["0.9rem", {
        letterSpacing: "0.5rem"
      }], // 14.4px
      "normal" : "0,9375rem", // 15px
      "medium" : "1rem", // 16px,
      "large" : "1.1rem",
      "title" :  "1.2rem"
    }
  },
  plugins: [],
}

