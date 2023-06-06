import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "../components/ProductPage";
import getHalfSleeveCutTShirt from "../components/products/halfSleeveTShirts/productsData";
import { getSpecificPoloTShirtData } from "../components/products/poloTShirts/productsData";
import { Provider } from "react-redux";
import store from "../app/store";

const setupRoute = () => {
  render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[
          "/half-sleeve-cut-and-sew-solid/product/half-sleeve-cut-and-sew-solid-pattern-15",
        ]}
      >
        <Header />
        <Routes>
          <Route
            path="/half-sleeve-cut-and-sew-solid/product/:name"
            element={<ProductPage getProductData={getHalfSleeveCutTShirt} />}
          />
          <Route
            path="/polo-t-shirt/product/:name"
            element={<ProductPage getProductData={getSpecificPoloTShirtData} />}
          />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};
window.scrollTo = jest.fn();

test("searching is possible with search bar", async () => {
  setupRoute();
  const searchBar = screen.getByRole("searchbox");
  const user = userEvent.setup();
  await act(async () => {
    await user.type(searchBar, "cut"); // search for cut and sew solid t-shirts
  });

  const searchResults = screen.getAllByTestId("search-result");
  expect(searchResults.length).toBe(7); // there are 7 cut and sew solid t-shirts
});

test("clicking a search result takes you to the product page", async () => {
  setupRoute();
  const searchBar = screen.getByRole("searchbox");
  const user = userEvent.setup();
  await act(async () => {
    await user.type(searchBar, "cut"); // search for cut and sew solid t-shirts
  });

  const searchResult = screen.getAllByTestId("search-result");
  await act(async () => {
    await user.click(searchResult[0]);
  });

  const productName = screen.getByRole("heading", {
    name: "Cut and Sew Logo Style 7",
  });
  expect(productName).toBeInTheDocument();

  const addToCartButton = screen.getByRole("button", {
    name: "Add to Cart",
  });
  expect(addToCartButton).toBeInTheDocument();
});

test("clicking a search result removes all search results from the page", async () => {
  setupRoute();
  const searchBar = screen.getByRole("searchbox");
  const user = userEvent.setup();
  await act(async () => {
    await user.type(searchBar, "cut"); // search for cut and sew solid t-shirts
  });

  const searchResult = screen.getAllByTestId("search-result");
  await act(async () => {
    await user.click(searchResult[0]);
  });

  const searchResults = screen.queryAllByTestId("search-result");
  expect(searchResults.length).toBe(0);
});

describe("small screen", () => {
  beforeEach(() => {
    window.innerWidth = 375;
    window.innerHeight = 667;
    window.dispatchEvent(new Event("resize"));
    setupRoute();
  });

  test("clicking search icon takes user to search page", async () => {
    const user = userEvent.setup();
    const searchIcon = screen.getByAltText("searchIcon");
    await act(async () => {
      await user.click(searchIcon);
    });

    const searchContainer = screen.getByTestId("searchContainer");

    expect(searchContainer).toHaveClass("fixed left-0 bottom-0 w-full h-full");
  });

  test("clicking a search result removes search page", async () => {
    const user = userEvent.setup();

    const searchIcon = screen.getByAltText("searchIcon");
    await act(async () => {
      await user.click(searchIcon);
    });

    const searchBar = screen.getByRole("searchbox");
    await act(async () => {
      await user.type(searchBar, "cut"); // search for cut and sew solid t-shirts
    });

    const searchResult = screen.getAllByTestId("search-result");
    await act(async () => {
      await user.click(searchResult[0]);
    });

    const searchContainer = screen.getByTestId("searchContainer");
    expect(searchContainer).toHaveClass("search-bar ml-[10px]");
  });
});
