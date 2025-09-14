// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
      screens: {
        sm: "420px",
        xl: "1240px",
      },
      extend: {
        colors: {
          primary: "#fff",
          dark: "#2D2D2D",
          "black-600": "#222222",
          "black-700": "#212121",
          "black-900": "#121212",
          gray: "#BDBDBD",
          "gray-100": "#B9B9B9",
          "gray-200": "#FAFAFA",
          "gray-300": "#6C6660",
          "gray-400": "#737372",
          "gray-500": "#fafafa",
          green: "#50DB97",
          red: "#DA493B",
          "red-900": "#FF3A44",
          orange: "#FFC149",
        },
        boxShadow: {
          "gray-100": "0px 0px 8px 0px rgba(0, 0, 0, 0.1)",
        },
      },
      fontFamily: {
        "gotham-pro": ["GothamPro", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont"],
      },
    },
    plugins: [],
  };