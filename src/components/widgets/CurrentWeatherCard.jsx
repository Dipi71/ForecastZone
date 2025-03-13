import { useSelector } from "react-redux";
import { useGetCurrentWeatherQuery } from "../../services/WeatherApi";
import WeatherIcon from "../common/WeatherIcon";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function formatTime(timezone, dt, format = "full") {
  let local_time = new Date(dt * 1000 + timezone * 1000);
  if (format === "day") {
    return local_time.toLocaleString("en-us", { timeZone: "UTC", weekday: "long" });
  }
  return local_time.toLocaleTimeString("en-US", { timeZone: "UTC", hour12: true, hour: "numeric", minute: "numeric" });
}

function CurrentWeatherCard() {
  const { lat, lng } = useSelector((state) => state.geolocation.geolocation);
  const { data, isSuccess } = useGetCurrentWeatherQuery({ lat, lng });

  if (!isSuccess) return null;

  return (
    <div className="flex h-[21rem] w-[24rem] flex-col overflow-hidden rounded-3xl shadow-lg dark:bg-neutral-800">
      {/* HEADER */}
      <div className="flex justify-between bg-neutral-50 p-6 dark:bg-neutral-900">
        <div className="text-xl font-semibold">{formatTime(data.timezone, data.dt, "day")}</div>
        <div className="text-xl font-bold">{formatTime(data.timezone, data.dt)}</div>
      </div>

      <div className="px-4 pb-6">
        <div className="flex items-center justify-between">
          <div className="text-6xl font-bold">{Math.round(data.main.temp)}&deg;</div>
          <WeatherIcon iconType={data.weather[0].icon} id={data.weather[0].id} size={36} />
        </div>

        {/* MAP */}
        <MapContainer center={[lat, lng]} zoom={10} style={{ height: "200px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[lat, lng]}>
            <Popup>Current Location</Popup>
          </Marker>
        </MapContainer>

        {/* WEATHER DETAILS */}
        <div className="mt-4 flex justify-between">
          <div>
            <div className="flex gap-1">
              <span>Real Feel</span>
              <span className="font-bold">{Math.round(data.main.feels_like)}&deg;</span>
            </div>
            <div className="flex gap-1">
              <span>Wind</span>
              <span className="font-bold">{Math.round(data.wind.speed)} m/s</span>
            </div>
            <div className="flex gap-1">
              <span>Humidity</span>
              <span className="font-bold">{data.main.humidity}%</span>
            </div>
          </div>

          <div className="self-end">
            <div className="flex gap-1">
              <span>Sunrise</span>
              <span className="font-bold">{formatTime(data.timezone, data.sys.sunrise)}</span>
            </div>
            <div className="flex gap-1">
              <span>Sunset</span>
              <span className="font-bold">{formatTime(data.timezone, data.sys.sunset)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeatherCard;
