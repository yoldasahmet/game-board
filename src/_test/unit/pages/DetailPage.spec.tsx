import DetailPage from "src/pages/detail/DetailPage";
import {
  renderWithProviders,
  screen,
  waitFor,
} from "src/_test/_utils/test-utils";

describe("detail-page", () => {
  test("render", async () => {
    const { asFragment } = renderWithProviders(<DetailPage />);

    await waitFor(() => {
      const gameLabel =
        screen.getByTestId<HTMLHeadingElement>("game-title-label");

      expect(gameLabel.textContent).toBe("Root");
    });

    expect(asFragment()).toMatchSnapshot();
  });
});
