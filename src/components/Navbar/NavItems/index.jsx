/**
 * File: Navbar/NavItems.jsx
 * Type: React Component
 * Author: mathteixeira55
 * Description: NavItems component for the Navbar.
 * Date: 2024-06-18
 * License: MIT
 * Version: 1.0
 */

import React from "react";

const navItems = [
  { name: "Ideation", href: "/", id: "ideation" },
  { name: "1-Page BP", href: "/pageBP", id: "PageBP" },
  { name: "Full BP", href: "#", id: "fullBP" },
  { name: "Education", href: "#", id: "education" },
];

const NavItems = ({ currentTab }) => (
  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    {navItems.map((item) => (
      <li key={item.id} className="nav-item">
        <a
          className={`nav-link ${currentTab === item.id && "active"}`}
          {...(currentTab === item.id && { "aria-current": "page" })}
          href={item.href}
        >
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

export default NavItems;