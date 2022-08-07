function ProductCards({ products }) {
  return (
    <div className="productCards">
      {products.map((product, index) => (
        <div className="productCard" key={index}>
          <div className="productImg">
            <img src={product.img} alt={product.name} />
          </div>
          <div className="productCard__info">
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCards;
