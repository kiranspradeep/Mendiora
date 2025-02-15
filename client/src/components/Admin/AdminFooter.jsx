import React from 'react';
import './AdminFooter.css'; // Link to the updated CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

function AdminFooter() {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-content">
        {/* Logo and Description */}
        <div className="admin-footer-logo-section">
          <h2 className="admin-footer-logo">Mendioraa Event Management - Admin</h2>
          <p>
            Manage and oversee all your events in one place. Mendioraa Event Management's admin panel offers
            complete control over event approvals, user management, and more.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="admin-footer-section">
          <h4>Follow Us</h4>
          <div className="admin-footer-social-icons">
            <a href="https://instagram.com" className="admin-footer-icon" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://youtube.com" className="admin-footer-icon" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="https://facebook.com" className="admin-footer-icon" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://linkedin.com" className="admin-footer-icon" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://twitter.com" className="admin-footer-icon" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="admin-footer-section">
          <h4>Contact Info</h4>
          <address>
            Mendioraa Event Management, T V Center, Kakkanad, Kochi, Kerala 682037<br />
            <a href="tel:+919876543210">+91 98765 43210</a><br />
            <a href="mailto:info@melodiaevents.com">info@melodiaevents.com</a>
          </address>
        </div>
      </div>

      {/* Copyright */}
      <div className="admin-footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mendioraa Event Management. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default AdminFooter;
