import React, { useState, useEffect } from 'react';
import './UserHome.css';
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

// Import images directly
import party1 from '../../assets/party1.jpg';
import party2 from '../../assets/party2.jpg';
import party3 from '../../assets/party3.jpg';
import event from '../../assets/event.avif';
import co from '../../assets/co1.jpg'
import birthday from '../../assets/birthday1.jpg'
import { Link } from 'react-router-dom';

function UserHome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [party1, party2, party3];

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
        className="hero"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Partner with Medioraa Event Management in Kerala</h1>
          <p>Kerala's #1 Event Management Company</p>
          <div className="social-icons">
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
          <button className="contact-button">Contact Us</button>
        </div>
      </div>
        
      <div className="services-section">
        <h2>Services by Medioraa Event Management</h2>
        <p>
          Medioraa Event Management offers a wide range of services to make your special moments unforgettable. 
          From corporate events to dreamy weddings, we handle it all with professionalism and creativity.
        </p>
        <section id='service'>
          <div className="service-grid"></div>
        </section>
        <div className="services-container">
          <div className="service-card">
            <img src={co} alt="Corporate Event Management" />
            <h3>Corporate Event Management</h3>
            <p>
              Make a statement at your next corporate event with our tailored event management solutions.
            </p>
            <button className="learn-more-button">Learn More</button>
          </div>
          <div className="service-card">
            <img src={event} alt="Wedding Planners" />
            <h3>Wedding Planners & Management</h3>
            <p>
              Plan the wedding of your dreams with our expert wedding planners who focus on every detail.
            </p>
            <button className="learn-more-button">Learn More</button>
          </div>
          <div className="service-card">
            <img src={party3} alt="Entertainment" />
            <h3>Entertainment & Show Management</h3>
            <p>
            Deliver unforgettable experiences with our entertainment and show management services.
            </p>
            <button className="learn-more-button">Learn More</button>
          </div>
          <div className="service-card">
            <img src={birthday} alt="Birthday" />
            <h3>Birthday Party & Venue Management</h3>
            <p>
            Celebrate your special day with our personalized birthday party management services.
            </p>
            <button className="learn-more-button">Learn More</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserHome;
