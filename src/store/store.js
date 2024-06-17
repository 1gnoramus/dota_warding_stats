import { configureStore } from "@reduxjs/toolkit";
import { matchesApi} from "./api";
import { playerStatsSlice } from "./reducers";

export const store = configureStore({
  reducer: {
    [matchesApi.reducerPath]: matchesApi.reducer,
    playerStats: playerStatsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(matchesApi.middleware),
});
