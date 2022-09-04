import { Link } from "react-router-dom";

const ProductBanner = ({ src, alt, productPageLink }) => {
  return (
    <div className="relative my-4 mx-4 lg:mx-20">
      <img className="" src={src} alt={alt}></img>

      <Link
        to={productPageLink}
        className="absolute top-1/2 left-1/2 mt-4 -translate-x-1/2 transform border-2 border-black py-1 px-4 text-[.5rem] font-bold text-black md:text-xs md:font-medium lg:text-xs lg:font-medium"
      >
        VIEW COLLECTION {"> >"}
      </Link>
    </div>
  );
};

export default ProductBanner;
