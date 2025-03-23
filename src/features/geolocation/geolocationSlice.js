import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  geolocation: { lat: 19.0760, lng: 72.8777 }, // Set Mumbai as default location
};

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    saveGeoCode: (state, action) => {
      state.geolocation = action.payload;
    },
  },
});

export const { saveGeoCode } = geolocationSlice.actions;
export default geolocationSlice.reducer;

