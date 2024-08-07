/**
 * File: Navbar/index.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: Main Navbar component for the React application.
 * Date: 2024-07-18
 * License: MIT
 * Version: 1.1.0
 */

import React from "react";
import NavbarBrand from "./NavbarBrand";
import NavItems from "./NavItems";

const Navbar = ({ tab }) => {
  return (
    <nav
      className={`navbar navbar-expand-sm bg-body-tertiary ${
        tab === "ideation" ? "" : "sticky-top"
      }`}
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavbarBrand />
        <div className="nav-tabs collapse navbar-collapse" id="navbarToggler">
          <NavItems currentTab={tab} />
          <button className="btn btn-outline-secondary">Sign in</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
