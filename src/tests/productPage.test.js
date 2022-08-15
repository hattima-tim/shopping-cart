import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Product } from "../components/products/productPage";
import ProductPage from "../components/products/productPage";
import Header from "../components/header";

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
  return { container };
};

test("Product page", () => {
  const { container } = setup();
  expect(container).toMatchSnapshot();
});

describe("item counter", () => {
  test("increment and decrement", () => {
    setup();

    const inputField = screen.getByDisplayValue("1");
    const decrementBtn = screen.getByRole("button", { name: "-" });
    const incrementBtn = screen.getByRole("button", { name: "+" });

    userEvent.click(incrementBtn);
    userEvent.click(incrementBtn);
    userEvent.click(incrementBtn);

    userEvent.click(decrementBtn);

    expect(inputField.value).toBe("3");
  });

  test("user can type in input field", () => {
    setup();

    const inputField = screen.getByDisplayValue("1");

    userEvent.clear(inputField);
    userEvent.type(inputField, "56");
    expect(inputField.value).toBe("56");
  });
});
