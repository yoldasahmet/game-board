import HomePage from "src/pages/home/HomePage";
import { mockedUseNavigate } from "src/setupTests";
import { mockedGameApi } from "src/_test/_setup/api-setup";
import {
  cleanup,
  renderWithProviders,
  screen,
  waitFor,
  fireEvent,
} from "src/_test/_utils/test-utils";
import game from "../../_data/game.json";

describe("home-page", () => {
  beforeAll((): void => {
    mockedGameApi.listen();
  });

  afterAll((): void => {
    mockedGameApi.close();
  });

  afterEach((): void => {
    cleanup();
    mockedGameApi.resetHandlers();
  });

  test("render", async () => {
    const { asFragment } = renderWithProviders(<HomePage />);

    await waitFor(() => {
      expect(screen.queryAllByAltText("poster").length).toBe(9);
    });

    fireEvent.click(screen.getByTestId("game-card-TAAifFP590"));

    expect(mockedUseNavigate).toHaveBeenCalledWith("/detail", {
      state: { game: game },
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
