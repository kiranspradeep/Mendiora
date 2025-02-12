import React from "react";
import "./EventCard.css";

const EventCard = ({ name, image, location, date, tickets, basePrice }) => {
  return (
    <div className="event-card">
      <div
        className="event-card-image"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="event-card-overlay"></div>
        <div className="event-card-content">
          <h3 className="event-card-title">{name}</h3>
          <p className="event-card-location">📍 {location}</p>
          <p className="event-card-date">📅 {date}</p>
          <p className="event-card-price">💰 Starting at ${basePrice}</p>
          <div className="event-card-buttons">
            <button className="event-button-primary">Reserve</button>
            <button className="event-button-secondary">Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
