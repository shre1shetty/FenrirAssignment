import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme(): [
  Theme,
  React.Dispatch<React.SetStateAction<Theme>>,
] {
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "light";

    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return [theme, setTheme];
}
