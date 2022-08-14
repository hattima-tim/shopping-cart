import { render} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Product } from "../components/products/productPage";
import ProductPage from "../components/products/productPage";
import Header from "../components/header";

test("Product page", () => {
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
  expect(container).toMatchSnapshot();
});
