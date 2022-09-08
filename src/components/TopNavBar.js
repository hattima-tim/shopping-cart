import { Link } from "react-router-dom";
import "../styles/TopNavBar.css";

function TopNavBar() {
  return (
    <div
      id="top-nav-bar"
      className="align-center flex w-full items-center justify-center gap-4 bg-black p-5 text-white"
    >
      <Link to="/" className="text-sm font-medium text-[#f0f0f0]">
        HOME
      </Link>

      <div className="group relative flex items-center">
        <Link
          to="/"
          className="text-sm font-medium text-[#f0f0f0] hover:text-[#f0f0f0]"
        >
          MEN'S COLLECTION
        </Link>
        <svg
          className="my-0 mx-1 w-[.6rem] fill-[#9b9392]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>

        <div className="tooltip absolute flex gap-4 group-hover:visible">
          <div className="flex flex-col">
            <h2 className="m-0 border-b py-2 text-sm font-medium text-black">
              HALF SLEEVE T SHIRT
            </h2>

            <Link
              to="/half-sleeve-dawah-tshirts-for-men"
              className="m-0 border-b py-2 text-base"
            >
              Half Sleeve Dawah T-Shirt
            </Link>

            <Link
              to="/half-sleeve-regular-tshirts-for-men"
              className="m-0 border-b py-2 text-base"
            >
              Half Sleeve Regular T-Shirt
            </Link>

            <Link
              to="/half-sleeve-cut-and-sew-solid"
              className="m-0 border-b py-2 text-base"
            >
              Half Sleeve Cut & Sew T-Shirt
            </Link>

            <Link to="/polo-t-shirt" className="m-0 border-b py-2 text-base">
              Premium Lascot Polo T-Shirts
            </Link>
          </div>

          <div className="flex flex-col">
            <h2 className="m-0 border-b py-2 text-sm font-medium text-black">
              Polo T-Shirt
            </h2>
            <Link
              to="/solid-polo-t-shirt"
              className="m-0 border-b py-2 text-base"
            >
              Solid Polo T-Shirt
            </Link>
            <Link
              to="/round-neck-logo-t-shirt"
              className="m-0 border-b py-2 text-base"
            >
              Round Neck Logo Style
            </Link>
            <Link
              to="/cut-and-sew-logo-t-shirt"
              className="m-0 border-b py-2 text-base"
            >
              Cut & Sew Logo Style
            </Link>
          </div>

          <div className="flex flex-col">
            <h2 className="m-0 border-b py-2 text-sm font-medium text-black">
              Joggers Collection
            </h2>
            <Link to="/joggers" className="m-0 border-b py-2 text-base">
              Mash Joggers
            </Link>
          </div>
        </div>
      </div>

      <div className="group relative flex items-center">
        <Link
          to="/"
          className="text-sm font-medium text-[#f0f0f0] hover:text-[#f0f0f0]"
        >
          KID'S & BOY'S COLLECTION
        </Link>
        <svg
          className="my-0 mx-1 w-[.6rem] fill-[#9b9392]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>

        <div className="tooltip absolute flex gap-4 group-hover:visible">
          <div className="flex flex-col">
            <h2 className="m-0 border-b py-2 text-sm font-medium text-black">
              HALF SLEEVE T SHIRT
            </h2>

            <Link
              to="/half-sleeve-dawah-tshirts-for-men"
              className="m-0 border-b py-2 text-base"
            >
              Half Sleeve Dawah T-Shirt
            </Link>
          </div>
        </div>
      </div>

      <div className="group relative flex items-center">
        <Link
          to="/"
          className="text-sm font-medium text-[#f0f0f0] hover:text-[#f0f0f0]"
        >
          SUNNAH ESSENTIAL
        </Link>
        <svg
          className="my-0 mx-1 w-[.6rem] fill-[#9b9392]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>

        <div className="tooltip absolute flex gap-4 group-hover:visible">
          <div className="flex flex-col">
            <h2 className="m-0 border-b py-2 text-sm font-medium text-black">
              SUNNAH ESSENTIAL
            </h2>

            <Link
              to="/perfume"
              className="m-0 border-b py-2 text-base"
            >
              Perfume
            </Link>

            <Link
              to="/combo-perfume-box"
              className="m-0 border-b py-2 text-base"
            >
              Combo Perfume Box
            </Link>

            <Link
              to="/prayermat"
              className="m-0 border-b py-2 text-base"
            >
              Prayermat
            </Link>
          </div>
        </div>
      </div>

      <div id="fabric-mask" className="flex items-center">
        <Link to="/fabric-mask" className="text-sm font-medium text-[#f0f0f0]">
          FABRIC MASK
        </Link>
      </div>
    </div>
  );
}

export default TopNavBar;
