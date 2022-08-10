import { Outlet, useParams, Link } from "react-router-dom";
import uniqid from "uniqid";
import getProductData from "./halfSleeveTShirts/productsData";
import "../../styles/productPage.css";

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
        <div className="mainInfo">
          <div className="breadcrumbs">
            {productData.breadCrumbs.map((breadCrumb, index) => {
              if (index === productData.breadCrumbs.length - 1) {
                return (
                  <Link key={uniqid()} to={breadCrumb.path}>
                    {breadCrumb.name}
                  </Link>
                );
              } else {
                return (
                  <Link key={uniqid()} to={breadCrumb.path}>
                    {breadCrumb.name + "/"}
                  </Link>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
