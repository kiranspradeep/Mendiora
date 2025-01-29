import React, { useState, useEffect } from 'react';
import './WeddingPlanners.css'; // Import the CSS file
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/Footer';

// Sample venues data
const venues = [
  { id: 1, name: 'The Grand Ballroom', location: 'Downtown', capacity: 300 },
  { id: 2, name: 'Riverside Gardens', location: 'Uptown', capacity: 150 },
  { id: 3, name: 'Beachside Resort', location: 'Coastal Area', capacity: 200 },
];

function WeddingPlanners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['/path/to/your/background-image1.jpg', '/path/to/your/background-image2.jpg', '/path/to/your/background-image3.jpg'];

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
        className="wedding-planners-hero"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
        }}
      >
        <div className="wedding-planners-hero-overlay"></div>
        <div className="wedding-planners-hero-content">
          <h1>Wedding Planners</h1>
          <p>Your dream wedding starts here. Let us help you plan the perfect day!</p>
        </div>
      </div>
      <div className="wedding-planners-details">
        <h2>About Our Service</h2>
        <p>We offer comprehensive wedding planning services tailored to your needs. From venue selection to day-of coordination, we ensure every detail is perfect.</p>
      </div>
      <div className="venues-section">
        <h2>Venues</h2>
        <ul>
          {venues.map(venue => (
            <li key={venue.id}>
              <h3>{venue.name}</h3>
              <p>Location: {venue.location}</p>
              <p>Capacity: {venue.capacity} guests</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default WeddingPlanners;
