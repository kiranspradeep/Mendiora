import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.webp";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token"); // Check if user is logged in

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    navigate("/"); // Redirect to homepage
    window.location.reload(); // Reload page to update state
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
        <span>Medioraa</span>
      </div>
      <nav className={`navbar-links ${menuActive ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/#service">Service</Link>
        <Link to="/event">Events</Link>
        {isLoggedIn && <Link to="/profileuser">Profile</Link>}
        {!isLoggedIn && <Link to="/loginuser">Login</Link>} {/* Conditionally render login */}
        <Link to="/signupuser">Signup</Link>
        <Link to="/contactus">Contact Us</Link>
        {isLoggedIn && (
          <button className="navbar-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
      <div className="navbar-contact">
        <a href="tel:+912000058886">
          <FaPhoneAlt /> +912000058886
        </a>
        <a href="https://wa.link/ywfrnp" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp className="whatsapp-icon" />
        </a>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={`navbar-menu ${menuActive ? "active" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/aboutus">About Us</Link>
        <Link to="/#service">Services</Link>
        <Link to="/event">Events</Link>
        {isLoggedIn && <Link to="/profileuser">Profile</Link>}
        {!isLoggedIn && <Link to="/loginuser">Login</Link>}
        <Link to="/signupuser">Signup</Link>
        <Link to="/contactus">Contact Us</Link>
        {isLoggedIn && (
          <button className="navbar-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
