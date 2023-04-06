import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { PropsWithChildren, ReactElement } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, setupStore } from "../../state/store";

const AppProvider = (props: PropsWithChildren): ReactElement => {
  return (
    <Provider store={setupStore()}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <ThemeProvider theme={createTheme({})}>
          <BrowserRouter>{props.children}</BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppProvider;
