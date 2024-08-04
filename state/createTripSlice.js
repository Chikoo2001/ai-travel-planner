import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tripData: {},
};

export const createTripSlice = createSlice({
  name: "createTrip",
  initialState,
  reducers: {
    updateTripData: (state, action) => {
      state.tripData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateTripData } = createTripSlice.actions;

export default createTripSlice.reducer;
