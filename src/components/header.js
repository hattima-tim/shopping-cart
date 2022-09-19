import { useEffect, useRef, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import SideNav from "./SideNav";
import SearchBar from "./SearchBar";
import "../styles/header.css";

function Header() {
  const [productsInCart, setProductsInCart] = useState(
    JSON.parse(localStorage.getItem("productsInCart")) || []
  );

  const totalItem = productsInCart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  const subTotal = productsInCart.reduce((acc, product) => {
    return acc + product.subTotal;
  }, 0);

  const removeItemFromCart = (e) => {
    const id = Number(e.target.dataset.id);
    const newProductsInCart = productsInCart.filter(
      (product, index) => index !== id
    );
    setProductsInCart(newProductsInCart);
    localStorage.setItem("productsInCart", JSON.stringify(newProductsInCart));
  };

  const handleCheckout = () => {
    alert("Thank you for your purchase!");
    setProductsInCart([]);
  };

  const cartDisplayer = useRef(null);

  const showCartDrawer = (event) => {
    cartDisplayer.current.style.transform = "translateX(0)";
    document.body.addEventListener("click", hideCartDrawer);
    event.stopPropagation();
  };

  const hideCartDrawer = () => {
    cartDisplayer.current.style.transform = "translateX(100%)";
    document.body.removeEventListener("click", hideCartDrawer);
  };

  const showProductstooltip = () => {
    cartDisplayer.current.style.visibility = "visible";
  };

  const hideProductstooltip = () => {
    cartDisplayer.current.style.visibility = "hidden";
  };

  const headerRef = useRef(null);
  const [header, setHeader] = useState(null);

  useEffect(() => {
    setHeader(headerRef.current);
  }, []);

  useEffect(() => {
    let prevScrollpos = window.pageYOffset;
    window.onscroll = function () {
      let currentScrollPos = window.pageYOffset;
      if (currentScrollPos > prevScrollpos) {
        header.style.top = "-100%";
      } else {
        header.style.top = "0";
      }
      prevScrollpos = currentScrollPos;
    };
  }, [header]);

  return (
    <>
      <div ref={headerRef} className="header-container">
        <div className="header z-10 w-full items-center bg-[#f0f0f0] px-3 md:px-8 lg:justify-between lg:px-8">
          <SideNav header={header} />
          <SearchBar />

          <Link to="/" className="my-3 ml-auto mr-[2.5rem] lg:mr-64">
            <img
              src="https://res.cloudinary.com/du3oueesv/image/upload/v1660122044/shopping%20cart/oubd-logo-with-tm-black-1-1400x642_se0t70.png"
              className="companyLogo w-24"
              alt="one ummah logo"
            ></img>
          </Link>

          <div
            {...(window.innerWidth > 1024
              ? { onMouseOver: showProductstooltip }
              : { onClick: showCartDrawer })}
            {...(window.innerWidth > 1024
              ? { onMouseLeave: hideProductstooltip }
              : {})}
            className="shopping-cart-icon ml-auto cursor-pointer py-2 px-2 lg:py-1"
          >
            <span
              id="subTotal"
              className="hidden self-center text-sm text-black lg:inline-block"
            >
              ৳ {subTotal}.00
            </span>

            <span className="fa-layers fa-fw">
              <svg
                className="m-0 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
              <span
                className="fa-layers-counter top-[-12px] left-[13px] font-bold"
                style={{ background: "black" }}
                data-testid="cart-item-count"
              >
                {totalItem}
              </span>
            </span>
          </div>
          <div
            ref={cartDisplayer}
            {...(window.innerWidth > 1024
              ? { className: "products_tooltip" }
              : { className: "cart-drawer" })}
            {...(window.innerWidth > 1024
              ? { onMouseOver: showProductstooltip }
              : {})}
            {...(window.innerWidth > 1024
              ? { onMouseLeave: hideProductstooltip }
              : {})}
          >
            <div
              className="closebtn cursor-pointer hover:text-black lg:hidden"
              onClick={hideCartDrawer}
            >
              &times;
            </div>
            <h1 className="my-2 text-center text-xl font-bold lg:hidden">
              Cart
            </h1>
            <div className="mx-auto mb-4  w-16 border-2 bg-[#7f7f7f] lg:hidden"></div>
            {productsInCart.toString() !== "" && (
              <>
                <div className="products_container">
                  {productsInCart.map((product, index) => {
                    return (
                      <div className="product_tooltip_item" key={index}>
                        <div className="product_tooltip_item_img">
                          <img src={product.img} alt={product.name} />
                        </div>

                        <div className="product_tooltip_item_info">
                          <div className="tooltip_header">
                            <h3 className="text-[#4e4e4e]">{product.name}</h3>
                            <button
                              data-testid="remove-item-btn"
                              data-id={index}
                              className="remove_item_btn p-2"
                              onClick={removeItemFromCart}
                            >
                              x
                            </button>
                          </div>

                          <p>FABRIC: {product.fabric}</p>
                          {product.color && (
                            <p className="uppercase">COLOR: {product.color}</p>
                          )}
                          <p>SIZE: {product.size}</p>
                          <p>
                            {product.quantity} x{" "}
                            <span className="font-bold">{product.price}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="flex justify-center border-t border-b-2 border-t-[#dcdcdc] border-b-[#dcdcdc] py-3">
                  <span>Subtotal: ৳</span>
                  <span className="text-black">{subTotal}</span>
                </p>

                <Link to="/cart" className="view_cart">
                  VIEW CART
                </Link>
                <button className="checkout_btn" onClick={handleCheckout}>
                  CHECKOUT
                </button>
              </>
            )}

            {productsInCart.toString() === "" && (
              <p className="empty_cart">Your cart is empty</p>
            )}
          </div>
        </div>

        <TopNavBar />
      </div>
      <Outlet context={[productsInCart, setProductsInCart]} />
    </>
  );
}

export default Header;
