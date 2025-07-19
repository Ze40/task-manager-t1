module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ghost: "var(--ghost)", // Используем CSS-переменную напрямую
      },
    },
  },
  plugins: [],
};
