import { rest } from "msw";
import gameData from "../_data/games.json";
import { setupServer } from "msw/node";

const mockedGameApi = setupServer(
  rest.get("https://api.boardgameatlas.com/api/search", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(gameData));
  })
);

export { mockedGameApi };
