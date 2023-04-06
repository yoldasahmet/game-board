import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { PreloadedState } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { RootState, persistor, setupStore, AppStore } from "src/state/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const customRender = (
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <ThemeProvider theme={createTheme({})}>
            <BrowserRouter>{children}</BrowserRouter>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  };

  return { store, ...render(ui, { wrapper: AllProviders, ...renderOptions }) };
};

export * from "@testing-library/react";
export { customRender as renderWithProviders };
