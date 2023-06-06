import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import ProductCategoryHomePage from "./ProductCategoryHome";
import ProductPage from "./ProductPage";
import Header from "./header";
import Footer from "./Footer";
import Cart from "./cart";
import halfSleeveCutTShirts from "./products/halfSleeveTShirts/products";
import getHalfSleeveCutTShirt from "./products/halfSleeveTShirts/productsData";
import getAllHalfSleeveDawaTShirtsData from "./products/halfSleeveDawah/productsData";
import { getSpecificHalfSleeveDawaTShirtData } from "./products/halfSleeveDawah/productsData";
import getAllHalfSleeveRegularTShirtsData from "./products/halfSleeveRegular/productsData";
import { getSpecificHalfSleeveRegularTShirtData } from "./products/halfSleeveRegular/productsData";
import getAllPoloTShirtsData from "./products/poloTShirts/productsData";
import { getSpecificPoloTShirtData } from "./products/poloTShirts/productsData";

function RouteSwitch() {
  return (
    <BrowserRouter basename="/shopping-cart">
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/half-sleeve-cut-and-sew-solid"
          element={
            <ProductCategoryHomePage
              products={halfSleeveCutTShirts}
              productType={"half-sleeve-cut-and-sew-solid"}
            />
          }
        />
        <Route
          path="/half-sleeve-cut-and-sew-solid/product/:name"
          element={<ProductPage getProductData={getHalfSleeveCutTShirt} />}
        />
        <Route
          path="/half-sleeve-dawah-tshirts-for-men"
          element={
            <ProductCategoryHomePage
              products={getAllHalfSleeveDawaTShirtsData()}
              productType={"half-sleeve-dawah-tshirts-for-men"}
            />
          }
        />
        <Route
          path="/half-sleeve-dawah-tshirts-for-men/product/:name"
          element={
            <ProductPage getProductData={getSpecificHalfSleeveDawaTShirtData} />
          }
        />
        <Route
          path="/half-sleeve-regular-tshirts-for-men"
          element={
            <ProductCategoryHomePage
              products={getAllHalfSleeveRegularTShirtsData()}
              productType={"half-sleeve-regular-tshirts-for-men"}
            />
          }
        />
        <Route
          path="/half-sleeve-regular-tshirts-for-men/product/:name"
          element={
            <ProductPage
              getProductData={getSpecificHalfSleeveRegularTShirtData}
            />
          }
        />
        <Route
          path="/polo-t-shirt"
          element={
            <ProductCategoryHomePage
              products={getAllPoloTShirtsData()}
              productType={"polo-t-shirt"}
            />
          }
        />
        <Route
          path="/polo-t-shirt/product/:name"
          element={<ProductPage getProductData={getSpecificPoloTShirtData} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="*"
          element={
            <h1 className="mt-40 flex max-w-full items-center justify-center font-bold text-gray-900">
              Thanks for exploring the site. The page you are looking for is not
              built yet.
            </h1>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default RouteSwitch;
