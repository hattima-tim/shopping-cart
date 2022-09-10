import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import TopNavBar from "./TopNavBar";
import SideNav from "./SideNav";
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
  };

  const handleCheckout = () => {
    alert("Thank you for your purchase!");
    setProductsInCart([]);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelector(".header").classList.remove("fixed");
      } else {
        document.querySelector(".header").classList.add("fixed");
      }
    });
    observer.observe(document.querySelector("#top-nav-bar"));
  });
  return (
    <>
      <div className="header z-10 w-full items-center justify-between bg-[#f0f0f0] px-3 md:px-8 lg:px-8">
        <SideNav />

        <Link to="/" className="my-3">
          <img
            src="https://res.cloudinary.com/du3oueesv/image/upload/v1660122044/shopping%20cart/oubd-logo-with-tm-black-1-1400x642_se0t70.png"
            className="companyLogo w-24"
            alt="one ummah logo"
          ></img>
        </Link>

        <div className="shopping-cart-icon cursor-pointer py-2 px-2 lg:py-1">
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

          <div className="products_tooltip cursor-auto">
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
                              data-id={index}
                              className="remove_item_btn p-2"
                              onClick={removeItemFromCart}
                            >
                              x
                            </button>
                          </div>

                          <p>FABRIC: {product.fabric}</p>
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
      </div>

      <TopNavBar />
      <Outlet context={[productsInCart, setProductsInCart]} />
    </>
  );
}

export default Header;
