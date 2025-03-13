import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { HiSun } from "react-icons/hi";

function UVIndex() {
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const [data, setData] = useState(null);
  const [uvIndex, setUvIndex] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lng) return; // Ensure lat/lng exist before API call

    const fetchData = async () => {
      try {
        setError(null); // Reset errors
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast`,
          {
            params: {
              latitude: lat,
              longitude: lng,
              daily: "uv_index_max,uv_index_clear_sky_max",
              timezone: "auto",
            },
          }
        );
        const uvData = response.data?.daily?.uv_index_max?.[0];

        if (uvData !== undefined) {
          setData(response.data);
          setUvIndex(uvData);
        } else {
          setError("UV index data not available.");
        }
      } catch (error) {
        console.error("Error fetching UV index:", error);
        setError("Failed to load UV index data.");
      }
    };

    fetchData();
  }, [lat, lng]);

  function dataProcessor(index) {
    if (index === null) return "No Data";
    if (index <= 2) return "Low";
    if (index <= 5) return "Moderate";
    if (index <= 7) return "High";
    if (index <= 10) return "Very High";
    return "Extreme";
  }

  function getUVIndexMessage(index) {
    if (index === null) return "Data unavailable.";
    if (index < 3) return "No protection needed.";
    if (index < 6) return "Wear a hat and use sunscreen.";
    if (index < 8) return "Take extra precautions.";
    if (index < 11) return "Wear protective clothing. Avoid sun at peak hours.";
    return "Take all precautions, stay indoors during peak hours.";
  }

  return (
    <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
      {/* TITLE */}
      <div className="flex flex-row gap-1">
        <HiSun className="h-4 w-4" />
        <div className="text-xs font-semibold">UV INDEX</div>
      </div>

      {error ? (
        <div className="mt-3 text-sm text-red-500">{error}</div>
      ) : uvIndex !== null ? (
        <>
          {/* MAIN CONTENT */}
          <div className="mt-3 flex h-full flex-col">
            <div className="text-2xl font-semibold">{Math.round(uvIndex)}</div>
            <div className="-mt-2 text-lg font-semibold">{dataProcessor(uvIndex)}</div>

            {/* RANGE SLIDER */}
            <input
              type="range"
              min="0"
              max="11"
              step="1"
              readOnly
              value={uvIndex}
              className="slider-thumb h-[10px] w-full appearance-none overflow-hidden rounded-md"
              style={{
                background:
                  "linear-gradient(90deg, rgba(126,212,87,1) 0%, rgba(248,212,73,1) 25%, rgba(235,77,96,1) 75%, rgba(180,96,231,1) 100%)",
              }}
            />
          </div>

          <div className="text-xs">{getUVIndexMessage(uvIndex)}</div>
        </>
      ) : (
        <div className="mt-3 text-sm text-gray-500">Loading UV Index...</div>
      )}
    </div>
  );
}

export default UVIndex;
