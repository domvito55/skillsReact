/**
 * File: root.jsx
 * Type: JavaScript
 * Author: mathteixeira55
 * Description: Main application component that includes the Navbar and ChatInterface components.
 * Date: 2024-06-18
 * License: MIT
 * Version: 1.0
 */

import React from "react";
import Navbar from "../components/Navbar";
import ChatInterface from "../components/ChatInterface";

function Root() {
  return (
    <div>
      <Navbar tab="ideation"/>
      <ChatInterface />
    </div>
  );
}

export default Root;
