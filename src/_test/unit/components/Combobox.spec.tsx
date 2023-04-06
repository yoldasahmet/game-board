import Combobox from "src/components/combobox/ComboBox";
import {
  cleanup,
  fireEvent,
  renderWithProviders,
  screen,
  within,
} from "src/_test/_utils/test-utils";

describe("combobox-component", () => {
  afterEach(cleanup);

  test("render", async () => {
    const spyOnSelectChange = jest.fn();

    const { asFragment } = renderWithProviders(
      <Combobox
        id="players-select"
        title="Players"
        value={"1"}
        list={[
          { key: "1", value: "1" },
          { key: "2", value: "2" },
        ]}
        onChange={(e) => {
          spyOnSelectChange(e.target.value);
        }}
      />
    );

    const selectElement = screen.getByTestId("players-select");

    const selectButton = within(selectElement).getByRole("button");
    fireEvent.mouseDown(selectButton);

    const selectList = within(screen.getByRole("presentation")).getByRole(
      "listbox"
    );

    const options = within(selectList).getAllByRole("option");
    const optionValues = options.map((li) => li.getAttribute("data-value"));
    expect(optionValues).toEqual(["1", "2"]);

    fireEvent.click(options[1]);
    expect(spyOnSelectChange).toHaveBeenCalledWith("2");

    expect(asFragment()).toMatchSnapshot();
  });
});
