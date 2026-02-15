/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#be1717",
          secondary: "#3885a5",
          accent: "#2a627a",
          neutral: "#151515",
          "base-100": "#ffffff",
          "base-200": "#f2f2f2",
          info: "#00b5ff",
          success: "#00a96e",
          warning: "#ffbe00",
          error: "#ff5861",
        },
      },
    ],
  },
};
