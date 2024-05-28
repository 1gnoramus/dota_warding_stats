import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./api";
import { playerStatsSlice } from "./reducers";

export const store = configureStore({
  reducer: {
    // [productsApi.reducerPath]: productsApi.reducer,
    playerStats: playerStatsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
