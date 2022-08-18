import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import uniqid from "uniqid";
import "../styles/cart.css";

function Cart() {
  const [productsInCart, setProductsInCart] = useOutletContext();

  const totalPrice = productsInCart.reduce((acc, product) => {
    return acc + product.totalPrice;
  }, 0);

  const productsQuantityStorage = productsInCart.map((product) => {
    return product.quantity;
  });

  const [productsQuantities, setProductsQuantities] = useState(
    productsQuantityStorage
  );

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
      product.totalPrice = product.quantity * (product.price.split("৳")[1] * 1);
    });
    
    localStorage.setItem("productsInCart", JSON.stringify(newProductsInCart));
    setProductsInCart(newProductsInCart);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="product-name" colSpan="3">
              Product
            </th>
            <th className="product-price">Price</th>
            <th className="product-quantity">Quantity</th>
            <th className="product-subtotal">Subtotal</th>
          </tr>
        </thead>

        {productsInCart.map((product, index) => {
          return (
            <tbody key={uniqid()}>
              <tr>
                <td>
                  <button className="remove-product-btn">x</button>
                </td>

                <td className="product-thumbnail">
                  <img src={product.img} alt={product.name} />
                </td>

                <td className="product-name">
                  {product.name}
                  <dl className="variation">
                    <dt>FABRIC: </dt>
                    <dd>{product.fabric}</dd>
                    <dt>SIZE: </dt>
                    <dd>{product.size}</dd>
                  </dl>
                </td>

                <td className="product-price">
                  <p>{product.price}</p>
                </td>

                <td>
                  <div className="product-quantity">
                    <button
                      data-id={index}
                      className="decrementBtn"
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
                    ></input>

                    <button
                      data-id={index}
                      className="incrementBtn"
                      onClick={increment}
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="product-subtotal">
                  <p>৳{totalPrice}</p>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

      <div className="continue-update-btn-container">
        <button className="continue-shopping-btn">← Continue Shopping</button>
        <button className="update-cart-btn" onClick={updateCart}>
          Update Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
