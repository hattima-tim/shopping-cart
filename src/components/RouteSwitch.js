import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import HalfSleeveCutTShirts from "./products/halfSleeveTShirts/main";
import { Product } from "./products/productPage";
import ProductPage from "./products/productPage";
import Header from "./header";
import Cart from "./cart";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<App />} />
          <Route
            path="/half-sleeve-cut-and-sew-solid"
            element={<HalfSleeveCutTShirts />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":name" element={<ProductPage />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
