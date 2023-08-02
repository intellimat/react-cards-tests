import { render, screen } from "@testing-library/react";
import Filter from "../Filter";
import userEvent from "@testing-library/user-event";

describe("Filter", () => {
  test("should be able to change value of favourite select", () => {
    render(<Filter setFilters={jest.fn()} />);

    const favouriteSelect = screen.getByLabelText("Favourite");

    expect(favouriteSelect.value).toBe("any");

    userEvent.selectOptions(favouriteSelect, "favourite");
    expect(favouriteSelect.value).toBe("favourite");

    userEvent.selectOptions(favouriteSelect, "not favourite");
    expect(favouriteSelect.value).toBe("not favourite");
  });

  test("should be able to change value of gender select", () => {
    render(<Filter setFilters={jest.fn()} />);

    const genderSelect = screen.getByLabelText("Gender");

    expect(genderSelect.value).toBe("any");

    userEvent.selectOptions(genderSelect, "male");
    expect(genderSelect.value).toBe("male");

    userEvent.selectOptions(genderSelect, "female");
    expect(genderSelect.value).toBe("female");
  });
});
