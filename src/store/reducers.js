import { createSlice } from "@reduxjs/toolkit";

export const playerStatsSlice = createSlice({
  name: "proPlayerStats",
  initialState: {
    playerStats: {},
  },
  reducers: {
    addPlayer: (state, action) => {
      state.playerStats = action.payload;
    },
  },
});

export const { addPlayer } = playerStatsSlice.actions;
