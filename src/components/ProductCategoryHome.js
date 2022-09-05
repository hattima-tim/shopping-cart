import { Link } from "react-router-dom";
import ProductCards from "./ProductCards";
import "../styles/productsPage.css";
import "../styles/productCards.css";

const ProductCategoryHomePage = ({productType,products}) => {
  return (
    <>
      <div className="my-4 text-center text-xl font-normal lg:ml-20 lg:text-left">
        <Link to="/">HOME /</Link>
        <span className="uppercase text-black">
          {productType}
        </span>
      </div>

      <ProductCards
        products={products}
        productType={productType}
      />
    </>
  );
};

export default ProductCategoryHomePage;