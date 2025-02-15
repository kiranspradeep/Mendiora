import React from 'react';
import './OrganizerFooter.css'; // Link to the Organizer CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

function OrganizerFooter() {
  return (
    <footer className="organizer-footer">
      <div className="organizer-footer-content">
        {/* Logo and Description */}
        <div className="organizer-footer-logo-section">
          <h2 className="organizer-footer-logo">Mendioraa Event Management - Organizer</h2>
          <p>
            Manage your events with ease. Mendioraa Event Management's organizer portal helps you plan, edit,
            and oversee your events seamlessly.
          </p>
        </div>

        {/* Social Media Links */}
        <div className="organizer-footer-section">
          <h4>Follow Us</h4>
          <div className="organizer-footer-social-icons">
            <a href="https://instagram.com" className="organizer-footer-icon" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://youtube.com" className="organizer-footer-icon" aria-label="YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="https://facebook.com" className="organizer-footer-icon" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://linkedin.com" className="organizer-footer-icon" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://twitter.com" className="organizer-footer-icon" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="organizer-footer-section">
          <h4>Contact Info</h4>
          <address>
            Mendioraa Event Management, T V Center, Kakkanad, Kochi, Kerala 682037<br />
            <a href="tel:+919876543210">+91 98765 43210</a><br />
            <a href="mailto:info@melodiaevents.com">info@melodiaevents.com</a>
          </address>
        </div>
      </div>

      {/* Copyright */}
      <div className="organizer-footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mendioraa Event Management. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default OrganizerFooter;
