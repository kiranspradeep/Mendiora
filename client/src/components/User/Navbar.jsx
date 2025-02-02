import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.webp";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [dropdownActive, setDropdownActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
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
        <Link to="#venues">Venues</Link>
        
        {/* Dropdown for Signup */}
        <div className="signup-dropdown" onClick={toggleDropdown}>
          <a href="#">Signup</a>
          {dropdownActive && (
            <div className="dropdown-menu">
              <Link to="/signupuser">Signup as User</Link>
              <Link to="/signuporg">Signup as Organizer</Link>
            </div>
          )}
        </div>
          <Link to="/contactus">Contact Us</Link>
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
        <Link to="/#venues">Venues</Link>

        {/* Dropdown for Signup in mobile menu */}
        <div className="signup-dropdown" onClick={toggleDropdown}>
          <a href="#">Signup</a>
          {dropdownActive && (
            <div className="dropdown-menu">
              <a href="/signupuser">Signup as User</a>
              <a href="/signuporg">Signup as Organizer</a> {/* Updated link */}
            </div>
          )}
        </div>
        <Link to="/contactus">Contact Us</Link>  
      </div>
    </header>
  );
};

export default Navbar;
