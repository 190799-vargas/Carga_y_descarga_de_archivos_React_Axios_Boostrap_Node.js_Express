import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Habilitar métricas solo en modo desarrollo
if (process.env.NODE_ENV === "development") {
  reportWebVitals(console.log);
}
