import { useRef } from "react";
import "../styles/notificationBanner.css";

function NotificationBanner({
  resultOfUserAction,
  setResultOfUserAction,
  productsInCart,
  setProductsInCart,
  userAction = null,
}) {
  const backup = useRef(productsInCart);

  const undoProductRemoval = () => {
    setProductsInCart(backup.current);
    localStorage.setItem("productsInCart", JSON.stringify(backup.current));
    setResultOfUserAction('');
    userAction.current = null;
  };

  const closeNotificationBanner = () => {
    backup.current = productsInCart;
    setResultOfUserAction('');
    userAction.current = null;
  };
  return (
    <>
      {resultOfUserAction !== '' && (
        <div className="status-update">
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
            </svg>
            <span className="success-status">{resultOfUserAction}.</span>
            {userAction.curren === "product removal" && (
              <span className="undo-btn" onClick={undoProductRemoval}>
                Undo?
              </span>
            )}
          </p>
          <div className="remove-banner-btn" onClick={closeNotificationBanner}>
            x
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationBanner;
