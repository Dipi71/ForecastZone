import { useSelector } from "react-redux";
import { IoWaterSharp } from "react-icons/io5";
import { useGetCurrentWeatherQuery } from "../../services/WeatherApi";

function Precipitation() {
  // Access to RTK Query cached data
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentWeatherQuery({ lat, lng });

  // Get precipitation data safely
  const precipitation = data?.rain?.["3h"] || data?.snow?.["3h"] || 0;

  return (
    <>
      {isSuccess && (
        <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
          {/* TITLE */}
          <div className="flex flex-row gap-1">
            <IoWaterSharp className="h-4 w-4" />
            <div className="text-xs font-semibold">PRECIPITATION</div>
          </div>
          {/* CONTENT */}
          <div className="mt-3 h-full">
            <div className="text-2xl font-semibold">{precipitation} mm</div>
            <div className="font-semibold">in the last 3 hours</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Precipitation;
