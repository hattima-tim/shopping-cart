import { Link } from "react-router-dom";

function ProductCards({ products }) {
  return (
    <div className="lg:flex lg:justify-center">
      <div className="productCards justify-evenly md:justify-evenly lg:mx-20 lg:w-11/12 lg:justify-start lg:gap-4">
        {products.map((product, index) => (
          <div key={index} className="productCard mb-7 w-40 md:w-60 lg:w-72">
            <div className="productCardImg">
              <Link to={`/product/${product.pathName}`}>
                <img src={product.img} alt={product.name} />
              </Link>
            </div>
            <div className="productCard__info pt-2 text-sm text-[#565656]">
              <h3>{product.name}</h3>
              <p className="font-bold text-black">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCards;
