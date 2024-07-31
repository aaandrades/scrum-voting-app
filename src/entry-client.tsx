import "./styles.css";
import ReactDOM from "react-dom/client";
import App from "./app";
import SocketProvider from "./Context/Index";

ReactDOM.hydrateRoot(
  document.getElementById("app") as HTMLElement,
  <SocketProvider>
    <App />
  </SocketProvider>
);
