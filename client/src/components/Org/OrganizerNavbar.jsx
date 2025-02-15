import React, { useState } from "react";
import "./OrganizerNavbar.css";
import logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import OrganizerDashboard from "../../pages/Org&Ad/OrganizerDashboard";

const OrganizerNavbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <>
    <header className="organizer-navbar">
      <div className="organizer-navbar-logo">
        <img src={logo} alt="Logo" />
        <span>Medioraa</span>
      </div>
      <nav className={`organizer-navbar-links ${menuActive ? "active" : ""}`}>
        <Link to="/form">Add Venue</Link>
        <Link to="/eventForm">Add Event</Link>
        <Link to="/venuePayments">Venue Orders</Link>
        <Link to="/adminNdOrg">Profile</Link>

      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`organizer-navbar-menu ${menuActive ? "active" : ""}`}>
        <Link to="/organizer/add-venue">Add Venue</Link>
        <Link to="/organizer/orders">Orders</Link>
        <Link to="/venuePayments">Venue Orders</Link>
        <Link to="/organizer/profile">Profile</Link>
      </div>
    </header>
    </>
  );
};

export default OrganizerNavbar;
