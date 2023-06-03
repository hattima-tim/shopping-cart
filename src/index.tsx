import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouteSwitch from "./components/RouteSwitch";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root not found.");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RouteSwitch />
  </React.StrictMode>
);
