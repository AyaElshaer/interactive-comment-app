/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "light-gray": "hsl(223, 19%, 93%)",
      "very-light-gray": "hsl(228, 33%, 97%)",
      white: "hsl(0, 0%, 100%)",
      black: "hsl(0, 0%, 0%)",
      "moderate-blue": "hsl(238, 40%, 52%)",
      "grayish-blue": "hsl(211, 10%, 45%)",
      "dark-blue": "hsl(212, 24%, 26%)",
      "light-grayish-blue": "hsl(239, 57%, 85%)",
      "pale-red": "hsl(357, 100%, 86%)",
      "soft-red": "hsl(358, 79%, 66%)",
    },
  },
  plugins: [],
};

