import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game } from "src/models/GameModel";

interface GameState {
  list: Game[];
  count: number;
}

const initialState: GameState = {
  list: [],
  count: 0,
};

const favoriteGamesSlice = createSlice({
  name: "favoriteGames",
  initialState,
  reducers: {
    addFavoriteGame: (state, action: PayloadAction<Game>) => {
      state.list.unshift(action.payload);
      state.count = state.count + 1;
    },
    removeFavoriteGame: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
      state.count = state.count - 1;
    },
  },
});

export const { addFavoriteGame, removeFavoriteGame } =
  favoriteGamesSlice.actions;

export default favoriteGamesSlice.reducer;
