import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { MovieAppProvider } from "./context/store";
import App from "./App";
import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <MovieAppProvider>
        <App />
      </MovieAppProvider>
    </Router>
  </React.StrictMode>
);
