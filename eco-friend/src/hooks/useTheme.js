import { useEffect, useState } from "react";

function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("ecoTheme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);

    localStorage.setItem("ecoTheme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return { theme, toggleTheme };
}

export default useTheme;