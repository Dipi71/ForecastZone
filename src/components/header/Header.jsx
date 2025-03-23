import { Link } from "react-router-dom";
import Location from "./Location";
import SearchBar from "./SearchBar";
import ThemeSwitchToggle from "./ThemeSwitchToggle";

function Header() {
  return (
    <>
      <nav className="my-4 flex items-center justify-between gap-4 pr-6">
        <div className="hidden md:block max-w-[50%] truncate">
          <Location />
        </div>
        <div className="flex-1">
          <SearchBar />
        </div>
        <ThemeSwitchToggle />
      </nav>

      <div className="flex gap-2 py-4 px-6 text-lg font-semibold sm:px-0">
        <Link
          to="/weather-app-vite/"
          className="rounded-lg p-3 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
        >
          Today
        </Link>

        <Link
          to="forecast"
          className="rounded-lg p-3 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
        >
          Next 10 days
        </Link>
      </div>
    </>
  );
}

export default Header;
