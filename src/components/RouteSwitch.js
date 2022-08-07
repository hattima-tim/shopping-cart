import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import HalfSleeveCutTShirts from "./products/halfSleeveCutTShirts";

function RouteSwitch() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/half-sleeve-cut-and-sew-solid"
          element={<HalfSleeveCutTShirts />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
