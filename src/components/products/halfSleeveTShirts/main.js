import { Link } from "react-router-dom";
import ProductCards from "../productCards";
import products from "./products";

import "../../../styles/productsPage.css";
import "../../../styles/productCards.css";

const HalfSleeveCutTShirts = () => {
  return (
    <>
      <div className="my-4 text-center text-xl font-normal lg:ml-20 lg:text-left">
        <Link to="/">HOME /</Link>
        <span className="text-black">Half Sleeve Cut T-Shirts</span>
      </div>
      <ProductCards products={products} />
    </>
  );
};

export default HalfSleeveCutTShirts;
