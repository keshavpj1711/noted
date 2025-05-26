/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    blur: {
      '4xl': '100px', // Example custom blur
      '5xl': '150px',
      '6xl': '200px',
    }
  },
};
export const plugins = [];
