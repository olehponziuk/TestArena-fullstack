module.exports = {
  content: [
    "./index.html", 
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  safelist: [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-amber-500",  
    "bg-violet-500", 
    "bg-orange-500",
    "bg-black",
    "bg-white"
  ],
  theme: {
    extend: {
      colors: {
        'custom-light-green': 'rgb(207, 232, 217)',
      },
    },
  },
  plugins: [],
};
