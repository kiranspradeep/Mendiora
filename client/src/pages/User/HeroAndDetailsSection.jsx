import React from 'react';
import './HeroAndDetailsSection.css';  // Import the CSS file

const HeroAndDetailsSection = ({ image }) => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="wedding-planners-hero"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="wedding-planners-hero-overlay"></div>
        <div className="wedding-planners-hero-content" style={{ opacity: 1 }}> {/* Set opacity to 1 for testing */}
          <h1>Wedding Planners</h1>
          <p>Your dream wedding starts here. Let us help you plan the perfect day!</p>
        </div>
      </div>

      {/* Details Section */}
      <div className="wedding-planners-details">
        <h2>About Our Service</h2>
        <p>We offer comprehensive wedding planning services tailored to your needs. From venue selection to day-of coordination, we ensure every detail is perfect.</p>
      </div>
    </>
  );
};

export default HeroAndDetailsSection;
