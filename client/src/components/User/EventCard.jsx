import React, { useState } from "react";
import "./EventCard.css";
import EventBooking from "../../pages/User/EventBooking";

const EventCard = ({ event }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  if (!event) {
    return <p>Loading event...</p>;
  }

  return (
    <div className={`event-card ${isFlipped ? "flipped" : ""}`}>
      <div className="event-card-inner">
        {/* Front Side - Event Info */}
        <div className="event-card-front">
          <div
            className="event-card-image"
            style={{
              backgroundImage: event.images?.length > 0 ? `url(${event.images[0]})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="event-card-overlay"></div>
            <div className="event-card-content">
              <h3 className="event-card-title">{event.name || "Event Name Not Available"}</h3>
              <p className="event-card-location">
                📍 {event.location?.address || "No location available"}
              </p>
              <p className="event-card-date">
                📅 {event.date ? event.date.split("T")[0] : "Date Unavailable"}
              </p>
              <p className="event-card-price">💰 Starting at Rs{event.basePrice || "N/A"}</p>
              <div className="event-card-buttons">
                <button className="event-button-primary" onClick={() => setIsFlipped(true)}>
                  book
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side - Booking Form */}
        <div className="event-card-back">
          <button className="close-btn" onClick={() => setIsFlipped(false)}>✖</button>
          <EventBooking event={event} />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
