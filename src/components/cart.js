import uniqid from "uniqid";
import "../styles/cart.css";

function Cart() {
  const productsInCart = JSON.parse(localStorage.getItem("productsInCart"));

  const totalPrice = productsInCart.reduce((acc, product) => {
    return acc + product.totalPrice;
  }, 0);

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

        {productsInCart.map((product) => {
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
                    <button className="decrementBtn">-</button>
                    <input type="number" value={product.quantity} />
                    <button className="incrementBtn">+</button>
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
        <button className="update-cart-btn">Update Cart</button>
      </div>
    </div>
  );
}

export default Cart;
