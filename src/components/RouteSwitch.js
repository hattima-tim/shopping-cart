import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import ProductCategoryHomePage from "./ProductCategoryHome";
import { Product } from "./ProductPage";
import ProductPage from "./ProductPage";
import Header from "./header";
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<App />} />

          <Route
            path="/half-sleeve-cut-and-sew-solid"
            element={
              <ProductCategoryHomePage
                products={halfSleeveCutTShirts}
                // products will be used to create product cards
                productType={"half-sleeve-cut-and-sew-solid"}
                // productType is used to create product url
              />
            }
          />

          <Route
            path="/half-sleeve-cut-and-sew-solid/product"
            element={<Product />}
          >
            <Route
              path=":name"
              element={<ProductPage getProductData={getHalfSleeveCutTShirt} />}
            />
          </Route>

          <Route
            path="/half-sleeve-dawah-tshirts-for-men"
            element={
              <ProductCategoryHomePage
                products={getAllHalfSleeveDawaTShirtsData()}
                // products will be used to create product cards
                productType={"half-sleeve-dawah-tshirts-for-men"}
                // productType is used to create product url
              />
            }
          />

          <Route
            path="/half-sleeve-dawah-tshirts-for-men/product"
            element={<Product />}
          >
            <Route
              path=":name"
              element={
                <ProductPage
                  getProductData={getSpecificHalfSleeveDawaTShirtData}
                />
              }
            />
          </Route>

          <Route
            path="/half-sleeve-regular-tshirts-for-men"
            element={
              <ProductCategoryHomePage
                products={getAllHalfSleeveRegularTShirtsData()}
                // products will be used to create product cards
                productType={"half-sleeve-regular-tshirts-for-men"}
                // productType is used to create product url
              />
            }
          />

          <Route
            path="/half-sleeve-regular-tshirts-for-men/product"
            element={<Product />}
          >
            <Route
              path=":name"
              element={
                <ProductPage
                  getProductData={getSpecificHalfSleeveRegularTShirtData}
                />
              }
            />
          </Route>

          <Route
            path="/polo-t-shirt"
            element={
              <ProductCategoryHomePage
                products={getAllPoloTShirtsData()}
                // products will be used to create product cards
                productType={"polo-t-shirt"}
                // productType is used to create product url
              />
            }
          />

          <Route path="/polo-t-shirt/product" element={<Product />}>
            <Route
              path=":name"
              element={
                <ProductPage getProductData={getSpecificPoloTShirtData} />
              }
            />
          </Route>

          <Route path="/cart" element={<Cart />} />
          <Route
            path="*"
            element={
              <h1 className="mt-40 flex max-w-full items-center justify-center font-bold text-gray-900">
                Thanks for exploring the site. The page you are looking for is
                not built yet.
              </h1>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
