import React from "react";
import { useTheme } from "@/hooks/use-theme";
import { ComputerIcon, LightbulbIcon, MoonIcon } from "lucide-react";

const themeOptions = {
  light: {
    icon: <LightbulbIcon size={20} />,
  },
  dark: {
    icon: <MoonIcon size={20} />,
  },
  system: {
    icon: <ComputerIcon size={20} />,
  },
};

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <button
      onClick={() => {
        switch (theme) {
          case "dark":
            setTheme("system");
            break;
          case "system":
            setTheme("light");
            break;
          case "light":
          default:
            setTheme("dark");
            break;
        }
      }}
      className="flex flex-row gap-3 px-2 cursor-pointer items-center hover:opacity-80 h-[57px] w-full min-w-[233px] -mx-4 border-t-1 border-tertiary-border text-text-secondary"
    >
      <span>{themeOptions[theme].icon}</span>
      <span className="capitalize">{theme}</span>
    </button>
  );
};

export default ThemeToggle;
