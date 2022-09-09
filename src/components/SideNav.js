import { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/sidenav.css";

function SideNav() {
  const sideNavRef = useRef(null);

  const closeNav = () => {
    const body = document.querySelector("body");
    body.style.overflow = "auto";

    sideNavRef.current.style.transform = "translateX(-100%)";
  };

  const showNav = () => {
    const root = document.querySelector("#root");
    root.style.height = "100vh";
    root.style.overflow = "hidden";

    sideNavRef.current.style.transform = "translateX(0)";
  };

  const rotateIcon = (e) => {
    const downArrow = e.target;

    if (!downArrow.classList.contains("rotated")) {
      downArrow.style.transform = "rotate(180deg)";
    } else {
      downArrow.style.transform = "rotate(0deg)";
    }

    downArrow.classList.toggle("rotated");

    const downArrowContainerParent = downArrow.parentElement.parentElement;
    downArrowContainerParent.classList.toggle("active-child-sidenav-container");

    const childSideNav = downArrow.parentElement.nextElementSibling;
    childSideNav.classList.toggle("active-child-sidenav");
  };

  return (
    <>
      <div
        onClick={() => {
          showNav();
        }}
        className="group cursor-pointer rounded-full border border-gray-500 p-3 hover:bg-black"
      >
        <svg
          className="m-[.1rem] w-3 fill-gray-500 group-hover:fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
      </div>

      <div
        ref={sideNavRef}
        className="sidenav z-50 block w-4/6 overflow-y-hidden"
      >
        <div
          className="closebtn cursor-pointer hover:text-black"
          onClick={closeNav}
        >
          &times;
        </div>

        <ul>
          <li className="flex border-b p-3">
            <Link to="/" className=" text-sm font-semibold">
              HOME
            </Link>
          </li>

          <li className="border-b py-2 px-3 hover:bg-[#e8e8e7]">
            <div className="flex cursor-pointer justify-between ">
              <Link to="/" className="text-sm font-semibold">
                MEN'S COLLECTION
              </Link>

              <img
                src="https://res.cloudinary.com/du3oueesv/image/upload/v1662729992/shopping%20cart/polo%20t%20shirts/product%20card%20image/Mask_group_1_mkkawx.png"
                alt="down arrow icon"
                className="down-arrow w-6 cursor-pointer"
                onClick={rotateIcon}
              />
            </div>
            <div className="child-sidenav flex flex-col">
              <h2 className="mx-6 border-b py-2 text-sm font-medium text-black">
                HALF SLEEVE T SHIRT
              </h2>

              <Link
                to="/half-sleeve-dawah-tshirts-for-men"
                className="mx-8 border-b py-2 text-base font-normal"
              >
                Half Sleeve Dawah T-Shirt
              </Link>

              <Link
                to="/half-sleeve-regular-tshirts-for-men"
                className="mx-8 border-b py-2 text-base font-normal"
              >
                Half Sleeve Regular T-Shirt
              </Link>

              <Link
                to="/half-sleeve-cut-and-sew-solid"
                className="mx-8 border-b py-2 text-base font-normal"
              >
                Half Sleeve Cut & Sew T-Shirt
              </Link>

              <Link
                to="/polo-t-shirt"
                className="mx-8 border-b py-2 text-base font-normal"
              >
                Premium Lascot Polo T-Shirts
              </Link>
            </div>
          </li>

          <li className="border-b py-2 px-3 hover:bg-[#e8e8e7]">
            <div className="flex cursor-pointer justify-between ">
              <Link to="/" className="text-sm font-semibold">
                KID'S & BOY'S COLLECTION
              </Link>

              <img
                src="https://res.cloudinary.com/du3oueesv/image/upload/v1662729992/shopping%20cart/polo%20t%20shirts/product%20card%20image/Mask_group_1_mkkawx.png"
                alt="down arrow icon"
                className="down-arrow w-6 cursor-pointer"
                onClick={rotateIcon}
              />
            </div>
            <div className="child-sidenav flex flex-col">
              <Link
                to="/half-sleeve-t-shirt"
                className="mx-8 border-b py-2 text-base font-normal"
              >
                Half Sleeve T-Shirt
              </Link>
            </div>
          </li>

          <li className="flex justify-between border-b p-3">
            <Link to="/" className="text-sm font-semibold">
              SUNNAH ESSENTIAL
            </Link>

            <img
              src="https://res.cloudinary.com/du3oueesv/image/upload/v1662729992/shopping%20cart/polo%20t%20shirts/product%20card%20image/Mask_group_1_mkkawx.png"
              alt="down arrow icon"
              className="down-arrow w-6 cursor-pointer"
              onClick={rotateIcon}
            />
          </li>

          <li className="flex justify-between border-b p-3">
            <Link to="/" className="text-sm font-semibold">
              FABRIC MASK
            </Link>

            <img
              src="https://res.cloudinary.com/du3oueesv/image/upload/v1662729992/shopping%20cart/polo%20t%20shirts/product%20card%20image/Mask_group_1_mkkawx.png"
              alt="down arrow icon"
              className="down-arrow w-6 cursor-pointer"
              onClick={rotateIcon}
            />
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideNav;
