import React, { useState, useEffect } from 'react';
import './WeddingPlanners.css'; // Import the updated CSS file
import Navbar from '../../components/User/Navbar';
import Footer from '../../components/Footer';
import HeroAndDetailsSection from './HeroAndDetailsSection'; // Import the combined component
import VenuesSection from './VenuesSection'; // Import the VenuesSection component

// Sample venues data
const venues = [
  { id: 1, name: 'The Grand Ballroom', image: '/src/assets/venue1.jpg', location: 'Downtown', capacity: 300 },
  { id: 2, name: 'Riverside Gardens', image: '/src/assets/venue1.jpg', location: 'Uptown', capacity: 150 },
  { id: 3, name: 'Beachside Resort', image: '/src/assets/venue1.jpg', location: 'Coastal Area', capacity: 200 },
];

function WeddingPlanners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    '/src/assets/about1.jpg',
    '/src/assets/party1.jpg',
    '/src/assets/event.avif'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); // Loop through images
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval); // Cleanup interval
  }, [images.length]);

  return (
    <>
      <Navbar />
      <HeroAndDetailsSection image={images[currentIndex]} /> {/* Use the combined Hero and Details section */}
      <VenuesSection venues={venues} />
      <Footer />
    </>
  );
}

export default WeddingPlanners;
