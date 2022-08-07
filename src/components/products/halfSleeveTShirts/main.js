import { Link } from "react-router-dom";
import ProductCards from "../productCards";
import products from "./products";

import "../../../styles/productsPage.css";
import '../../../styles/productCards.css';

const HalfSleeveCutTShirts = () => {

  return (
    <>
      <div className="breadCrumbs">
        <Link to="/">Home</Link> / Half Sleeve Cut T-Shirts
      </div>
      <ProductCards products={products} />
    </>
  );
};

export default HalfSleeveCutTShirts;
