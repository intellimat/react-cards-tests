/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pets from "../Pets";
import mockCats from "../../../mocks/cats.json";
import { fetchCats } from "../../../services/cats.service";
// import { rest } from "msw";
// import { setupServer } from "msw/node";

// const server = setupServer(
//   rest.get("http://localhost:4000/cats", (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json(mockCats));
//   })
// );

// 1) Alternative for mocking API calls
// jest.mock("../../../services/cats.service.js", () => ({
//   fetchCats: () => Promise.resolve(mockCats),
// }));

// 2) Alternative for mocking API calls
// jest.mock("../../../services/cats.service.js", () => ({
//   fetchCats: () => Promise.resolve(mockCats),
// }));

// 3) Alternative for mocking API calls
jest.mock("../../../services/cats.service.js");

describe("Pets", () => {
  // beforeAll(() => server.listen());
  // afterEach(() => server.resetHandlers());
  // afterAll(() => server.close());

  beforeEach(() => {
    jest.clearAllMocks();
    fetchCats.mockResolvedValue(mockCats);
  });

  test("should render the correct amount of cards", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(mockCats.length);
  });

  test("should filter for male cats", async () => {
    // const expectedNumOfCards = mockCats.filter((cat) => cat.gender === "male");
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    act(() => {
      userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");
    });
    expect(screen.getAllByRole("article")).toStrictEqual([cards[1], cards[3]]);
  });

  test("should filter for female cats", async () => {
    // const expectedNumOfCards = mockCats.filter((cat) => cat.gender === "male");
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    act(() => {
      userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");
    });
    expect(screen.getAllByRole("article")).toStrictEqual([
      cards[0],
      cards[2],
      cards[4],
    ]);
  });

  test("should filter for favourite cats", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    await act(async () => {
      userEvent.click(within(cards[0]).getByRole("button"));
      userEvent.click(within(cards[3]).getByRole("button"));
      userEvent.selectOptions(screen.getByLabelText(/favourite/i), "favourite");
    });

    expect(screen.getAllByRole("article")).toStrictEqual([cards[0], cards[3]]);
  });
  test("should filter for not favourite cats", async () => {
    render(<Pets />);
    const cards = await screen.findAllByRole("article");
    await act(async () => {
      const cards = await screen.findAllByRole("article");
      userEvent.click(within(cards[0]).getByRole("button"));
      userEvent.click(within(cards[1]).getByRole("button"));
      userEvent.selectOptions(
        screen.getByLabelText(/favourite/i),
        "not favourite"
      );
    });
    const updatedCards = await screen.findAllByRole("article");

    expect(updatedCards).toStrictEqual([cards[2], cards[3], cards[4]]);
  });
});
