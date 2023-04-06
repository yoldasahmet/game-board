import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Game } from "src/models/GameModel";
import { SearchParamsState } from "src/models/SearchModel";

const apiKey = "dFduqveC0B";

export const apiUrl = "https://api.boardgameatlas.com/api";

const GameService = createApi({
  reducerPath: "gameApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  endpoints: (builder) => ({
    getGames: builder.query<
      { games: Game[]; count: number },
      SearchParamsState
    >({
      query: ({ players, playtime, page = 0 }) =>
        `/search?pretty=true&client_id=${apiKey}${
          players ? "&gt_min_players=" + (players - 1) : ""
        }${
          playtime ? "&lt_max_playtime=" + (playtime + 1) : ""
        }&limit=28&skip=${page * 28}`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.games.push(...newItems.games);
      },
      forceRefetch({ currentArg, previousArg }) {
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg);
      },
    }),
  }),
});

export default GameService;

export const { useGetGamesQuery } = GameService;
