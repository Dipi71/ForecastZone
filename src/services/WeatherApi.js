import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKey = import.meta.env.VITE_API_KEY_OPENWEATHERMAP;

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org",
  }),
  endpoints: (builder) => ({
    getCurrentWeather: builder.query({
      query: ({ lat, lng }) =>
        `data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${APIKey}`,
    }),
    getForecastDaily: builder.query({
      query: ({ lat, lng }) =>
        `data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${APIKey}`,
      transformResponse: (response) => {
        if (!response || !response.list) {
          console.error("Invalid forecast response:", response);
          return [];
        }

        const dailyForecast = {};
        response.list.forEach((forecast) => {
          const date = forecast.dt_txt.split(" ")[0]; // Extract date
          if (!dailyForecast[date] || forecast.dt_txt.includes("12:00:00")) {
            dailyForecast[date] = forecast;
          }
        });

        return Object.values(dailyForecast).slice(0, 5); // Return only 5 days
      },
    }),
    getCurrentAirPollution: builder.query({
      query: ({ lat, lng }) =>
        `data/2.5/air_pollution?lat=${lat}&lon=${lng}&appid=${APIKey}`,
    }),
    getHourlyForecast: builder.query({
      query: ({ lat, lng }) =>
        `data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${APIKey}`,
    }),
    getWeatherMap: builder.query({
      query: ({ lat, lng }) =>
        `data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIKey}`,
    }),
  }),
});

export const {
  useGetCurrentWeatherQuery,
  useGetForecastDailyQuery,
  useGetCurrentAirPollutionQuery,
  useGetHourlyForecastQuery,
  useGetWeatherMapQuery,
} = weatherApi;
