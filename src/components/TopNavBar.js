import { Link } from "react-router-dom";

function TopNavBar() {
  return (
    <div
      id="top-nav-bar"
      className="align-center flex w-full items-center justify-center gap-4 bg-black p-5 text-white"
    >
      <Link to="/" className="text-sm font-medium text-[#f0f0f0]">
        HOME
      </Link>

      <div id="mens-collection" className="relative flex items-center">
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
      </div>

      <div id="Kid’s-&-Boy’s-Collection" className="flex items-center">
        <Link to="/" className="text-sm font-medium text-[#f0f0f0]">
          KID'S & BOY'S COLLECTION
        </Link>
        <svg
          className="my-0 mx-1 w-[.6rem] fill-[#9b9392]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>
      </div>

      <div id="sunnah-essential" className="flex items-center">
        <Link to="/" className="text-sm font-medium text-[#f0f0f0]">
          SUNNAH ESSENTIAL
        </Link>
        <svg
          className="my-0 mx-1 w-[.6rem] fill-[#9b9392]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
        </svg>
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
