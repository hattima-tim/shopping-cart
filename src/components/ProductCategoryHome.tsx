import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import ProductCards from "./ProductCards";
import "../styles/productsPage.css";
import "../styles/productCards.css";
import { Product } from '../productsData/productsData';

type Props = {
  productType:string,
  products:Product[]
}

const ProductCategoryHomePage = ({productType,products}:Props) => {
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
ProductCategoryHomePage.propTypes = {
  productType: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductCategoryHomePage;