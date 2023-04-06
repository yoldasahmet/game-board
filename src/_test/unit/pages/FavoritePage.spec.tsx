import FavoritePage from "src/pages/favorite/FavoritePage";
import { mockedUseNavigate } from "src/setupTests";
import {
  fireEvent,
  renderWithProviders,
  screen,
  waitFor,
} from "src/_test/_utils/test-utils";
import game from "../../_data/game.json";
import games from "../../_data/games.json";

describe("favorite-page", () => {
  test("render", async () => {
    const { asFragment } = renderWithProviders(<FavoritePage />, {
      preloadedState: { favoriteGames: { list: games.games, count: 9 } },
    });

    await waitFor(() => {
      expect(screen.queryAllByAltText("poster").length).toBe(9);
    });

    const favGame = screen.getByTestId("game-card-TAAifFP590");

    expect(favGame).toBeInTheDocument();

    fireEvent.click(favGame);

    expect(mockedUseNavigate).toHaveBeenCalledWith("/detail", {
      state: { game: game },
    });

    fireEvent.click(screen.getByTestId("favorite-link-TAAifFP590"));

    expect(favGame).not.toBeInTheDocument();

    expect(asFragment()).toMatchSnapshot();
  });
});
