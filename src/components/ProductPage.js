import { useState, useEffect, useRef } from "react";
import { Outlet, useParams, Link, useOutletContext } from "react-router-dom";
import uniqid from "uniqid";
import ImageMagnifier from "./imageMagnifier";
import NotificationBanner from "./notificationBanner";
import "../styles/productPage.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

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

  const handleClick = (event, buttonClassName, stateUpdater) => {
    const currentBtn = event.target;
    const isButtonActive = currentBtn.classList.contains("active");

    const sameBtns = document.querySelectorAll(buttonClassName);
    sameBtns.forEach((btn) => {
      if (btn !== currentBtn) {
        btn.classList.remove("active");
      }
    });

    if (isButtonActive) {
      // means that this button is pressed twice to deselect it
      currentBtn.classList.remove("active");
      stateUpdater("");
    } else {
      currentBtn.classList.add("active");
      stateUpdater(currentBtn.textContent);
    }
  };

  const [fabric, setFabric] = useState("");
  const handleFabricBtnClick = (e) => {
    handleClick(e, ".fabric-btn", setFabric);
  };

  const [color, setColor] = useState("");
  const handleColorBtnClick = (e) => {
    handleClick(e, ".color-btn", setColor);
  };

  const [size, setSize] = useState("");
  const handleSizeBtnClick = (e) => {
    handleClick(e, ".size-btn", setSize);
  };

  let product = {
    id: uniqid(),
    name: productData.name,
    img: productData.imagesForProductPage[0],
    price: productData.price,
    quantity: itemNumber,
    subTotal: itemNumber * (productData.price.split("৳")[1] * 1),
    fabric: fabric,
    color: color,
    size: size,
    path: params.name,
  };

  const productOptionsAvailable = useRef(null);
  useEffect(() => {
    productOptionsAvailable.current = [
      ...document.querySelectorAll(".product-option"),
    ].map((option) => {
      return option.textContent.toLowerCase();
    });
  });

  const [resultOfUserAction, setResultOfUserAction] = useState("");

  const handleAddToCart = () => {
    let didUserInputProductOption = true;
    productOptionsAvailable.current.forEach((option) => {
      switch (option) {
        case "fabric":
          if (fabric === "") {
            didUserInputProductOption = false;
          }
          break;
        case "color":
          if (color === "") {
            didUserInputProductOption = false;
          }
          break;
        case "size":
          if (size === "") {
            didUserInputProductOption = false;
          }
          break;
        default:
          break;
      }
    });
    if (!didUserInputProductOption) {
      alert("please select all product options");
      return;
    }

    const newProduct = { ...product };
    localStorage.setItem(
      "productsInCart",
      JSON.stringify([...productsInCart, newProduct])
    );
    setProductsInCart([...productsInCart, newProduct]);
    setResultOfUserAction(`"${product.name}" has been added to the cart`);
    window.scrollTo(0, 0);
  };

  const mainRef = useRef(null);
  const thumbsRef = useRef(null);

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  });

  const mainOptions = {
    type: "loop",
    perMove: 1,
    arrows: window.innerWidth > 768 ? true : false,
    gap: ".5rem",
    pagination: false,
  };

  const thumbsOptions = {
    type: "slide",
    perPage: productData.imagesForProductPage.length,
    rewind: true,
    gap: "1rem",
    pagination: false,
    fixedWidth: "5rem",
    fixedHeight: "5rem",
    cover: true,
    isNavigation: true,
  };

  const handleMouseOver = () => {
    const arrows = document.querySelectorAll(".splide__arrow");
    arrows.forEach((arrow) => {
      arrow.style.display = "block";
    });
  };

  const handleMouseLeave = () => {
    const arrows = document.querySelectorAll(".splide__arrow");
    arrows.forEach((arrow) => {
      arrow.style.display = "none";
    });
  };

  const closeNotificationBanner = () => {
    setResultOfUserAction("");
  };

  return (
    <div className="mx-4 md:mx-12 lg:mx-16">
      <NotificationBanner
        resultOfUserAction={resultOfUserAction}
        closeNotificationBanner={closeNotificationBanner}
      />
      <div className="main mb-12 mt-9 lg:flex">
        <div className="w-full lg:w-1/2">
          {productData.imagesForProductPage.length > 1 ? (
            <Splide
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              ref={mainRef}
              options={mainOptions}
            >
              {productData.imagesForProductPage.map((imgSrc) => {
                return (
                  <SplideSlide key={uniqid()} className="">
                    <ImageMagnifier src={imgSrc} alt={productData.name} />
                  </SplideSlide>
                );
              })}
            </Splide>
          ) : (
            <ImageMagnifier
              src={productData.imagesForProductPage[0]}
              alt={productData.name}
            />
          )}

          {productData.imagesForProductPage.length > 1 && (
            <Splide ref={thumbsRef} options={thumbsOptions}>
              {productData.imagesForProductPage.map((imgSrc) => {
                return (
                  <SplideSlide key={uniqid()} className="thumbnail">
                    <img src={imgSrc} alt={productData.name} />
                  </SplideSlide>
                );
              })}
            </Splide>
          )}
        </div>

        <div className="mainInfo lg:ml-8">
          <div className="breadcrumbs mt-2 text-sm lg:mt-0 lg:text-base">
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
                    {breadCrumb.name + " / "}
                  </Link>
                );
              }
            })}
          </div>

          <h1 className="mt-2 mb-6 text-xl font-bold text-[#555555] lg:text-3xl">
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
              <span className="product-option text-sm font-bold text-slate-800">
                FABRIC
              </span>
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

          {productData.color.toString() !== "" && ( // for some products color data is not present
            <div className="colorButtons">
              <span className="product-option text-sm font-bold text-slate-800">
                COLOR
              </span>
              <br />
              {productData.color.map((color, index) => {
                return (
                  <button
                    key={index}
                    className="color-btn mb-1 mr-2 w-fit rounded-sm border-2 border-black bg-white p-1 text-base text-black"
                    onClick={handleColorBtnClick}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
          )}

          <div className="sizeButtons">
            <span className="product-option text-sm font-bold text-slate-800">
              SIZE
            </span>
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
      <div className="additional_info my-4">
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
