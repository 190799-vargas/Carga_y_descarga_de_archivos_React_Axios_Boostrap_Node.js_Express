import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./App.css";

import UploadFiles from "./components/uploadFilesComponent.js";

function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
    <div style={{ margin: "20px" }}>
      <h3>Victor Koder</h3>
      <h4>React Cargar y Subir Archivos</h4>
    </div>

    <UploadFiles />
  </div>
);
}

export default App;
