/**
 * File: LoadingMessage/index.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: Component for rendering a loading message bubble in the chat interface.
 * Date: 2024-07-19
 * License: MIT
 * Version: 1.0
 */
import React from "react";

const LoadingSymbol = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="spinner-grow text-light mr-4"
          style={{ width: "0.6em", height: "0.6em", marginRight: "0.3em" }}
          role="status"
        />
      ))}
    </>
  );
};

export default LoadingSymbol;
