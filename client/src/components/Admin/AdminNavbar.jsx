import React, { useState } from "react";
import "./AdminNavbar.css"; // Updated to import the correct CSS file
import logo from "../../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom"; // Changed useHistory to useNavigate

const AdminNavbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("authToken"); // or clear sessionStorage or cookies if used
    navigate("/adminlogin"); // Redirect to login page
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
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
          {/* Logout button here */}
          <button onClick={logout} className="logout-button">Logout</button>
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
          {/* Logout button here in mobile menu */}
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      </header>
    </>
  );
};

export default AdminNavbar;
