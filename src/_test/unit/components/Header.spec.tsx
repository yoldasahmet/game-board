import Header from "src/components/header/Header";
import { mockedUseNavigate } from "src/setupTests";
import {
  fireEvent,
  renderWithProviders,
  screen,
} from "src/_test/_utils/test-utils";

describe("header-component", () => {
  test("render", async () => {
    const { asFragment } = renderWithProviders(<Header />);

    fireEvent.click(screen.getByTestId("favorite-icon-button"));
    expect(mockedUseNavigate).toHaveBeenCalledWith("/favorite");

    fireEvent.click(screen.getByTestId("logo-button"));
    expect(mockedUseNavigate).toHaveBeenCalledWith("/");

    expect(asFragment()).toMatchSnapshot();
  });
});
