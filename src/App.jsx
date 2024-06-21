/**
 * File: App.jsx
 * Type: JavaScript
 * Author: mathteixeira55
 * Description: Main application component that includes the Navbar and ChatInterface components.
 * Date: 2024-06-18
 * License: MIT
 * Version: 1.0
 */

import React from "react";
import ChatInterface from "./components/ChatInterface";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <ChatInterface />
    </div>
  );
}

export default App;
