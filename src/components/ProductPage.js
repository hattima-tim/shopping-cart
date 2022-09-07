import { useState } from "react";
import { Outlet, useParams, Link, useOutletContext } from "react-router-dom";
import uniqid from "uniqid";
import ImageMagnifier from "./imageMagnifier";
import "../styles/productPage.css";

export function Product() {
  return (
    <>
      <Outlet context={useOutletContext()} />
    </>
  );
}

function ProductPage({ getProductData }) {
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

  const styleTabAsActive = () => {
    const descriptionTab = document.querySelector(".description");
    descriptionTab.classList.toggle("active-tab");

    const additionalInfoTab = document.querySelector(".additional-info");
    additionalInfoTab.classList.toggle("active-tab");
  };

  const showDescription = () => {
    setCurrentlyShowingAdditionalInfo("description");
    styleTabAsActive();
  };
  const showAdditionalInfo = () => {
    setCurrentlyShowingAdditionalInfo("additionalInfo");
    styleTabAsActive();
  };

  const [productsInCart, setProductsInCart] = useOutletContext();

  const [fabric, setFabric] = useState("");

  const handleFabricBtnClick = (e) => {
    const currentBtn = e.target;
    const isButtonActive = currentBtn.classList.contains("active");

    const fabricBtns = document.querySelectorAll(".fabric-btn");
    fabricBtns.forEach((btn) => {
      if (btn !== currentBtn) {
        btn.classList.remove("active");
      }
    });

    if (isButtonActive) {
      // means that this button is pressed twice to deselect it
      currentBtn.classList.remove("active");
      setFabric("");
    } else {
      currentBtn.classList.add("active");
      setFabric(currentBtn.textContent);
    }
  };

  const [size, setSize] = useState("");

  const handleSizeBtnClick = (e) => {
    const currentBtn = e.target;
    const isButtonActive = currentBtn.classList.contains("active");

    const sizeBtns = document.querySelectorAll(".size-btn");
    sizeBtns.forEach((btn) => {
      if (btn !== currentBtn) {
        btn.classList.remove("active");
      }
    });

    if (isButtonActive) {
      // means that this button is pressed twice to deselect it
      currentBtn.classList.remove("active");
      setSize("");
    } else {
      currentBtn.classList.add("active");
      setSize(currentBtn.textContent);
    }
  };

  let product = {
    id: uniqid(),
    name: productData.name,
    img: productData.img,
    price: productData.price,
    quantity: itemNumber,
    subTotal: itemNumber * (productData.price.split("৳")[1] * 1),
    fabric: fabric,
    size: size,
    path: params.name,
  };

  const handleAddToCart = () => {
    if (size === "" || fabric === "") {
      alert("Please select both fabric and size");
      return;
    }
    const newProduct = { ...product };
    localStorage.setItem(
      "productsInCart",
      JSON.stringify([...productsInCart, newProduct])
    );
    setProductsInCart([...productsInCart, newProduct]);
  };

  return (
    <div className="lg:mx-16">
      <div className="main mx-4 mb-12 mt-4 lg:flex">
        <ImageMagnifier
          src={productData.imgForProductPage}
          alt={productData.name}
        />

        <div className="mainInfo lg:ml-8">
          <div className="breadcrumbs text-sm lg:text-base">
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
                    {breadCrumb.name + ' / '}
                  </Link>
                );
              }
            })}
          </div>

          <h1 className="mt-2 mb-6 text-xl font-bold text-gray-600 lg:text-3xl">
            {productData.name}
          </h1>
          <h2 className="mb-4 text-2xl font-bold text-slate-800">
            {productData.price}
          </h2>
          <p className="mb-6">
            <strong>Detailed Specification</strong>
          </p>
          <ul className="details list-disc">
            {productData.details.map((detail, index) => {
              return (
                <li key={index} className="mx-4 my-3">
                  {detail}
                </li>
              );
            })}
          </ul>

          {productData.fabric.toString() !== "" && ( // for some products fabric data is not present
            <div className="fabricButtons">
              <span className="text-sm font-bold text-slate-800">FABRIC</span>
              <br />
              {productData.fabric.map((fabric, index) => {
                return (
                  <button
                    key={index}
                    className="fabric-btn mb-1 mr-2 w-fit rounded-sm border-2 border-black bg-white p-1 text-base text-black"
                    onClick={handleFabricBtnClick}
                  >
                    {fabric}
                  </button>
                );
              })}
            </div>
          )}

          <div className="sizeButtons">
            <span className="text-sm font-bold text-slate-800">SIZE</span>
            <br />
            {productData.size.map((size, index) => {
              return (
                <button
                  key={index}
                  className="size-btn mb-8 mr-2 w-fit rounded-sm border-2 border-black bg-white p-1 text-base text-black"
                  onClick={handleSizeBtnClick}
                >
                  {size}
                </button>
              );
            })}
          </div>

          <div className="addToCart flex gap-4">
            <div className="quantity">
              <button
                onClick={itemNumberDecrement}
                className="h-10 w-8 bg-gray-200 hover:bg-slate-300"
              >
                -
              </button>
              <input
                type="number"
                onChange={handleChange}
                value={itemNumber}
                className="h-10 w-8 border border-y-gray-200 text-center"
              />
              <button
                onClick={itemNumberIncrement}
                className="h-10 w-8 bg-gray-200 hover:bg-slate-300"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-fit bg-black px-6 py-2 font-bold text-white "
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="additional_info m-4">
        <div className="additional_info_tabs md:border-top-gray-400 md:flex md:gap-2 md:border-t">
          <button
            onClick={showDescription}
            className="description active-tab peer border-t py-2 text-start font-bold hover:border-t-2 hover:border-t-black peer-hover:border-t peer-hover:border-t-gray-400"
          >
            Description
          </button>
          <br />
          <button
            onClick={showAdditionalInfo}
            className="additional-info peer border-t py-2 text-start font-bold hover:border-t-2 hover:border-t-black "
          >
            Additional Information
          </button>
        </div>

        {currentlyShowingAdditionalInfo === "description" && (
          <div className="additional_info_content my-4">
            <p>
              <strong>Size Measurement (in inch/centimeter):</strong>
            </p>

            <ul>
              {productData.description.map((description, index) => {
                return (
                  <li key={index} className="my-4">
                    {description}
                  </li>
                );
              })}
            </ul>

            <p className="my-4">
              ডিভাইসের ভিন্নতা অনুযায়ী কালার ডেভিয়েশন এবং ফটোশপ এডিটিং কালার
              ডেভিয়েশনের কারনে বাস্তব ছবি ও সফটকপির মাঝে অনেক সময় পার্থক্য থেকে
              যায়
            </p>
          </div>
        )}
        {currentlyShowingAdditionalInfo === "additionalInfo" && (
          <table className="additional_info_table my-4">
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
