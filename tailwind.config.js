module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./util/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
      'darkimg':"url('/util/black.jpg')"
      }
    },
    colors: {
      primarycolor:"#6B62FF",
     //primarycolor:"#4db24c",
      darkblack:"#1A1E23]",
      lightwg:"#dcdcdc",
      primarylight:"#6b62ff2e",
      // whitelight:"#23272F",
      whitelight:"#dcdcdc",
      secoundblack:"#23272F",
      lightblack:"#374151",
      white:"#FFFFFF",
      blacktext:"#8F9094",
      gradent1_1:"#9999DD",
      gradent1_2:"#8FDEF2"
     },
  
  },
  plugins: [],
}

// #6B62FF
