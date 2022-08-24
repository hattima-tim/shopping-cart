import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import { Product } from "../components/products/productPage";
import ProductPage from "../components/products/productPage";
import Cart from "../components/cart";

const setupRoute = () => {
  render(
    <MemoryRouter
      initialEntries={["/product/half-sleeve-cut-and-sew-solid-pattern-15"]}
    >
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="product" element={<Product />}>
            <Route path=":name" element={<ProductPage />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

describe("product table", () => {
  test("table header is in the document", async () => {
    const user = userEvent.setup();

    setupRoute();

    // we are on product page now
    const fabricBtn = screen.getByRole("button", { name: "COMBED COTTON" });
    await user.click(fabricBtn);

    const sizeBtn = screen.getByRole("button", { name: "M" });
    await user.click(sizeBtn);

    const quantityBtn = screen.getByRole("button", { name: "+" });
    await user.click(quantityBtn);

    const addToCartBtn = screen.getByRole("button", { name: "Add to Cart" });
    await user.click(addToCartBtn);

    const viewCartBtn = screen.getByRole("link", { name: "VIEW CART" });
    await user.click(viewCartBtn);
    // we are on cart page now

    const productTableHeaders = screen.getAllByRole("columnheader");
    const headersValueList = ["Product", "Price", "Quantity", "Subtotal"];

    productTableHeaders.forEach((header, index) => {
      expect(header).toBeInTheDocument();
      expect(header.textContent).toEqual(headersValueList[index]);
    });
  });

  test("remove product button removes product", async () => {
    const user = userEvent.setup();

    setupRoute();

    const viewCartBtn = screen.getByRole("link", { name: "VIEW CART" });
    await user.click(viewCartBtn);

    const productName = screen.getByRole("link", {
      name: "Half Sleeve Cut and Sew Solid(pattern 15)",
    });
    expect(productName).toBeInTheDocument()

    const removeProductBtn = screen.getByTestId("productTableRemoveProductBtn");

    await user.click(removeProductBtn);
    expect(productName).not.toBeInTheDocument();
  });

  test("product image is available", async () => {
    const user = userEvent.setup();

    setupRoute();

    const viewCartBtn = screen.getByRole("link", { name: "VIEW CART" });
    await user.click(viewCartBtn);

    const productImage = screen.getByTestId("productTableProductImage");
    expect(productImage).toBeInTheDocument();
  });
});
