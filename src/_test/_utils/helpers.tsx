import { fireEvent, screen, within } from "./test-utils";

const getSelectOptions = async (id: string) => {
  const selectElement = screen.getByTestId(id);

  const selectButton = within(selectElement).getByRole("button");
  fireEvent.mouseDown(selectButton);

  const selectList = within(screen.getByRole("presentation")).getByRole(
    "listbox"
  );

  const options = await within(selectList).findAllByRole("option");

  return options;
};

export { getSelectOptions };
