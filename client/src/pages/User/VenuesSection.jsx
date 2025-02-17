import React from 'react';
import { useLocation } from 'react-router-dom';
import VenueCard from '../../components/VenueCard';
import './VenuesSection.css';
import Navbar from '../../components/User/Navbar';

const VenuesSection = () => {
  const { state } = useLocation();
  const venues = state?.venues || []; // Access the venues from the state

  return (
    <>
    <Navbar />
    <div className="venues-section">
      <h2>Venues</h2>
      {venues.length > 0 ? (
        <div className="venues-container">
          {venues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))}
        </div>
      ) : (
        <p>No venues found for this category.</p>
      )}
    </div>
    </>
  );
};

export default VenuesSection;
