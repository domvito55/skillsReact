/**
 * File: Navbar/NavbarBrand.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: NavbarBrand component for the Navbar.
 * Date: 2024-06-18
 * License: MIT
 * Version: 1.0
 */

import React from "react";
import logo from "../../../assets/skillsladder-logo.png";
import styles from "./styles.module.css";

const NavbarBrand = () => (
  <a className="navbar-brand" href="/">
    <img
      src={logo}
      alt="SkillsLadder Logo"
      width="30"
      height="24"
      className={`d-inline-block align-text-top ${styles.logo}`}
    />
    SkillsLadder
  </a>
);

export default NavbarBrand;
