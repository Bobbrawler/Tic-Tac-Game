import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

const Root = ReactDOM.createRoot(
  document.getElementById("main") as HTMLElement
);

Root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


