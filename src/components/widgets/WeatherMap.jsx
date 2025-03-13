import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function WeatherMap() {
  const geolocation = useSelector((state) => state.geolocation?.geolocation);
  const mapRef = useRef(null);
  const API_KEY = import.meta.env.VITE_API_KEY_OPENWEATHERMAP;

  if (!geolocation) {
    return <p>Loading geolocation...</p>;
  }

  const { lat, lng } = geolocation;

  useEffect(() => {
    if (!lat || !lng || !mapRef.current) return;

    let map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom: 6,
      layers: [
        L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        ),
      ],
    });

    // Disable unnecessary interactions
    map.zoomControl.remove();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();

    // Add a marker at the user's location
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup("You are here")
      .openPopup();

    if (API_KEY) {
      const precipitationLayer = L.tileLayer(
        `https://maps.openweathermap.org/maps/2.0/weather/PR0/{z}/{x}/{y}?appid=${API_KEY}`,
        {
          attribution: "Map data © OpenWeatherMap contributors",
        }
      );
      precipitationLayer.addTo(map);
    } else {
      console.error("API Key is missing for OpenWeatherMap!");
    }

    return () => {
      map.remove();
    };
  }, [lat, lng, API_KEY]);

  return (
    <div className="mr-3 flex h-[47rem] w-full flex-col items-stretch gap-4 rounded-3xl dark:bg-black">
      <div className="ml-2 flex flex-row gap-1">
        <div className="text-lg font-semibold">Precipitation Map</div>
      </div>
      <div className="flex-1">
        <div
          ref={mapRef}
          className="z-0 h-full w-full rounded-3xl shadow-lg dark:hue-rotate-180 dark:invert"
        />
      </div>
    </div>
  );
}

export default WeatherMap;
