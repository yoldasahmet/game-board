import { Routes, Route, Outlet } from "react-router-dom";
import React, { ReactElement } from "react";
import HomePage from "src/pages/home/HomePage";
import DetailPage from "src/pages/detail/DetailPage";
import FavoritePage from "src/pages/favorite/FavoritePage";

const AppRouter = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
