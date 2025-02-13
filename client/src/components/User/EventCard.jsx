import React from "react";
import "./EventCard.css";
import { Link } from "react-router-dom";

const EventCard = ({ name, images, location, date, basePrice }) => {
  return (
    <div className="event-card">
      <div
        className="event-card-image"
        style={{
          backgroundImage: images?.length > 0 ? `url(${images[0]})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="event-card-overlay"></div>
        <div className="event-card-content">
          <h3 className="event-card-title">{name}</h3>
          <p className="event-card-location">📍 {location?.address || "No location available"}</p>
          <p className="event-card-date">📅 {date.split("T")[0]}</p>
          <p className="event-card-price">💰 Starting at ${basePrice}</p>
          <div className="event-card-buttons">
            <button className="event-button-primary">Reserve</button>
            <Link to={`/event/${name}`} className="event-button-secondary">
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
