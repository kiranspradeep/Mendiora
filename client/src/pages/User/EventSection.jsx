import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import "./EventSection.css";

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 12;
  
  useEffect(() => {
      const fetchEvents = async () => {
          try {
              const response = await axios.get(`http://localhost:3000/event/getAllEvents?page=${currentPage}&limit=${eventsPerPage}`);
              setEvents(response.data.events);
              setTotalPages(response.data.totalPages);  // Store total pages
              setLoading(false);
          } catch (err) {
              setError("Error fetching events");
              setLoading(false);
          }
      };
  
      fetchEvents();
  }, [currentPage]);  // Re-fetch when page changes
  
  
  
  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

// Pagination Handlers
const nextPage = () => {
  if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
  }
};

const prevPage = () => {
  if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
  }
};
  return (
    <div className="event-section">
      <h2>Events ({events.length})</h2> {/* Debugging UI */}
      
      <div className="event-grid">
        {currentEvents.map((event) => (
          <EventCard
            key={event._id}
            name={event.name}
            image={event.images?.[0] || "default.jpg"}
            place={`${event.location?.city || "Unknown"}, ${event.location?.state || "Unknown"}, ${event.location?.country || "Unknown"}`}
            tickets={event.tickets || "No Tickets Available"}
            category={event.categories?.[0] || "Uncategorized"}
            featuredPerformer={event.featuredPerformer || "No Performer"}
            onClick={() => alert(`Clicked on ${event.name}`)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
    <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">
        Previous
    </button>
    <span>Page {currentPage} of {totalPages}</span>
    <button onClick={nextPage} disabled={currentPage >= totalPages} className="pagination-btn">
        Next
    </button>
</div>
    </div>
  );
};

export default EventSection;
