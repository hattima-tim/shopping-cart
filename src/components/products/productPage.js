import { Outlet, useParams } from "react-router-dom";
import getProductData from "./halfSleeveTShirts/productsData";

export function Product() {
  return (
    <>
      <Outlet />
    </>
  );
}

function ProductPage() {

  const params = useParams();
  const productData = getProductData(params.name);
  return (
    <div>
      <div className="main">
        <img className="productImage" src={productData.img} alt={productData.name} />
      </div>
    </div>
  );
}

export default ProductPage;
