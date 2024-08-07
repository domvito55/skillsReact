/**
 * File: main.jsx
 * Type: JavaScript
 * Author: mathteixeira55
 * Description: Entry point for the React application.
 * Date: 2024-06-18
 * License: MIT
 * Version: 1.1.0
 */

// ### Imports ###
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/global.css";

import Root from "./routes/root";
import ErrorPage from "./error-page";
import PageBP from "./components/PageBP";
import PreviewPageBP from "./components/PageBP/PreviewPageBP";
import PageBPRouter from "./routes/pageBPRouter";
// ### end Imports ###

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "pageBP",
    element: <PageBPRouter />,
    errorElement: <ErrorPage />,
    // Children routes are loaded into the Outlet component in the parent route
    children: [
      {
        // This is the default route for the PageBP component
        // it is using absolute path because, I can't use / as nested route
        path: "/pageBP",
        element: <PageBP />,
      },
      {
        // This route is for the preview page of the 1-page BP
        // it is using relative path
        path: "preview",
        element: <PreviewPageBP />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
