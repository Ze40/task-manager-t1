import { useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ReturnUseTheme {
  theme: Theme;
  toggleTheme: () => void;
}

export const useTheme = (): ReturnUseTheme => {
  const [theme, setTheme] = useState<Theme>("light");

  const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return { theme, toggleTheme };
};
