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
