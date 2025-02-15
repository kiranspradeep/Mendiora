import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import "./EventSection.css";

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 12; // Show 12 events per page

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/event/getAllEvents");
        setEvents(response.data.events);
        setLoading(false);
      } catch (err) {
        setError("Error fetching events");
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  // **Calculate Indexes for Pagination**
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // **Pagination Handlers**
  const nextPage = () => {
    if (indexOfLastEvent < events.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="event-section">
      <div className="event-grid">
        {currentEvents.map((event) => (
          <EventCard
            key={event._id}
            name={event.name}
            image={event.images[0]} 
            place={`${event.location.city}, ${event.location.state}, ${event.location.country}`}
            tickets={event.tickets} 
            category={event.categories[0]} 
            featuredPerformer={event.featuredPerformer}
            onClick={() => alert(`Clicked on ${event.name}`)}
          />
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={nextPage} disabled={indexOfLastEvent >= events.length} className="pagination-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default EventSection;
