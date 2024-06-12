import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const matchesApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.opendota.com/api",
  }),
  endpoints: (builder) => ({
    getproPlayers: builder.query({
      query: () => "/proPlayers",
    }),
    getmatchById: builder.query({
      query: (account_id) => `/players/${account_id}/matches`,
    }),
    getRecentmatchById: builder.query({
      query: (account_id) => `/players/${account_id}/recentMatches`,
    }),
    getMatchesByPeriod: builder.query({
      query: (account_id, period) =>
        `/players/${account_id}/matches?&date=${period}`,
    }),
  }),
});
export const {
  useGetproPlayersQuery,
  useGetmatchByIdQuery,
  useGetRecentmatchByIdQuery,
  useGetMatchesByPeriodQuery
} = matchesApi;
