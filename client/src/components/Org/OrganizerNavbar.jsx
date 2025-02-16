import React, { useState } from "react";
import "./OrganizerNavbar.css";
import logo from "../../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";

const OrganizerNavbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // Check if organizer is logged in

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); // Redirect to homepage
    setMenuActive(false); // Close menu
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
          {isLoggedIn && <Link to="/adminNdOrg">Profile</Link>}
          {isLoggedIn && (
            <button className="organizer-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
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
          {isLoggedIn && <Link to="/organizer/profile">Profile</Link>}
          {isLoggedIn && (
            <button className="organizer-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default OrganizerNavbar;
