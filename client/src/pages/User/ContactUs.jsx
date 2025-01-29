import React, { useState, useEffect } from 'react';
import './ContactUs.css'; // Import the CSS file
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

// Import images directly
import contact1 from '../../assets/contact1.jpg';
import contact2 from '../../assets/contact2.jpg';
import contact3 from '../../assets/contact3.jpg';

function ContactUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [contact1, contact2, contact3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through images
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval); // Cleanup interval
  }, [images.length]);

  return (
    <>
      <Navbar />
      <div
        className="contact-hero"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We would love to hear from you!</p>
          <div className="contact-social-icons">
            <a href="#" className="contact-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="contact-icon">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#" className="contact-icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="contact-icon">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="contact-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>

      <div className="contact-content-section">
        <h2>Get in Touch</h2>
        <p>If you have any questions, feel free to reach out to us via the contact form below or through our social media channels.</p>
        <h2>Contact Information</h2>
        <p>Email: support@medioraa.com</p>
        <p>Phone: +123 456 7890</p>
        <h2>Contact Form</h2>
        <form>
          <label>Name:</label>
          <input type="text" required />
          <label>Email:</label>
          <input type="email" required />
          <label>Message:</label>
          <textarea required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
