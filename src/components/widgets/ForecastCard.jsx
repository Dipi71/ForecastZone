import { useSelector } from "react-redux";
import { useGetForecastDailyQuery } from "../../services/WeatherApi";
import WeatherIcon from "../common/WeatherIcon";

function ForecastCard() {
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetForecastDailyQuery({ lat, lng });

  function convertToDate(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", { weekday: "short" });
  }

  return (
    <>
      {isSuccess && data?.list?.slice(1, 11).map((forecast, i) => (
        <div
          key={i}
          className="flex w-full flex-row items-center justify-between overflow-hidden rounded-3xl px-6 shadow-lg dark:bg-neutral-800 md:h-full md:flex-col md:py-4"
        >
          <div className="font-GilroyBold w-auto text-2xl font-semibold">
            {convertToDate(forecast.dt)}
          </div>

          <div className="w-28">
            <WeatherIcon
              iconType={forecast.weather?.[0]?.icon}
              id={forecast.weather?.[0]?.id}
              size="36"
            />
          </div>

          <div className="w-auto pb-1">
            <div className="flex flex-row gap-1">
              <div className="font-KardustBold text-3xl">
                {Math.round(forecast?.temp?.day) ?? "--"}&deg;
              </div>
              <div className="font-KardustBold text-3xl text-gray-400">
                {Math.round(forecast?.temp?.night) ?? "--"}&deg;
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ForecastCard;
