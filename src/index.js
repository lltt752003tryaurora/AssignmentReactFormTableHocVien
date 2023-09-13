import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//Set up Redux
import { Provider } from "react-redux";
import { store } from "./Redux/configStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
