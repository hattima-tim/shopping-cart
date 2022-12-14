import { useEffect, useRef, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import uniqid from "uniqid";
import NotificationBanner from "./notificationBanner";
import "../styles/cart.css";

function Cart() {
  const [resultOfUserAction, setResultOfUserAction] = useState("");
  let userAction = useRef(null);

  const [productsInCart, setProductsInCart] = useOutletContext();
  const backup = useRef(productsInCart);

  const removeItemFromCart = (e) => {
    backup.current = productsInCart;

    const id = e.target.dataset.id;
    const newProductsInCart = productsInCart.filter(
      (product) => product.id !== id
    );

    setProductsInCart(newProductsInCart);
    localStorage.setItem("productsInCart", JSON.stringify(newProductsInCart));

    setResultOfUserAction(`${e.target.dataset.name} removed`);
    userAction.current = "product removal";
    window.scrollTo(0, 0);
  };

  const undoProductRemoval = () => {
    setProductsInCart(backup.current);
    localStorage.setItem("productsInCart", JSON.stringify(backup.current));

    setResultOfUserAction("");
    userAction.current = null;
  };

  const closeNotificationBanner = () => {
    backup.current = productsInCart;
    setResultOfUserAction("");
    userAction.current = null;
  };

  const [productsQuantities, setProductsQuantities] = useState([]);

  useEffect(() => {
    const allProductsQuantities = productsInCart.map((product) => {
      return product.quantity;
    });

    setProductsQuantities(allProductsQuantities);
  }, [productsInCart]);

  const sumOfAllSubTotal = productsInCart.reduce((acc, product) => {
    return acc + product.subTotal;
  }, 0);

  const increment = (e) => {
    const id = e.target.dataset.id;
    const newProductsQuantities = [...productsQuantities];
    newProductsQuantities[id] += 1;
    setProductsQuantities(newProductsQuantities);
  };

  const decrement = (e) => {
    const id = e.target.dataset.id;
    const newProductsQuantities = [...productsQuantities];
    if (newProductsQuantities[id] > 1) {
      newProductsQuantities[id] -= 1;
    }
    setProductsQuantities(newProductsQuantities);
  };

  const handleInputChange = (e) => {
    const id = e.target.dataset.id;
    const newProductsQuantities = [...productsQuantities];
    newProductsQuantities[id] = Number(e.target.value);
    setProductsQuantities(newProductsQuantities);
  };

  const updateCart = (e) => {
    const newProductsInCart = [...productsInCart];
    newProductsInCart.forEach((product, index) => {
      product.quantity = productsQuantities[index];
      product.subTotal = product.quantity * (product.price.split("???")[1] * 1);
    });

    localStorage.setItem("productsInCart", JSON.stringify(newProductsInCart));
    setProductsInCart(newProductsInCart);

    setResultOfUserAction(`Cart has been updated`);
    userAction.current = "cart update";
    window.scrollTo(0, 0);
  };

  const [totalPrice, setTotalPrice] = useState(sumOfAllSubTotal + 45.0);

  useEffect(() => {
    setTotalPrice(sumOfAllSubTotal + 45.0);
  }, [sumOfAllSubTotal]);

  const handleShippingMethodChange = (e) => {
    setTotalPrice(sumOfAllSubTotal + Number(e.target.value));
  };

  return (
    <>
      <div className="m-4 lg:mx-16">
        <NotificationBanner
          resultOfUserAction={resultOfUserAction}
          undoProductRemoval={undoProductRemoval}
          closeNotificationBanner={closeNotificationBanner}
          isCartEmpty={productsInCart.length === 0}
          userAction={userAction}
        />
      </div>
      {productsInCart.length > 0 && (
        <div
          data-testid="cartPage"
          className="cart-page m-4 flex flex-wrap lg:m-16 lg:flex-nowrap"
        >
          <div className="product-section w-full lg:w-3/6 lg:flex-1">
            <table>
              <thead>
                <tr>
                  <th className="product-name" colSpan="3">
                    Product
                  </th>
                  <th className="product-price hidden md:table-cell">Price</th>
                  <th className="product-quantity">Quantity</th>
                  <th className="product-subtotal hidden md:table-cell">
                    Subtotal
                  </th>
                </tr>
              </thead>

              {productsInCart.map((product, index) => {
                return (
                  <tbody key={uniqid()}>
                    <tr>
                      <td className="absolute left-0 border-b-0 md:static">
                        <button
                          className="remove-product-btn"
                          data-id={product.id}
                          data-testid="productTableRemoveProductBtn"
                          data-name={product.name}
                          onClick={removeItemFromCart}
                        >
                          x
                        </button>
                      </td>

                      <td className="product-thumbnail">
                        <img
                          src={product.img}
                          alt={product.name}
                          data-testid="productTableProductImage"
                        />
                      </td>

                      <td className="product-name">
                        <Link
                          to={`${product.fullPath}`}
                          className="text-gray-600"
                          data-testid="productTableProductName"
                        >
                          {product.name}
                        </Link>

                        <dl className="variation">
                          <dt className="mr-1">FABRIC: </dt>
                          <dd>{product.fabric}</dd>
                          <dt className="mr-1">SIZE: </dt>
                          <dd>{product.size}</dd>

                          <dd className="md:hidden">
                            {product.quantity}x
                            <strong className="text-black">
                              {product.price}
                            </strong>
                          </dd>
                        </dl>
                      </td>

                      <td className="product-price hidden md:table-cell">
                        <p className="text-black">{product.price}</p>
                      </td>

                      <td>
                        <div className="flex w-fit border-2 border-solid border-slate-200">
                          <button
                            data-id={index}
                            className="w-5 bg-slate-200 hover:bg-slate-300"
                            onClick={decrement}
                          >
                            -
                          </button>

                          <input
                            type="number"
                            data-id={index}
                            step="1"
                            min="0"
                            max="27"
                            onChange={handleInputChange}
                            value={productsQuantities[index]}
                            size="4"
                            className="w-8 text-center"
                          ></input>

                          <button
                            data-id={index}
                            className="w-5 bg-slate-200 hover:bg-slate-300"
                            onClick={increment}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td className="product-subtotal hidden md:table-cell">
                        <p>???{product.subTotal}</p>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>

            <div className="continue-update-btn-container">
              <Link to="/" className="continue-shopping-btn">
                ??? Continue Shopping
              </Link>

              <button className="update-cart-btn" onClick={updateCart}>
                Update Cart
              </button>
            </div>
          </div>

          <div id="checkout-section" className="w-full lg:w-2/6">
            <h3 className="my-4 mx-0 w-full border-2">CART TOTALS</h3>

            <div className="subTotal my-4">
              <p>Subtotal</p>
              <p>
                <span className="price my-4"> ???{sumOfAllSubTotal} </span>
              </p>
            </div>

            <div className="shipping my-4">
              <p>Shipping</p>

              <form>
                <input
                  type="radio"
                  id="redx"
                  name="shipping"
                  value="45.00"
                  onChange={handleShippingMethodChange}
                  {...(totalPrice === sumOfAllSubTotal + 45.0
                    ? { checked: true }
                    : { checked: false })}
                  className="my-2"
                />
                <label htmlFor="redx">
                  REDX:<strong> ??? 45.00</strong>
                </label>
                <br />

                <input
                  type="radio"
                  id="sundorbanCourier"
                  name="shipping"
                  value="130.00"
                  onChange={handleShippingMethodChange}
                  {...(totalPrice === sumOfAllSubTotal + 130.0
                    ? { checked: true }
                    : { checked: false })}
                  className="my-2"
                />
                <label htmlFor="sundorbanCourier">
                  Sundarban Courier:<strong> ??? 130.00 </strong>
                </label>
                <br />

                <input
                  type="radio"
                  id="sa-poribohon"
                  name="shipping"
                  value="170.00"
                  onChange={handleShippingMethodChange}
                  {...(totalPrice === sumOfAllSubTotal + 170.0
                    ? { checked: true }
                    : { checked: false })}
                  className="my-2"
                />
                <label htmlFor="sa-poribohon">
                  SA Paribahan:<strong> ??? 170.00</strong>
                </label>
                <br />

                <input
                  type="radio"
                  id="jananiCourrier"
                  name="shipping"
                  value="120.00"
                  onChange={handleShippingMethodChange}
                  {...(totalPrice === sumOfAllSubTotal + 120.0
                    ? { checked: true }
                    : { checked: false })}
                  className="my-2"
                />
                <label htmlFor="jananiCourrier">
                  Janani Courier:<strong> ??? 120.00</strong>
                </label>
              </form>

              <p className="my-2">Shipping to Dhaka.</p>
            </div>

            <div className="total">
              <p>Total</p>
              <p>
                <span className="price">???{totalPrice} </span>
              </p>
            </div>

            <button
              className="checkout_btn"
              onClick={() => {
                alert(
                  "Thanks for clicking me! Currently I have no functionality. Feel free to explore rest of the website."
                );
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
