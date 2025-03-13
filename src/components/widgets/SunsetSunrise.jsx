import { BsSunriseFill, BsSunsetFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useGetCurrentWeatherQuery } from "../../services/WeatherApi";

const SunsetSunrise = () => {
  // Access to RTK Query cached data
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentWeatherQuery({ lat, lng });

  function getLocalTime(timezone, dt, is12HourFormat) {
    if (!dt) return "N/A"; // Prevent errors if dt is undefined
    const utcTime = new Date(dt * 1000);
    const localTime = new Date(utcTime.getTime() + timezone * 1000);
    return localTime.toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: is12HourFormat,
      hour: "numeric",
      minute: "numeric",
    });
  }

  function getDayOrNight(data) {
    if (!data?.sys || !data?.dt) return "NIGHT"; // Fallback
    const sunrise = new Date(data.sys.sunrise * 1000);
    const sunset = new Date(data.sys.sunset * 1000);
    const currentTime = new Date(data.dt * 1000);
    return currentTime >= sunrise && currentTime < sunset ? "DAY" : "NIGHT";
  }

  const dayOrNight = isSuccess ? getDayOrNight(data) : "NIGHT";

  return (
    <>
      {isSuccess && (
        <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
          {/* TITLE */}
          <div className="flex flex-row gap-1">
            {dayOrNight === "DAY" ? <BsSunsetFill /> : <BsSunriseFill />}
            <div className="text-xs font-semibold">
              {dayOrNight === "DAY" ? "Sunset" : "Sunrise"}
            </div>
          </div>
          {/* CONTENT */}
          <div className="mt-2 h-full">
            <div className="text-2xl font-semibold">
              {dayOrNight === "DAY"
                ? getLocalTime(data.timezone, data.sys.sunset, true)
                : getLocalTime(data.timezone, data.sys.sunrise, true)}
            </div>
          </div>
          <div className="text-xs">
            {dayOrNight === "DAY" ? (
              <>Sunrise {getLocalTime(data.timezone, data.sys.sunrise, true)}</>
            ) : (
              <>Sunset {getLocalTime(data.timezone, data.sys.sunset, true)}</>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SunsetSunrise;
