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
import { Product } from "../productsData/productsData";

function createProductRoute(
  path: string,
  products: Product[],
  getProductData: (searchPath: string) => Product
) {
  return (
    <>
      <Route
        path={path}
        element={
          <ProductCategoryHomePage products={products} productType={path} />
        }
      />
      <Route
        path={`${path}/product/:name`}
        element={<ProductPage getProductData={getProductData} />}
      />
    </>
  );
}

function RouteSwitch() {
  return (
    <BrowserRouter basename="/shopping-cart">
      <Header />
      <Routes>
        <Route path="/" element={<App />} />

        {createProductRoute(
          "/half-sleeve-cut-and-sew-solid",
          halfSleeveCutSewProductsData,
          getHalfSleeveCutTShirt
        )}
        {createProductRoute(
          "/half-sleeve-dawah-tshirts-for-men",
          getAllHalfSleeveDawaTShirtsData(),
          getSpecificHalfSleeveDawaTShirtData
        )}
        {createProductRoute(
          "/half-sleeve-regular-tshirts-for-men",
          getAllHalfSleeveRegularTShirtsData(),
          getSpecificHalfSleeveRegularTShirtData
        )}
        {createProductRoute(
          "/polo-t-shirt",
          getAllPoloTShirtsData(),
          getSpecificPoloTShirtData
        )}

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
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default RouteSwitch;
