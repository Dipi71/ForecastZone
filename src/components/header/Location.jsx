import { MapPinIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

function Location() {
  const selectedLocation = useSelector((state) => state.search.location);

  return (
    selectedLocation && (
      <div className="flex w-fit flex-row items-center gap-2 py-2">
        <MapPinIcon className="h-6 w-6 flex-none text-gray-700" />
        <div className="h-6 overflow-hidden text-ellipsis whitespace-nowrap text-gray-900">
          {selectedLocation}
        </div>
      </div>
    )
  );
}

export default Location;
