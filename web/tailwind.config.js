// tailwind.config.js
// Reference: https://www.tailwindcss.cn/docs/configuration

module.exports = {
  purge: {
    enabled: process.env.NODE_ENV !== 'development',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
  },
  darkMode: 'class', // or 'media'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
