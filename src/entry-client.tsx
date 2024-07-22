import "./styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import SocketProvider from "./Context/Index";

ReactDOM.hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <React.StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </React.StrictMode>
);
