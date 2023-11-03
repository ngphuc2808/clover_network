/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-select/dist/index.esm.js',
  ],
  theme: {
    extend: {
      colors: {
        textPrimaryColor: '#4b5563',
        textHeadingColor: '#1f2937',
        primaryColor: '#2EA043',
        secondColor: '#0F7422',
        thirdColor: '#0F7422',
        warnColor: '#ef4444',
        lightWarnColor: '#f87171',
      },
      fontFamily: {
        beVietnam: ['Be Vietnam Pro', 'sans-serif'],
      },
      boxShadow: {
        formButton: 'rgba(0, 0, 0, 0.6) 0px 3px 9px;',
        shadowPrimary:
          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      },
      screens: {
        '2xl': '1420px',
      },
    },
  },
}
