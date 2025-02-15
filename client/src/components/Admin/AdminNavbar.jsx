import React, { useState } from "react";
import "./AdminNavbar.css"; // Updated to import the correct CSS file
import logo from "../../assets/logo.webp";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import DashboardGraph from "../../pages/Admin/DashboardGraph";

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
    <>
    <header className="admin-navbar">
      <div className="admin-navbar-logo">
        <img src={logo} alt="Logo" />
        <span>Medioraa</span>
      </div>
      <nav className={`admin-navbar-links ${menuActive ? "active" : ""}`}>
        <Link to="/organizer">Organizer</Link>
        <Link to="/venue">Venues</Link>
        <Link to="/viewevent">Events</Link>
        <Link to="/approvedorg">Approved Organizer</Link>
        <Link to="/venuePayments">Venue Orders</Link>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`admin-navbar-menu ${menuActive ? "active" : ""}`}>
        <Link to="/organizer">Organizer</Link>
        <Link to="/venue">Venues</Link>
        <Link to="/viewevent">Events</Link>
        <Link to="/approvedorg">Approved Organizer</Link>
        <Link to="/venuePayments">Venue Orders</Link>
      </div>
    </header>
    <DashboardGraph/>
    </>
  );
};

export default AdminNavbar;
