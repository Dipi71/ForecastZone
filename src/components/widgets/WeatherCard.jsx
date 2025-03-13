import { useSelector } from "react-redux";
import { useGetCurrentWeatherQuery } from "../../services/WeatherApi";
import WeatherIcon from "../common/WeatherIcon";
import { TiLocationArrow } from "react-icons/ti";
import { useMemo } from "react";

function WeatherCard() {
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess, isError } = useGetCurrentWeatherQuery({ lat, lng });

  const convertToDate = useMemo(
    () => (timezone, dt) =>
      new Date(dt * 1000).toLocaleString("en-US", {
        timeZone: "UTC",
        weekday: "long",
      }),
    []
  );

  const getLocalTime = useMemo(
    () => (timezone, dt) =>
      new Date(dt * 1000).toLocaleTimeString("en-US", {
        timeZone: "UTC",
        hour12: true,
        hour: "numeric",
        minute: "numeric",
      }),
    []
  );

  if (isError) return <div className="text-red-500">Failed to load weather data.</div>;

  return (
    <>
      {isSuccess &&
        [data].map((item, i) => (
          <div
            key={i}
            className="mb-4 h-[21rem] overflow-hidden rounded-3xl bg-white p-6 shadow-lg dark:bg-neutral-800"
          >
            {/* DAY AND TIME */}
            <div className="flex flex-row justify-between">
              <div className="text-xl font-semibold">
                {convertToDate(item.timezone, item.dt)}
              </div>
              <div className="font-KardustBold text-xl">
                {getLocalTime(item.timezone, item.dt)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="flex flex-row">
                  <div className="font-semibold">{item.name}</div>
                  <TiLocationArrow />
                </div>
                <div className="font-KardustBold text-8xl">
                  {Math.round(item.main.temp)}&deg;
                </div>
              </div>

              <div className="h-36 w-36 pt-5">
                <WeatherIcon
                  iconType={item.weather[0].icon}
                  id={item.weather[0].id}
                  size={36}
                />
              </div>
            </div>

            {/* PARAMETERS */}
            <div className="mt-8 flex flex-row justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-1">
                  <div>Real Feel</div>
                  <div className="font-KardustBold">
                    {Math.round(item.main.feels_like)}&deg;
                  </div>
                </div>
                <div className="flex flex-row gap-1">
                  <div>Wind</div>
                  <div className="font-KardustBold">
                    {Math.round(item.wind.speed)} m/s
                  </div>
                </div>
                <div className="flex flex-row gap-1">
                  <div>Humidity</div>
                  <div className="font-KardustBold">{item.main.humidity}%</div>
                </div>
              </div>
              <div className="ml-1 self-end">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-row gap-1">
                    <div>Sunrise</div>
                    <div className="font-KardustBold">
                      {getLocalTime(item.timezone, item.sys.sunrise)}
                    </div>
                  </div>
                  <div className="flex flex-row gap-1">
                    <div>Sunset</div>
                    <div className="font-KardustBold">
                      {getLocalTime(item.timezone, item.sys.sunset)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default WeatherCard;
