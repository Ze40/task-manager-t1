import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

interface ThemeSwitchProps {
  className?: string;
}

const ThemeSwitch = ({ className }: ThemeSwitchProps) => {
  const { toggleTheme, theme } = useTheme();
  return (
    <div className={className}>
      <button
        type="button"
        className="flex gap-6 bg-secondary px-5 py-4 rounded-full relative items-center"
        onClick={toggleTheme}
      >
        <div className={cn(theme === "dark" && "opacity-50", "z-10")}>
          <Sun size={16} />
        </div>
        <div className={cn(theme === "light" && "opacity-50", "z-10")}>
          <Moon size={16} />
        </div>
        <div
          className={cn(
            "bg-background w-12 h-8 absolute rounded-full left-0",
            theme === "light" ? "translate-x-1" : "translate-x-[calc(100%-0.25rem)]",
            "transition-transform duration-300 ease-in-out"
          )}
        ></div>
      </button>
    </div>
  );
};

export default ThemeSwitch;
