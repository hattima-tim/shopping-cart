import { Link } from "react-router-dom";
import ProductCards from "../productCards";
import products from "./products";

import "../../../styles/productsPage.css";
import '../../../styles/productCards.css';

const HalfSleeveCutTShirts = () => {

  return (
    <>
      <div className="text-xl font-normal text-center my-4">
        <Link to="/">HOME /</Link><span className="text-black">Half Sleeve Cut T-Shirts</span>
      </div>
      <ProductCards products={products} />
    </>
  );
};

export default HalfSleeveCutTShirts;
