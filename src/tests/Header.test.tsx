import { act, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Header from "../components/header";
import ProductPage from "../components/ProductPage";
import getHalfSleeveCutTShirt from "../productsData/halfSleeveTShirts/productsData";
import { Provider } from "react-redux";
import store from "../app/store";

const setupRoute = () => {
  const { container } = render(
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
        </Routes>
      </MemoryRouter>
    </Provider>
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
    await act(async () => {
      await user.click(fabricBtn);
    });

    const sizeBtn = screen.getByRole("button", { name: "M" });
    await act(async () => {
      await user.click(sizeBtn);
    });

    const addToCartBtn = screen.getByRole("button", { name: "Add to Cart" });
    await act(async () => {
      await user.click(addToCartBtn);
    });
  });

  afterEach(async() => {
    jest.clearAllMocks();
    localStorage.clear();
    const user = userEvent.setup();
    const removeProductBtns = screen.queryAllByTestId("remove-item-btn");
    for (let i = 0; i < removeProductBtns.length; i++) {
      await act(async () => {
        await user.click(removeProductBtns[i]);
      });
    }
    // this operation is necessary to remove product from local storage
  });

  test("header and product page", () => {
    const container = setupRoute();
    expect(container).toMatchSnapshot(); // the snapshot contains both
    // Header and ProductPage
  });

  test("remove button removes product from cart", async () => {
    const productRemoveBtn = screen.getByTestId("remove-item-btn");

    const productName = screen.getByRole("heading", {
      level: 3,
      name: "Half Sleeve Cut and Sew Solid(pattern 15)",
    });
    const user = userEvent.setup();
    await act(async () => {
      await user.click(productRemoveBtn);
    });

    expect(productRemoveBtn).not.toBeInTheDocument();
    expect(productName).not.toBeInTheDocument();
  });

  test("alert is called on checkout button click", async () => {
    const user = userEvent.setup();
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
    const checkoutBtn = screen.getByRole("button", { name: "CHECKOUT" });
    await act(async () => {
      await user.click(checkoutBtn);
    });

    expect(alertMock).toBeCalledTimes(1);
  });
});
