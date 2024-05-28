import { createSlice } from "@reduxjs/toolkit";

export const playerStatsSlice = createSlice({
  name: "proPlayerStats",
  initialState: {
    playerStats: {
      name: "не знаю",
      matchesPlayed: 0,
      team: "не знаю",
      position: 0,
      img_url: "нет картинки епт",
    },
  },
  reducers: {
    addPlayer: (state, action) => {
      state.playerStats = action.payload;
    },
  },
});

export const { addPlayer } = playerStatsSlice.actions;
