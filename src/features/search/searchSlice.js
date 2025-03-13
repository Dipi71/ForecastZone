import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
  location: "Mumbai, India",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    saveLocation: (state, action) => {
      state.location = action.payload;
    },
  },
});

export const { updateSearchValue, saveLocation } = searchSlice.actions;
export default searchSlice;
