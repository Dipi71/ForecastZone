import { useSelector } from "react-redux";
import { WiThermometer } from "react-icons/wi";
import { useGetCurrentWeatherQuery } from "../../services/WeatherApi";

function FeelsLike() {
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentWeatherQuery({ lat, lng });

  function dataProcessor(temp, feels_like) {
    if (temp > feels_like) return "Wind is making it feel colder.";
    if (temp < feels_like) return "Feels warmer due to conditions.";
    return "Similar to the actual temperature.";
  }

  return (
    isSuccess && (
      <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
        {/* TITLE */}
        <div className="flex gap-1">
          <WiThermometer className="h-5 w-5" />
          <div className="text-xs font-semibold">FEELS LIKE</div>
        </div>
        <div className="mt-2 text-2xl font-semibold">{Math.round(data.main.feels_like)}&deg;</div>
        <div className="text-xs">{dataProcessor(Math.round(data.main.temp), Math.round(data.main.feels_like))}</div>
      </div>
    )
  );
}

export default FeelsLike;
