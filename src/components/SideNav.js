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

          <li className="flex justify-between border-b p-3 ">
            <Link to="/" className="text-sm font-semibold">
              MEN'S COLLECTION
            </Link>
          </li>

          <li className="flex justify-between border-b p-3">
            <Link to="/" className="text-sm font-semibold ">
              KID'S & BOY'S COLLECTION
            </Link>
          </li>

          <li className="flex justify-between border-b p-3">
            <Link to="/" className="text-sm font-semibold">
              SUNNAH ESSENTIAL
            </Link>
          </li>

          <li className="flex justify-between border-b p-3">
            <Link to="/" className="text-sm font-semibold">
              FABRIC MASK
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideNav;
