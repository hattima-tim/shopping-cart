import { useState } from "react";
import { Outlet, useParams, Link, useOutletContext } from "react-router-dom";
import uniqid from "uniqid";
import getProductData from "./halfSleeveTShirts/productsData";
import "../../styles/productPage.css";

export function Product() {
  return (
    <>
      <Outlet context={useOutletContext()} />
    </>
  );
}

function ProductPage() {
  const params = useParams();
  const productData = getProductData(params.name);

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

  const [currentlyShowingAdditionalInfo, setCurrentlyShowingAdditionalInfo] =
    useState("description");
  const showDescription = () => {
    setCurrentlyShowingAdditionalInfo("description");
  };
  const showAdditionalInfo = () => {
    setCurrentlyShowingAdditionalInfo("additionalInfo");
  };

  const [productsInCart, setProductsInCart] = useOutletContext();

  const [fabric, setFabric] = useState('');

  const handleFabricBtnClick = (e) => {
    const currentBtn = e.target;
    const isButtonActive=currentBtn.classList.contains("active");
    
    const fabricBtns = document.querySelectorAll(".fabric-btn");
    fabricBtns.forEach((btn) => {
      if (btn !== currentBtn) {
        btn.classList.remove("active");
      }
    });
    
    if (isButtonActive) {
      currentBtn.classList.remove("active");
    } else {
      currentBtn.classList.add("active");
    }
    setFabric(currentBtn.textContent);
  };

  const [size, setSize] = useState('');

  const handleSizeBtnClick = (e) => {
    const currentBtn = e.target;
    const isButtonActive=currentBtn.classList.contains("active");
    
    const sizeBtns = document.querySelectorAll(".size-btn");
    sizeBtns.forEach((btn) => {
      if (btn !== currentBtn) {
        btn.classList.remove("active");
      }
    });
    
    if (isButtonActive) {
      currentBtn.classList.remove("active");
    } else {
      currentBtn.classList.add("active");
    }
    setSize(currentBtn.textContent);
  };

  let product = {
    name: productData.name,
    price: productData.price,
    quantity: itemNumber,
    totalPrice: itemNumber * (productData.price.split("৳")[1] * 1),
    fabric: fabric,
    size: size,
  };

  const handleAddToCart = () => {
    const newProduct = { ...product };
    setProductsInCart([...productsInCart, newProduct]);
  };

  return (
    <div>
      <div className="main">
        <img
          className="productImage"
          src={productData.img}
          alt={productData.name}
        />
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
              return (
                <button
                  key={index}
                  className="productOptionBtn fabric-btn"
                  onClick={handleFabricBtnClick}
                >
                  {fabric}
                </button>
              );
            })}
          </div>

          <div className="sizeButtons">
            {productData.size.map((size, index) => {
              return (
                <button
                  key={index}
                  className="productOptionBtn size-btn"
                  onClick={handleSizeBtnClick}
                >
                  {size}
                </button>
              );
            })}
          </div>

          <div className="addToCart">
            <div className="quantity">
              <button onClick={itemNumberDecrement}>-</button>
              <input type="number" onChange={handleChange} value={itemNumber} />
              <button onClick={itemNumberIncrement}>+</button>
            </div>

            <button className="addToCartButton" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="additional_info">
        <div className="additional_info_tabs">
          <button className="additional_info_tab" onClick={showDescription}>
            Description
          </button>

          <button className="additional_info_tab" onClick={showAdditionalInfo}>
            Additional Information
          </button>
        </div>

        {currentlyShowingAdditionalInfo === "description" && (
          <div className="additional_info_content">
            <p>
              <strong>Size Measurement (in inch/centimeter):</strong>
            </p>

            <ul>
              {productData.description.map((description, index) => {
                return <li key={index}>{description}</li>;
              })}
            </ul>

            <p>
              ডিভাইসের ভিন্নতা অনুযায়ী কালার ডেভিয়েশন এবং ফটোশপ এডিটিং কালার
              ডেভিয়েশনের কারনে বাস্তব ছবি ও সফটকপির মাঝে অনেক সময় পার্থক্য থেকে
              যায়
            </p>
          </div>
        )}
        {currentlyShowingAdditionalInfo === "additionalInfo" && (
          <table className="additional_info_table">
            <tbody>
              <tr>
                <th>Weight</th>
                <td>{productData.additionalInfo.weight}</td>
              </tr>
              <tr>
                <th>Fabric</th>
                <td>{productData.additionalInfo.fabric}</td>
              </tr>
              <tr>
                <th>Size</th>
                <td>{productData.additionalInfo.size}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
