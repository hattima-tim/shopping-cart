import { useRef, useState } from "react";
import PropTypes from "prop-types";

function ImageMagnifier({ src, alt, zoomLevel = 1.7 }) {
  const magnifierWidth = useRef(0);
  const magnifierHeight = useRef(0);

  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  return (
    <div className="relative w-full overflow-hidden lg:flex-1">
      <img
        src={src}
        onMouseEnter={(e) => {
          // update image size and turn-on magnifier
          const elem = e.currentTarget;
          const { width, height } = elem.getBoundingClientRect();

          magnifierWidth.current = width * 2;
          magnifierHeight.current = height * 2;

          setSize([width, height]);

          setShowMagnifier(true);
        }}
        onMouseMove={(e) => {
          // calculate cursor position on the image
          const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
          const y = e.clientY - e.target.getBoundingClientRect().top;

          setXY([x, y]);
        }}
        onMouseLeave={() => {
          // close magnifier
          setShowMagnifier(false);
        }}
        alt={alt}
      />

      <div
        style={{
          display: showMagnifier ? "" : "none",
          position: "absolute",

          // prevent maginier blocks the mousemove event of img
          pointerEvents: "none",

          // set size of magnifier
          height: `${magnifierHeight.current}px`,
          width: `${magnifierWidth.current}px`,

          // move element center to cursor pos
          top: `${y - magnifierHeight.current / 2}px`,
          left: `${x - magnifierWidth.current / 2}px`,
          opacity: "1", // reduce opacity so you can verify position

          backgroundImage: `url('${src}')`,
          backgroundRepeat: "no-repeat",

          //calculate zoomed image size
          backgroundSize: `${imgWidth * zoomLevel}px ${
            imgHeight * zoomLevel
          }px`,

          //calculete position of zoomed image.
          backgroundPositionX: `${
            -x * zoomLevel + magnifierWidth.current / 2
          }px`,
          backgroundPositionY: `${
            -y * zoomLevel + magnifierHeight.current / 2
          }px`,
        }}
      ></div>
    </div>
  );
}

ImageMagnifier.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  zoomLevel: PropTypes.number,
};
export default ImageMagnifier;
