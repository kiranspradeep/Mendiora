import React, { useState } from 'react';
import './VenueCard.css';

const VenueCard = ({ venue }) => {
  const { address, city, state, country } = venue.location;

  const venueImage = venue.images && venue.images.length > 0 ? venue.images[0] : "default-image.jpg";

  const [readMore, setReadMore] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const toggleReadMore = () => setReadMore(!readMore);
  const handleMouseLeave = () => setReadMore(false);

  const truncatedDescription = `${venue.description.slice(0, 150)}...`;

  // Booking handler
  const handleBookVenue = () => {
    setIsBooking(true);

    // Simulate booking process
    setTimeout(() => {
      alert(`Venue "${venue.name}" booked successfully!`);
      setIsBooking(false);
    }, 1000);
  };

  return (
    <div className="venue-card" onMouseLeave={handleMouseLeave}>
  <div className="venue-card-image-wrapper">
    <img src={venueImage} alt={venue.name} className="venue-card-image" />
  </div>
  <div className="venue-card-content">
    <h3>{venue.name}</h3>
    <p>
      <strong>Description:</strong>{' '}
      {readMore ? venue.description : truncatedDescription}
      {venue.description.length > 150 && (
        <span className="read-more-toggle" onClick={toggleReadMore}>
          {readMore ? ' Show Less' : ' Read More'}
        </span>
      )}
    </p>

    {/* Venue Information */}
    <div className="venue-details">
      <p><strong>Address:</strong> {address}</p>
      <p><strong>City:</strong> {city}</p>
      <p><strong>State:</strong> {state}</p>
      <p><strong>Country:</strong> {country}</p>
      <p><strong>Capacity:</strong> {venue.capacity} guests</p>
    </div>

    {/* Booking Button */}
    <button 
      className="book-button"
      onClick={handleBookVenue}
      disabled={isBooking}
    >
      {isBooking ? 'Booking...' : 'Book Venue'}
    </button>
  </div>
</div>

  );
};

export default VenueCard;

