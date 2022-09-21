import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import { Product } from "../components/ProductPage";
import ProductPage from "../components/ProductPage";
import getHalfSleeveCutTShirt from "../components/products/halfSleeveTShirts/productsData";

const setupRoute = () => {
  render(
    <MemoryRouter
      initialEntries={[
        "/half-sleeve-cut-and-sew-solid/product/half-sleeve-cut-and-sew-solid-pattern-15",
      ]}
    >
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
            </div>
          }
        >
          <Route
            path="/half-sleeve-cut-and-sew-solid/product"
            element={<Product />}
          >
            <Route
              path=":name"
              element={<ProductPage getProductData={getHalfSleeveCutTShirt} />}
            />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );
};
window.scrollTo = jest.fn();

test("searching is possible with search bar", async () => {
  setupRoute();
  const searchBar = screen.getByRole("searchbox");
  const user = userEvent.setup();
  await user.type(searchBar, "cut"); // search for cut and sew solid t-shirts
  const searchResults = screen.getAllByTestId("search-result");
  expect(searchResults.length).toBe(7); // there are 7 cut and sew solid t-shirts
});

