import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import ProductCategoryHomePage from "./ProductCategoryHome";
import ProductPage from "./ProductPage";
import Header from "./header";
import Footer from "./Footer";
import Cart from "./cart";
import { halfSleeveCutSewProductsData } from "../productsData/halfSleeveTShirts/productsData";
import getHalfSleeveCutTShirt from "../productsData/halfSleeveTShirts/productsData";
import getAllHalfSleeveDawaTShirtsData from "../productsData/halfSleeveDawah/productsData";
import { getSpecificHalfSleeveDawaTShirtData } from "../productsData/halfSleeveDawah/productsData";
import getAllHalfSleeveRegularTShirtsData from "../productsData/halfSleeveRegular/productsData";
import { getSpecificHalfSleeveRegularTShirtData } from "../productsData/halfSleeveRegular/productsData";
import getAllPoloTShirtsData from "../productsData/poloTShirts/productsData";
import { getSpecificPoloTShirtData } from "../productsData/poloTShirts/productsData";
import ContactForm from "./formikForm";

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
              products={halfSleeveCutSewProductsData}
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
        <Route
          path='/contact'
          element={<ContactForm/>}
          />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default RouteSwitch;
