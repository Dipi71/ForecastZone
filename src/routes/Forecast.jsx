import WeatherCard from "../components/widgets/WeatherCard";
import HourlyForecast from "../components/widgets/HourlyForecast";
import ForecastCard from "../components/widgets/ForecastCard";
import { useSelector } from "react-redux";

function SevenDay() {
  const forecastData = useSelector((state) => state.weather?.forecast || []);

  return (
    <main className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 sm:p-0 md:w-1/3">
          <WeatherCard />
          <HourlyForecast />
        </div>
        <div className="mt-4 md:mt-0 md:w-2/3">
          <div className="grid grid-cols-1 justify-items-center gap-4 overflow-hidden px-6 md:max-h-[33rem] md:grid-cols-4 md:hover:overflow-y-auto lg:grid-cols-5 lg:overflow-visible lg:hover:overflow-visible">
            {forecastData.length > 0 ? (
              forecastData.map((data, index) => (
                <ForecastCard key={index} data={data} />
              ))
            ) : (
              <p className="text-center text-gray-500">No forecast data available</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default SevenDay;
