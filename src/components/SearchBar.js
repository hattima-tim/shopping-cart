import { useState } from "react";
import getAllHalfSleeveDawaTShirtsData from "./products/halfSleeveDawah/productsData";
import getAllHalfSleeveRegularTShirtsData from "./products/halfSleeveRegular/productsData";
import getAllPoloTShirtsData from "./products/poloTShirts/productsData";

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
  return (
    <div className="search-bar">
      <div className="relative">
        <input
          onChange={search}
          type="text"
          placeholder="Search"
          className="w-80 rounded-full bg-[#e9e9e9] p-2 text-sm"
        />
        <img
          src="https://res.cloudinary.com/du3oueesv/image/upload/v1663124810/shopping%20cart/1890px-Vector_search_icon.svg_odyv9y.png"
          alt="search"
          className="absolute right-2.5 top-[10px] h-4 w-4"
        />
      </div>
      <div className="search-results absolute z-10 w-80 bg-white">
        {searchResults.map((product) => {
          return (
            <div className="flex gap-2 p-3 hover:bg-[#e9e9e9]">
              <img
                src={product.imgForProductPage}
                alt={product.name}
                className="h-10 w-10 rounded-full"
              />
              <p className="flex-1 text-sm">{product.name}</p>
              <p className="text-sm text-black">{product.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SearchBar;
