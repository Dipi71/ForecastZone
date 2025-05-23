import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "../features/search/searchSlice";
import geolocationReducer from "../features/geolocation/geolocationSlice"; 
import { weatherApi } from "../services/WeatherApi";
import darkModeSlice from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice.reducer,
    geolocation: geolocationReducer, 
    darkMode: darkModeSlice.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});