import { configureStore } from "@reduxjs/toolkit";
import createTripReducer from "./createTripSlice";

export const store = configureStore({
  reducer: {
    createTrip: createTripReducer,
  },
});
