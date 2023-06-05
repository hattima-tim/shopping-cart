import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import RouteSwitch from "./components/RouteSwitch";
import store from "./app/store";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root not found.");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouteSwitch />
    </Provider>
  </React.StrictMode>
);
