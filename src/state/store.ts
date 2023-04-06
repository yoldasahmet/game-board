import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import GameService from "src/services/GameService";
import favoriteGameReducer from "./slices/FavoriteGamesSlice";
import searchParamsReducer from "./slices/SearchParamsSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favoriteGames"],
};

const reducers = {
  [GameService.reducerPath]: GameService.reducer,
  favoriteGames: favoriteGameReducer,
  searchParams: searchParamsReducer,
};

const combinedReducer = combineReducers<typeof reducers>(reducers);

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: persistedReducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([GameService.middleware]),
  });

export const persistor = persistStore(setupStore());

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof combinedReducer>;
export const useTypedDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
