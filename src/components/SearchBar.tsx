import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import getAllHalfSleeveDawaTShirtsData from "../productsData/halfSleeveDawah/productsData";
import getAllHalfSleeveRegularTShirtsData from "../productsData/halfSleeveRegular/productsData";
import getAllPoloTShirtsData from "../productsData/poloTShirts/productsData";
import uniqid from "uniqid";
import { Product } from "../productsData/productsData";

function SearchBar() {
  const halfSleeveDawahTShirts = getAllHalfSleeveDawaTShirtsData();
  const halfSleeveRegularTShirts = getAllHalfSleeveRegularTShirtsData();
  const poloTShirts = getAllPoloTShirtsData();
  const allProducts = [
    ...halfSleeveDawahTShirts,
    ...halfSleeveRegularTShirts,
    ...poloTShirts,
  ];
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const [onSmallScreen, setOnSmallScreen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setOnSmallScreen(true);
    } else {
      setOnSmallScreen(false);
    }
  }, []);

  const [showSearchPage, setShowSearchPage] = useState(false);
  const searchResultContainer = useRef(null);

  const closeSearchPageOnCloseBtnClick = () => {
    setShowSearchPage(false);
  };

  const closeSearchPageOnBodyClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    return target.nodeName === "INPUT" ? true : setShowSearchPage(false);
  };

  useEffect(() => {
    if (showSearchPage) {
      document.body.addEventListener("click", closeSearchPageOnBodyClick);
    } else {
      document.body.removeEventListener("click", closeSearchPageOnBodyClick);
    }
  }, [showSearchPage]);

  return (
    <div
      data-testid="searchContainer"
      {...(showSearchPage
        ? { className: "fixed left-0 bottom-0 w-full h-full bg-gray-100 z-50" }
        : { className: "search-bar ml-[10px]" })}
    >
      <div className="relative">
        <input
          onChange={search}
          type="text"
          placeholder="Search"
          role="searchbox"
          {...(showSearchPage
            ? {
                className:
                  "w-full h-14 pl-8 pr-10 text-lg focus:outline-none focus:shadow-outline border border-gray-300 bg-white",
              }
            : {
                className:
                  "hidden w-80 rounded-full bg-[#e9e9e9] p-2 text-sm lg:block",
              })}
        />
        <img
          src="https://res.cloudinary.com/du3oueesv/image/upload/v1663124810/shopping%20cart/1890px-Vector_search_icon.svg_odyv9y.png"
          alt="searchIcon"
          {...(onSmallScreen && {
            onClick: (e) => {
              setShowSearchPage(true);
              e.stopPropagation();
            },
          })}
          {...(showSearchPage
            ? {
                className: "h-4 w-4 top-5 left-2 absolute",
              }
            : {
                className:
                  "h-4 cursor-pointer w-4 lg:absolute lg:right-2.5 lg:top-[10px]",
              })}
        />
        {showSearchPage && (
          <div
            onClick={closeSearchPageOnCloseBtnClick}
            className="absolute right-2.5 top-2 cursor-pointer text-3xl"
          >
            &times;
          </div>
        )}
      </div>
      <div
        ref={searchResultContainer}
        className="search-results absolute z-10 max-h-[100vh] w-full overflow-auto bg-white lg:w-80"
      >
        {searchResults.map((product) => {
          return (
            <Link
              key={uniqid()}
              data-testid="search-result"
              to={`${product.fullPath}`}
              className="flex gap-2 p-3 hover:bg-[#e9e9e9]"
            >
              <img
                src={product.imagesForProductPage[0]}
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
