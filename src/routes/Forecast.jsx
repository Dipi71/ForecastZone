import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetForecastDailyQuery } from "../services/WeatherApi";
import WeatherCard from "../components/widgets/WeatherCard";
import HourlyForecast from "../components/widgets/HourlyForecast";
import ForecastCard from "../components/widgets/ForecastCard";

function Forecast() {
  const { lat, lng } = useSelector((state) => state.geolocation);

  useEffect(() => {
    console.log("Redux Geolocation State:", { lat, lng });
  }, [lat, lng]);

  const { data: forecastData, error, isLoading } = useGetForecastDailyQuery(
    { lat, lng },
    { skip: !lat || !lng } 
  );

  return (
    <main className="container mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="p-6 sm:p-0 md:w-1/3">
          <WeatherCard />
          <HourlyForecast />
        </div>
        <div className="mt-4 md:mt-0 md:w-2/3">
          <div className="grid grid-cols-1 justify-items-center gap-4 overflow-hidden px-6 md:max-h-[33rem] md:grid-cols-4 md:hover:overflow-y-auto lg:grid-cols-5 lg:overflow-visible lg:hover:overflow-visible">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading forecast...</p>
            ) : error ? (
              <p className="text-center text-red-500">Error fetching forecast</p>
            ) : forecastData?.list?.length > 0 ? (
              forecastData.list.map((data, index) => (
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

export default Forecast;
