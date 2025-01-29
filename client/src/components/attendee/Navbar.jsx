import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.webp";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
        <span>Medioraa</span>
      </div>
      <nav className={`navbar-links ${menuActive ? "active" : ""}`}>
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#services">Services</a>
        <a href="#venues">Venues</a>
        <a href="/signupatt">Signup</a>
        <a href="#contact">Contact Us</a>
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
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#services">Services</a>
        <a href="#venues">Venues</a>
        <a href="/signup">Signup</a>
        <a href="#contact">Contact Us</a>
      </div>
    </header>
  );
};
// ggggggggg 
// gfdgdhd

export default Navbar;