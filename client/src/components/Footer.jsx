import React from 'react';
import './Footer.css'; // Link to the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo and Description */}
        <div className="footer-logo-section">
          <h2 className="footer-logo">Melodia Event Management</h2>
          <p>
            Planning a full event has never been easier! Melodia Event Management, an ISO 9001-2015 Certified Event
            Management Company, offers a wide range of services to make your events stress-free and memorable across Kerala.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="footer-social-icons">
            <a href="https://instagram.com" className="footer-icon" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://youtube.com" className="footer-icon" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="https://facebook.com" className="footer-icon" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://linkedin.com" className="footer-icon" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://twitter.com" className="footer-icon" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="footer-section">
          <h4>Contact Info</h4>
          <address>
            Melodia Event Management, T V Center, Kakkanad, Kochi, Kerala 682037<br />
            <a href="tel:+919876543210">+91 98765 43210</a><br />
            <a href="mailto:info@melodiaevents.com">info@melodiaevents.com</a>
          </address>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Melodia Event Management. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;