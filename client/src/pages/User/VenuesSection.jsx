// VenuesSection.js
import React from 'react';
import VenueCard from '../../components/VenueCard'; // Import the VenueCard component
import './VenuesSection.css';

const VenuesSection = ({ venues }) => {
  return (
    <div className="venues-section">
      <h2>Venues</h2>
      <div className="venues-container">
        {venues.map((venue) => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
};

export default VenuesSection;
