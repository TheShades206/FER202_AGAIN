import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const rootElement = document.documentElement;
    const previousTheme = rootElement.getAttribute("data-bs-theme");
    rootElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");

    return () => {
      if (previousTheme === null) {
        rootElement.removeAttribute("data-bs-theme");
      } else {
        rootElement.setAttribute("data-bs-theme", previousTheme);
      }
    };
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((previousTheme) => !previousTheme);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
