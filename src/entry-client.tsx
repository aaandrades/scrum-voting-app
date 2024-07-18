import "./styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

ReactDOM.hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
