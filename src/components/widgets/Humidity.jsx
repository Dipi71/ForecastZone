import { useSelector } from "react-redux";
import { WiHumidity } from "react-icons/wi";
import { useGetCurrentWeatherQuery } from "../../services/WeatherApi";

function Humidity() {
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentWeatherQuery({ lat, lng });

  function getHumidityMessage(humidity) {
    if (humidity < 30) return "The air is dry.";
    if (humidity < 60) return "The humidity is at a comfortable level.";
    return "It's very humid. It might feel uncomfortable.";
  }

  const humidity = data?.main?.humidity ?? "--";

  return (
    <>
      {isSuccess && data?.main && (
        <div className="flex h-40 w-full flex-col items-stretch overflow-hidden rounded-3xl bg-white p-4 shadow-lg dark:bg-neutral-800">
          <div className="flex flex-row gap-1">
            <WiHumidity className="h-5 w-5" />
            <div className="text-xs font-semibold">HUMIDITY</div>
          </div>
          <div className="mt-2 h-full">
            <div className="text-2xl font-semibold">{humidity}%</div>
          </div>
          <div className="text-xs">{getHumidityMessage(humidity)}</div>
        </div>
      )}
    </>
  );
}

export default Humidity;
