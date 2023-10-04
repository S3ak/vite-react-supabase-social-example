import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./root.js";
import { RouterProvider } from "@tanstack/react-router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* NOTE: We need to wrap our react app in the tanstack router */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
