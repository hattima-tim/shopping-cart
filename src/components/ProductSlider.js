import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "../styles/ProductSlider.css";

function ProductSlider({ products, productType }) {
  const handleMouseOver = () => {
    const arrows = document.querySelectorAll(".splide__arrow");
    arrows.forEach((arrow) => {
      arrow.style.display = "block";
    });
  };

  const handleMouseLeave = () => {
    const arrows = document.querySelectorAll(".splide__arrow");
    arrows.forEach((arrow) => {
      arrow.style.display = "none";
    });
  };

  return (
    <Splide
      className="mx-4 my-8 overflow-hidden lg:mx-20"
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      options={{
        type: "loop",
        gap: ".9rem",
        autoplay: true,
        pauseOnHover: true,
        resetProgress: false,
        drag: true,
        autoWidth: true,
        pagination: false,
        perMove: 2,
        easing: "ease-in-out",
        speed: 500,
        interval: 5000,
      }}
    >
      {products.map((product, index) => (
        <SplideSlide
          key={index}
          className="productCard mb-7 w-40 flex-none md:w-64 lg:w-[18.5rem]"
        >
          <div className="productCardImg">
            <Link to={`/${productType}/product/${product.pathName}`}>
              <img src={product.imgForProductCard} alt={product.name} />
            </Link>
          </div>

          <div className="productCard__info pt-2 text-sm text-[#565656]">
            <h3>{product.name}</h3>
            <p className="font-bold text-black">{product.price}</p>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  );
}

export default ProductSlider;
