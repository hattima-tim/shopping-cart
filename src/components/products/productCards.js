import { Link } from "react-router-dom";

function ProductCards({ products }) {
  return (
    <div className="productCards ">
      {products.map((product, index) => (
        <div className="productCard w-40 mb-7" key={index}>
          <div className="productCardImg">
            <Link to={`/product/${product.pathName}`}>
              <img src={product.img} alt={product.name}/>
            </Link>
          </div>
          <div className="productCard__info text-sm pt-2 text-[#565656]">
            <h3>{product.name}</h3>
            <p className="font-bold text-black">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCards;
