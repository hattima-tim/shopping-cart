import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Header from "../components/header";
import { Product } from "../components/ProductPage";
import ProductPage from "../components/ProductPage";
import getHalfSleeveCutTShirt from "../components/products/halfSleeveTShirts/productsData";

const setupRoute = () => {
  const { container } = render(
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
  return container;
};

window.scrollTo = jest.fn();

describe("header", () => {
  beforeEach(async () => {
    const user = userEvent.setup();

    setupRoute();

    // we are on product page now
    const fabricBtn = screen.getByRole("button", { name: "COMBED COTTON" });
    await user.click(fabricBtn);

    const sizeBtn = screen.getByRole("button", { name: "M" });
    await user.click(sizeBtn);

    const addToCartBtn = screen.getByRole("button", { name: "Add to Cart" });
    await user.click(addToCartBtn);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test("header and product page", () => {
    const container = setupRoute();
    expect(container).toMatchSnapshot(); // the snapshot contains both
    // Header and ProductPage
  });

  test("remove button removes product from cart", async () => {
    const productRemoveBtn = screen.getByTestId("remove-item-btn");

    const productName = screen.getByRole(
      "heading",
      { level: 3 },
      { name: "Half Sleeve Cut and Sew Solid(pattern 15)" }
    );
    const user = userEvent.setup();
    await user.click(productRemoveBtn);

    expect(productRemoveBtn).not.toBeInTheDocument();
    expect(productName).not.toBeInTheDocument();
  });

  test("alert is called on checkout button click", async () => {
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const checkoutBtn = screen.getByRole("button", { name: "CHECKOUT" });

    await user.click(checkoutBtn);

    expect(alertMock).toBeCalledTimes(1);
  });
});
