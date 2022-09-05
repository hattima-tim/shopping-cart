import { Link } from "react-router-dom";
import "./App.css";
import ProductSlider from "./components/ProductSlider";
import ProductBanner from "./components/ProductBanner";
import getAllHalfSleeveDawaTShirtsData from "./components/products/halfSleeveDawah/productsData";

function App() {
  const firstHalfOfDawahTShirts = getAllHalfSleeveDawaTShirtsData().slice(0, 5);
  const secondHalfOfDawahTShirts = getAllHalfSleeveDawaTShirtsData().slice(
    5,
    10
  );
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

      <ProductSlider products={firstHalfOfDawahTShirts} />
      <ProductSlider products={secondHalfOfDawahTShirts} />
    </div>
  );
}

export default App;
