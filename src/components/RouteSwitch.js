import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import HalfSleeveCutTShirts from "./products/halfSleeveTShirts/main";
import { Product } from "./products/productPage";
import ProductPage from './products/productPage';

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/half-sleeve-cut-and-sew-solid"
          element={<HalfSleeveCutTShirts />}
        />
        <Route path='/product' element={<Product/>}>
          <Route path=":name" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
