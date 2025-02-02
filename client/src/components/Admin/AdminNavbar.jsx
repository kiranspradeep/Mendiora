import React, { useState } from "react";
import "./AdminNavbar.css"; // Updated to import the correct CSS file
import logo from "../../assets/logo.webp";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  return (
    <header className="admin-navbar">
      <div className="admin-navbar-logo">
        <img src={logo} alt="Logo" />
        <span>Medioraa</span>
      </div>
      <nav className={`admin-navbar-links ${menuActive ? "active" : ""}`}>
        <Link to="/organizer">Organizer</Link>
        <Link to="/venue">Venues</Link>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`admin-navbar-menu ${menuActive ? "active" : ""}`}>
        <Link to="#organizer">Organizer</Link>
        <Link to="#venues">Venues</Link>
      </div>
    </header>
  );
};

export default AdminNavbar;
