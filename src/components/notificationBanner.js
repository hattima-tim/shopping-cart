import { Link } from "react-router-dom";
import "../styles/notificationBanner.css";

function NotificationBanner({
  resultOfUserAction,
  undoProductRemoval,
  closeNotificationBanner,
  isCartEmpty,
  userAction = null,
}) {
  return (
    <>
      {resultOfUserAction !== "" && (
        <div className="status-update align-center mt-4 mx-auto flex w-11/12 items-center justify-between gap-5 border-l-4 border-l-green-600 bg-white p-2 md:pl-12">
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
            </svg>
            <span className="success-status text-green-600">
              {resultOfUserAction}.
            </span>
            {userAction.current === "product removal" && (
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
      {isCartEmpty && (
        <>
          <div className="my-8 mx-auto w-11/12 border-l-4 border-l-red-500 bg-white p-6 text-center text-slate-700">
            <p>Your cart is currently empty.</p>
          </div>

          <Link to='/' className="mx-auto my-2 block bg-black py-2 px-4 text-base font-semibold text-white w-fit hover:text-white">
            RETURN TO SHOP
          </Link>
        </>
      )}
    </>
  );
}

export default NotificationBanner;
