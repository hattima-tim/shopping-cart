import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/mainBannerCarousel.css";

function MainBannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const showNextImage = () => {
    setActiveIndex(1);
  };
  const showPrevImage = () => {
    setActiveIndex(0);
  };

  const navArrowContainer = useRef(null);
  const showNavArrows = () => {
    navArrowContainer.current.style.display = "block";
  };
  const hideNavArrows = () => {
    navArrowContainer.current.style.display = "none";
  };

  let currentImageNumberInSlider = useRef(0);
  useEffect(() => {
    let intervalId=setInterval(() => {
      if (currentImageNumberInSlider.current === 0) {
        setActiveIndex(1);
        currentImageNumberInSlider.current = 1;
      } else if(currentImageNumberInSlider.current===1){
        setActiveIndex(0);
        currentImageNumberInSlider.current = 0;
      }
    }, 5000)
    return () => {
      clearInterval(intervalId);
    }
  },[])

  return (
    <div
      id="carousel_container"
      onMouseOver={showNavArrows}
      onMouseLeave={hideNavArrows}
    >
      {activeIndex === 0 && (
        <>
          <div id="carousel_item_1" className="carousel_item">
            <img
              src="https://res.cloudinary.com/du3oueesv/image/upload/v1659705449/shopping%20cart/Rectangle_1_yxbsci.png"
              alt="shop_image"
            ></img>
            <ul className="nav_dots">
              <li className="dot" style={{ backgroundColor: "#fff" }}></li>
              <li className="dot" onClick={showNextImage}></li>
            </ul>
          </div>

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
        </>
      )}
      {activeIndex === 1 && (
        <div id="carousel_item_2" className="carousel_item">
          <img
            src="https://res.cloudinary.com/du3oueesv/image/upload/v1659707440/shopping%20cart/Rectangle_loxvc7.png"
            alt="white_background"
          ></img>

          <ul className="nav_dots">
            <li className="dot" onClick={showPrevImage}></li>
            <li className="dot" style={{ backgroundColor: "#fff" }}></li>
          </ul>

          <Link to='/dress-for-men' className="text">
            <h4>USE FLAT5 TO GET 5% OFF</h4>
          </Link>

          <button className="shop_all_btn">SHOP ALL {"> >"}</button>
        </div>
      )}
      <div id="nav_arrow" ref={navArrowContainer}>
        <button id="prev_arrow" onClick={showPrevImage}>
          {"<"}
        </button>
        <button id="next_arrow" onClick={showNextImage}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default MainBannerCarousel;
