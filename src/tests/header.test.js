import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Header from "../components/header";
import { Product } from "../components/products/productPage";
import ProductPage from "../components/products/productPage";

const setup = () => {
  const { container } = render(
    <MemoryRouter
      initialEntries={["/product/half-sleeve-cut-and-sew-solid-pattern-15"]}
    >
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="product" element={<Product />}>
            <Route path=":name" element={<ProductPage />} />
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );

  const fabricBtn = screen.getByRole("button", { name: "COMBED COTTON" });
  userEvent.click(fabricBtn);

  const sizeBtn = screen.getByRole("button", { name: "M" });
  userEvent.click(sizeBtn);

  const quantityBtn = screen.getByRole("button", { name: "+" });
  userEvent.click(quantityBtn);
  userEvent.click(quantityBtn);

  const addToCartBtn = screen.getByRole("button", { name: "Add to Cart" });
  userEvent.click(addToCartBtn);

  return container;
};

test("header and product page", () => {
  const container = setup();
  expect(container).toMatchSnapshot(); // the snapshot contains both
  // Header and ProductPage
});

test("remove button removes product from cart", () => {
  setup();

  const productRemoveBtn = screen.getByRole("button", {
    name: "x",
  });
  const productName = screen.getByRole(
    "heading",
    { level: 3 },
    { name: "Half Sleeve Cut and Sew Solid(pattern 15)" }
  );

  userEvent.click(productRemoveBtn);

  expect(productRemoveBtn).not.toBeInTheDocument();
  expect(productName).not.toBeInTheDocument();
});
