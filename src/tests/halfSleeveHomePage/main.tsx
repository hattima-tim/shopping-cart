import { Link } from "react-router-dom";
import ProductCards from "../../components/ProductCards";
import products from "./products";

const HalfSleeveCutTShirts = () => {
  return (
    <>
      <div className="my-4 text-center text-xl font-normal lg:ml-20 lg:text-left">
        <Link to="/">HOME /</Link>
        <span className="uppercase text-black">
          Half Sleeve Cut and Sew Solid
        </span>
      </div>

      <ProductCards
        products={products}
        productType="half-sleeve-cut-and-sew-solid"
      />
    </>
  );
};

export default HalfSleeveCutTShirts;
