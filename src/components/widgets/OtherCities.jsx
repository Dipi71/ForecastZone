import { useGetCurrentWeatherQuery } from "../../services/WeatherApi";
import { saveGeoCode } from "../../features/geolocation/geolocationSlice";
import { useDispatch } from "react-redux";
import City from "./City";
import { saveLocation } from "../../features/search/searchSlice";

function OtherCities() {
  const dispatch = useDispatch();

  const cities = [
    {
      city: "New York",
      country: "United States",
      geolocation: { lat: "40.7128", lng: "-74.0060" },
    },
    {
      city: "Mumbai",
      country: "India",
      geolocation: { lat: "19.0760", lng: "72.8777" },
    },
    {
      city: "Tokyo",
      country: "Japan",
      geolocation: { lat: "35.6895", lng: "139.6917" },
    },
    {
      city: "Moscow",
      country: "Russia",
      geolocation: { lat: "55.7558", lng: "37.6173" },
    },
  ];

  const data = cities.map((city) => {
    const { data, isSuccess } = useGetCurrentWeatherQuery({
      lat: city.geolocation.lat,
      lng: city.geolocation.lng,
    });
    return { data, isSuccess };
  });

  const handleClick = (item) => {
    if (!item.isSuccess || !item.data?.coord) return;

    dispatch(
      saveGeoCode({
        lat: item.data.coord.lat,
        lng: item.data.coord.lon,
      })
    );

    dispatch(saveLocation(item.data.name, item.data.sys.country));

    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-semibold">Other large cities</div>
      {data.map((item, i) => (
        <div key={i} onClick={() => handleClick(item)}>
          <City
            city={cities[i].city}
            country={cities[i].country}
            data={item.data}
          />
        </div>
      ))}
    </div>
  );
}

export default OtherCities;
