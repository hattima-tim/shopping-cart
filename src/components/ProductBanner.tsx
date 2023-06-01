import { Link } from "react-router-dom";

type ProductBannerProps = {
  src: string;
  alt: string;
  productCategoryHomePageLink?: string | null;
  showViewCollectionButton?: boolean;
};

const ProductBanner = ({
  src,
  alt,
  productCategoryHomePageLink = null,
  showViewCollectionButton = true,
}: ProductBannerProps) => {
  return (
    <div className="relative mx-4 my-4 lg:mx-20">
      <img className="" src={src} alt={alt}></img>

      {showViewCollectionButton && productCategoryHomePageLink !== null && (
        <Link
          to={productCategoryHomePageLink}
          className="absolute left-1/2 top-1/2 mt-4 -translate-x-1/2 transform border-2 border-black px-4 py-1 text-[.5rem] font-bold text-black md:text-xs md:font-medium lg:text-xs lg:font-medium"
        >
          VIEW COLLECTION {"> >"}
        </Link>
      )}
    </div>
  );
};

export default ProductBanner;
