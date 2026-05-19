import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#0f172a",
          color: "#fff",
          border: "1px solid #1e293b",
        },
      }}
    />

    <App />

  </React.StrictMode>
);