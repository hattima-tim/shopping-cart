import { Link } from "react-router-dom";
import "./App.css";
import ProductSlider from "./components/ProductSlider";
import ProductBanner from "./components/ProductBanner";
import getAllHalfSleeveDawaTShirtsData from "./productsData/halfSleeveDawah/productsData";
import getAllHalfSleeveRegularTShirtsData from "./productsData/halfSleeveRegular/productsData";
import getAllPoloTShirtsData from "./productsData/poloTShirts/productsData";

function App() {
  const firstHalfOfAllDawahTShirts = getAllHalfSleeveDawaTShirtsData().slice(
    0,
    7
  );
  const secondHalfOfAllDawahTShirts = getAllHalfSleeveDawaTShirtsData().slice(
    7,
    14
  );

  const firstHalfOfAllRegularTShirts =
    getAllHalfSleeveRegularTShirtsData().slice(0, 8);
  const secondHalfOfAllRegularTShirts =
    getAllHalfSleeveRegularTShirtsData().slice(8, 16);

  const poloTShirts = getAllPoloTShirtsData();
  // these will be used to create two product sliders

  return (
    <div className="App">
      <div className="relative">
        <img
          className="main_carousel_image h-[250px] md:h-[505px] lg:h-[505px]"
          src="https://res.cloudinary.com/du3oueesv/image/upload/v1659705449/shopping%20cart/Rectangle_1_yxbsci.png"
          alt="shop_image"
        ></img>
        <div className="overlay h-full md:h-full lg:h-full"></div>

        <div className="text text-base md:text-2xl lg:text-2xl">
          <h4>SUMMER ARRIVAL</h4>
          <h4>NEW CUT & SEW T-SHIRTS</h4>
        </div>

        <Link
          to="/half-sleeve-cut-and-sew-solid"
          className="view_collection_link top-[58%] mt-2 px-5 py-1 text-xs md:top-[52%] md:mt-2 md:text-base lg:top-[52%] lg:text-base"
        >
          VIEW COLLECTION {"> >"}
        </Link>
      </div>

      <ProductBanner
        src="https://res.cloudinary.com/du3oueesv/image/upload/v1662269049/shopping%20cart/half%20sleeve%20dawa%20t%20shirts/dawah-banner-scaled_gpzrjy.jpg"
        alt="Half Sleeve Dawa T-Shirts"
        productCategoryHomePageLink="/half-sleeve-dawah-tshirts-for-men"
      />
      <ProductSlider
        products={firstHalfOfAllDawahTShirts}
        productType="half-sleeve-dawah-tshirts-for-men"
      />
      <ProductSlider
        products={secondHalfOfAllDawahTShirts}
        productType="half-sleeve-dawah-tshirts-for-men"
      />

      <ProductBanner
        src="https://res.cloudinary.com/du3oueesv/image/upload/v1662435399/shopping%20cart/half%20sleeve%20regular/regular-banner-scaled_k1is6b.jpg"
        alt="HALF SLEEVE REGULAR T-SHIRTS"
        productCategoryHomePageLink="/half-sleeve-regular-tshirts-for-men"
      />
      <ProductSlider
        products={firstHalfOfAllRegularTShirts}
        productType="half-sleeve-regular-tshirts-for-men"
      />
      <ProductSlider
        products={secondHalfOfAllRegularTShirts}
        productType="half-sleeve-regular-tshirts-for-men"
      />

      <ProductBanner
        src="https://res.cloudinary.com/du3oueesv/image/upload/v1662471920/shopping%20cart/polo%20t%20shirts/polo-web-banner-2-scaled_gxzb7g.jpg"
        alt="PREMIUM LAYCOST POLO T-SHIRT"
        showViewCollectionButton={false}
      />
      <ProductSlider products={poloTShirts} productType="polo-t-shirt" />
      <Link
        to="/polo-t-shirt"
        className="my-8 mx-auto block w-fit border-2 border-black py-2 px-8 text-sm font-semibold text-black hover:bg-black hover:text-white"
      >
        ALL POLO COLLECTION {"> >"}
      </Link>
    </div>
  );
}

export default App;
