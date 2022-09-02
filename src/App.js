import { Link } from "react-router-dom";
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="relative">
        <img
          className="main_carousel_image"
          src="https://res.cloudinary.com/du3oueesv/image/upload/v1659705449/shopping%20cart/Rectangle_1_yxbsci.png"
          alt="shop_image"
        ></img>
        <div className="overlay"></div>

        <div className="text">
          <h4>SUMMER ARRIVAL</h4>
          <h4>NEW CUT & SEW T-SHIRTS</h4>
        </div>

        <Link
          to="/half-sleeve-cut-and-sew-solid"
          className="view_collection_link"
        >
          VIEW COLLECTION {"> >"}
        </Link>
      </div>
    </div>
  );
}

export default App;
