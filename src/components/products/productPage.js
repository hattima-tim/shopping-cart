import { useState } from "react";
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
  const [itemNumber, setItemNumber] = useState(1);
  const itemNumberIncrement = () => {
    setItemNumber(itemNumber + 1);
  };
  const itemNumberDecrement = () => {
    if (itemNumber > 1) {
      setItemNumber(itemNumber - 1);
    }
  };
  const handleChange = (e) => {
    if (e.target.value > 0) {
      const value = parseInt(e.target.value);
      setItemNumber(value);
    }
  };

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
          <h1>{productData.name}</h1>
          <h2>{productData.price}</h2>

          <ul className="details">
            {productData.details.map((detail, index) => {
              return <li key={index}>{detail}</li>;
            })}
          </ul>

          <div className="fabricButtons">
            {productData.fabric.map((fabric, index) => {
              return <button key={index} className='productOptionBtn'>{fabric}</button>;
            })}
          </div>

          <div className="sizeButtons">
            {productData.size.map((size, index) => {
              return <button key={index} className='productOptionBtn'>{size}</button>;
            })}
          </div>

          <div className="addToCart">
            <div className="quantity">
              <button onClick={itemNumberDecrement}>-</button>
              <input type="number" onChange={handleChange} value={itemNumber} />
              <button onClick={itemNumberIncrement}>+</button>
            </div>

            <button className="addToCartButton">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
