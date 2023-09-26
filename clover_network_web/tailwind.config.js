/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        textPrimaryColor: "#4b5563",
        textHeadingColor: "#1f2937",
        primaryColor: "#2EA043",
        secondColor: "#0F7422",
      },
      fontFamily: {
        beVietnam: ["Be Vietnam Pro", "sans-serif"],
      },
      backgroundImage: {
        banner: "url('banner.png')",
      },
      boxShadow: {
        formButton: "rgba(0, 0, 0, 0.6) 0px 3px 9px;",
      },
    },
  },
  plugins: [],
};
