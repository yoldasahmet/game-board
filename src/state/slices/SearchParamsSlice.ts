import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchParamsState } from "src/models/SearchModel";

const initialState: SearchParamsState = {
  players: 0,
  playtime: 0,
  page: 0,
};

const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState,
  reducers: {
    updateParams: (state, action: PayloadAction<SearchParamsState>) => {
      return { ...state, ...action.payload };
    },
    resetParams: () => {
      return initialState;
    },
  },
});

export const { updateParams, resetParams } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;
