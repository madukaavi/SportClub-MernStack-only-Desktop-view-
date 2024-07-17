/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Roboto", 'sans-serif'],
        
      },
      fontSize: {
        'custom-20': '20px', 
        'custom-16': '16px',
        'custom-25': '25px',
        'custom-11': '11px', 


      },
      colors: {
        'rgba-36-40-51-1': 'rgba(36, 40, 51,1)',
        'rgba-239-246-255-1': 'rgba(239, 246, 255,1)',

      }
    },
  },
  plugins: [],
}

