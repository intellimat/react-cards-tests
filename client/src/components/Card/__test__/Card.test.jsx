/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import Card from "../Card";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { PetsContext } from "../../Pets/Pets";
import cats from "../../../mocks/cats.json";

const cardProps = {
  name: "Sidney",
  phone: "111-111-1111",
  email: "laith@hotmail.com",
  image: {
    url: "http://localhost:3000/cat1.jpg",
    alt: "cute cat",
  },
  favourite: false,
  index: 0,
};

const renderCardComponentWithProvider = (props) =>
  render(
    <PetsContext.Provider value={{ cats, setCats: jest.fn() }}>
      <Card {...props} />
    </PetsContext.Provider>
  );

describe("Card", () => {
  test("should show name of cat", () => {
    renderCardComponentWithProvider(cardProps);
    expect(
      screen.getByRole("heading", {
        name: /sidney/i,
      })
    ).toBeInTheDocument();
  });

  test("should show phone number", () => {
    renderCardComponentWithProvider(cardProps);

    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  test("should show email", () => {
    renderCardComponentWithProvider(cardProps);

    expect(screen.getByText("laith@hotmail.com")).toBeInTheDocument();
  });

  test("should show image", () => {
    renderCardComponentWithProvider(cardProps);
    // screen.getByAltText("")

    expect(
      screen.getByRole("img", {
        name: /cute cat/i,
      })
    ).toBeInTheDocument();
  });

  test("should show image with correct src", () => {
    renderCardComponentWithProvider(cardProps);
    expect(
      screen.getByRole("img", {
        name: /cute cat/i,
      }).src
    ).toBe(cardProps.image.url);
  });

  test("should show outlined heart", () => {
    renderCardComponentWithProvider(cardProps);
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test("should show filled heart", () => {
    renderCardComponentWithProvider({ ...cardProps, favourite: true });
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    renderCardComponentWithProvider(cardProps);

    act(() => {
      userEvent.click(screen.getByRole("button"));
    });

    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();

    act(() => {
      userEvent.click(screen.getByRole("button"));
    });

    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
});
