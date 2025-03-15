import { BsMoonStars, BsSun } from "react-icons/bs";
import { useState, useEffect } from "react";

function ThemeSwitchToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      className="flex items-center justify-center rounded-md p-2 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <BsMoonStars className="text-xl text-gray-800" />
      ) : (
        <BsSun className="text-xl text-yellow-300" />
      )}
    </button>
  );
}

export default ThemeSwitchToggle;
