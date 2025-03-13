import { useSelector } from "react-redux";
import { MdVisibility } from "react-icons/md";
import { useGetCurrentWeatherQuery } from "../../services/WeatherApi";

function Visibility() {
  // Get geolocation data
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);

  // Fetch current weather data
  const { data, isSuccess, isLoading, isError } = useGetCurrentWeatherQuery({
    lat,
    lng,
  });

  function distanceFormatting(distance) {
    if (!distance && distance !== 0) return "Data unavailable";
    return distance >= 1000 ? (distance / 1000).toFixed(1) + " km" : distance + " m";
  }

  function dataProcessor(visibilityValue) {
    if (!visibilityValue && visibilityValue !== 0) return "Visibility data not available";
    
    const visibility = visibilityValue / 1000;
    if (visibility >= 10) return "It's perfectly clear right now.";
    if (visibility >= 5) return "Moderate visibility with slight haze.";
    if (visibility >= 1) return "Visibility is reduced due to haze or fog.";
    return "Very low visibility, take precautions!";
  }

  return (
    <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
      {/* TITLE */}
      <div className="flex flex-row gap-1">
        <MdVisibility className="h-4 w-4" />
        <div className="text-xs font-semibold">VISIBILITY</div>
      </div>

      {/* LOADING & ERROR HANDLING */}
      {isLoading && <div className="mt-3 text-sm text-gray-500">Loading...</div>}
      {isError && <div className="mt-3 text-sm text-red-500">Failed to fetch data</div>}

      {/* MAIN CONTENT */}
      {isSuccess && data?.visibility !== undefined && (
        <>
          <div className="mt-2 h-full">
            <div className="text-2xl font-semibold">{distanceFormatting(data.visibility)}</div>
          </div>
          <div className="text-xs">{dataProcessor(data.visibility)}</div>
        </>
      )}
    </div>
  );
}

export default Visibility;
