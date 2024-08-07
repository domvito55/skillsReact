/**
 * File: pageBPRouter.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: Router for the PageBP component.
 * Date: 2024-07-29
 * License: MIT
 * Version: 1.0.0
 */

// ### Imports ###
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
// ### end Imports ###

export default function PageBPRouter() {
  const [streamData, setStreamData] = useState("");
  const [error, setError] = useState(null);

  return (
    <div>
      <Navbar tab="PageBP" />
      {/* children path defined on main will be loaded into special component
       Outlet */}
      <Outlet
      // context is passed to the children routes
      // this is useful for sharing data between routes
      // use the hook useOutletContext to access the context
        context={{
          streamData,
          setStreamData,
          error,
          setError,
        }}
      />
    </div>
  );
}
