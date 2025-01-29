import React, { useState, useEffect } from 'react';
import './AboutUs.css'; // Import the CSS file
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

// Import images directly
import about1 from '../../assets/about1.jpg';
import about2 from '../../assets/about2.jpg';
import about3 from '../../assets/about3.jpg';

function AboutUs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [about1, about2, about3];

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
        className="about-hero"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <h1>About Medioraa</h1>
          <p>Your ultimate partner in creating unforgettable experiences.</p>
          <div className="about-social-icons">
            <a href="#" className="about-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="about-icon">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#" className="about-icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="about-icon">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="about-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
          <button className="about-contact-button">Contact Us</button>
        </div>
      </div>

      <div className="about-content-section">
        <h2>Who We Are</h2>
        <p>
          Medioraa is a cutting-edge event management platform built using the MERN stack (MongoDB, Express.js, React, and Node.js). Our mission is to simplify event planning and execution, making it seamless for individuals and organizations to host events of any scale. Whether it's a corporate conference, a wedding, a birthday celebration, or a community gathering, Medioraa is designed to handle it all with precision and creativity.
        </p>

        <h2>What We Do</h2>
        <ul>
          <li><strong>Event Planning:</strong> From concept to execution, we help you plan every detail.</li>
          <li><strong>Venue Booking:</strong> Find and book the perfect venue for your event.</li>
          <li><strong>Guest Management:</strong> Effortlessly manage invitations, RSVPs, and guest lists.</li>
          <li><strong>Real-Time Updates:</strong> Keep your attendees informed with real-time updates and notifications.</li>
          <li><strong>Analytics:</strong> Gain insights into your event's performance with detailed analytics.</li>
        </ul>

        <h2>Why Choose Medioraa?</h2>
        <ul>
          <li><strong>User-Friendly Interface:</strong> Our platform is designed with you in mind, ensuring a smooth and intuitive experience.</li>
          <li><strong>Customization:</strong> Tailor every aspect of your event to match your vision.</li>
          <li><strong>Reliability:</strong> Built on robust MERN stack technology, Medioraa ensures high performance and reliability.</li>
          <li><strong>Support:</strong> Our dedicated support team is always here to assist you, every step of the way.</li>
        </ul>

        <h2>Our Vision</h2>
        <p>
          At Medioraa, we envision a world where event planning is no longer a daunting task but an enjoyable journey. We strive to innovate and evolve, continuously enhancing our platform to meet the ever-changing needs of our users.
        </p>

        <h2>Join Us</h2>
        <p>
          Whether you're planning your first event or your hundredth, Medioraa is here to make the process as smooth and enjoyable as possible. Join us today and let's create something extraordinary together.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;