/**
 * File: Navbar.jsx
 * Type: JavaScript
 * Author: mathteixeira55
 * Description: Navbar component for the React application.
 * Date: 2024-06-18
 * License: MIT
 * Version: 1.0
 */

import React from "react";
import logo from "../assets/skillsladder-logo.png";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">
          <img
            src={logo}
            alt="SkillsLadder Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
            style={{ marginRight: "10px" }}
          />
          SkillsLadder
        </a>
        <div
          className=" nav-tabs collapse navbar-collapse"
          id="navbarTogglerDemo03"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Ideation
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                1-Page BP
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Full BP
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Education
              </a>
            </li>
          </ul>
          <button className="btn btn-outline-secondary">Sign in</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
