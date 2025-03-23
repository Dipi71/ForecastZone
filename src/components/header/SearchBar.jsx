import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { saveLocation, updateSearchValue } from "../../features/search/searchSlice";
import { saveGeoCode } from "../../features/geolocation/geolocationSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();

  const handleInput = async (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.length > 2) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`);
      const data = await response.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleChange = async (selectedValue) => {
    const locationData = suggestions.find((item) => item.display_name === selectedValue);
    if (!locationData) return;

    const { lat, lon } = locationData;
    dispatch(updateSearchValue(selectedValue));
    dispatch(saveLocation(selectedValue));
    dispatch(saveGeoCode({ lat: parseFloat(lat), lng: parseFloat(lon) }));
    setQuery("");
    setSuggestions([]);
  };

  return (
    <Combobox as="div" onChange={handleChange} value={query} className="relative w-full max-w-lg" nullable>
      <div className="relative">
        <MagnifyingGlassIcon className="pointer-events-none absolute top-2 left-5 h-6 w-6 text-gray-900 text-opacity-40 dark:text-gray-400" />
        <Combobox.Input
          type="text"
          autoComplete="off"
          onChange={handleInput}
          placeholder="Search city..."
          className="w-full rounded-lg bg-neutral-50 py-2.5 pl-14 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 dark:bg-neutral-900 dark:text-gray-100 dark:placeholder-gray-400 sm:text-sm"
        />
      </div>

      {suggestions.length > 0 && (
        <Combobox.Options className="absolute -mb-2 -mt-1.5 max-h-72 w-full max-w-lg overflow-auto rounded-b-lg bg-white text-sm text-gray-800 shadow-lg">
          {suggestions.map((location) => (
            <Combobox.Option
              key={location.place_id}
              value={location.display_name}
              className={({ active }) =>
                classNames("cursor-default select-none px-4 py-2", active && "bg-neutral-200 text-black")
              }
            >
              {location.display_name}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      )}
    </Combobox>
  );
}

export default SearchBar;