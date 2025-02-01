// VenueCard.js
import React from 'react';
import './VenueCard.css';

const VenueCard = ({ venue }) => {
  return (
    <div className="venue-card">
      <img src={venue.image} alt={venue.name} className="venue-card-image" />
      <div className="venue-card-content">
        <h3>{venue.name}</h3>
        <p><strong>Location:</strong> {venue.location}</p>
        <p><strong>Capacity:</strong> {venue.capacity} guests</p>
      </div>
    </div>
  );
};

export default VenueCard;
