import WeatherCard from "../components/widgets/WeatherCard";
import HourlyForecast from "../components/widgets/HourlyForecast";
import AirPollution from "../components/widgets/AirPollution";
import SunsetSunrise from "../components/widgets/SunsetSunrise";
import Wind from "../components/widgets/Wind";
import UVIndex from "../components/widgets/UVIndex";
import Precipitation from "../components/widgets/Precipitation";
import FeelsLike from "../components/widgets/FeelsLike";
import Humidity from "../components/widgets/Humidity";
import Visibility from "../components/widgets/Visibility";
import Pressure from "../components/widgets/Pressure";
import ChanceOfRain from "../components/widgets/ChanceOfRain";

function Home() {
  return (
    <main className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left Panel */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <WeatherCard />
          <HourlyForecast />
        </div>
        
        {/* Right Panel */}
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 px-4">
            
            {/* Full-width items */}
            <div className="col-span-2 w-full">
              <AirPollution />
            </div>
            
            {/* Individual Weather Widgets */}
            <SunsetSunrise />
            <Wind />
            <UVIndex />
            <Precipitation />
            <FeelsLike />
            <Humidity />
            <Visibility />
            <Pressure />
            
            {/* Full-width Chance of Rain */}
            <div className="col-span-2 w-full">
              <ChanceOfRain />
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}

export default Home;
