import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAllHalfSleeveDawaTShirtsData from "./products/halfSleeveDawah/productsData";
import getAllHalfSleeveRegularTShirtsData from "./products/halfSleeveRegular/productsData";
import getAllPoloTShirtsData from "./products/poloTShirts/productsData";
import uniqid from "uniqid";

function SearchBar() {
  const halfSleeveDawahTShirts = getAllHalfSleeveDawaTShirtsData();
  const halfSleeveRegularTShirts = getAllHalfSleeveRegularTShirtsData();
  const poloTShirts = getAllPoloTShirtsData();
  const allProducts = [
    ...halfSleeveDawahTShirts,
    ...halfSleeveRegularTShirts,
    ...poloTShirts,
  ];
  const [searchResults, setSearchResults] = useState([]);
  const search = (event) => {
    const searchTerm = event.target.value;
    if (searchTerm !== "") {
      const results = allProducts.filter((product) => {
        return product.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      document.body.addEventListener("click", () => {
        setSearchResults([]);
      });
    } else {
      document.body.removeEventListener("click", () => {
        setSearchResults([]);
      });
    }
  }, [searchResults]);

  return (
    <div className="search-bar ml-[10px]">
      <div className="relative">
        <input
          onChange={search}
          type="text"
          placeholder="Search"
          className="hidden w-80 rounded-full bg-[#e9e9e9] p-2 text-sm lg:block"
        />
        <img
          src="https://res.cloudinary.com/du3oueesv/image/upload/v1663124810/shopping%20cart/1890px-Vector_search_icon.svg_odyv9y.png"
          alt="search"
          className="h-4 w-4 lg:absolute lg:right-2.5 lg:top-[10px]"
        />
      </div>
      <div className="search-results absolute z-10 w-80 bg-white">
        {searchResults.map((product) => {
          return (
            <Link
              key={uniqid()}
              to={`${product.breadCrumbs[1].path}/product/${product.pathName}`}
              className="flex gap-2 p-3 hover:bg-[#e9e9e9]"
            >
              <img
                src={product.imgForProductPage}
                alt={product.name}
                className="h-10 w-10 rounded-full"
              />
              <p className="flex-1 text-sm">{product.name}</p>
              <p className="text-sm text-black">{product.price}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;
