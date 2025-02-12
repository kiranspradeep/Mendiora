import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from './EventCard';
import './EventSection.css';

const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="event-section">
      {events.map((event) => (
       <EventCard
       key={event._id}
       name={event.name}
       image={event.images[0]} // First image in the array
       place={`${event.location.city}, ${event.location.state}, ${event.location.country}`}
       tickets={event.tickets} // Ensure this field is present in your backend
       category={event.categories[0]} // Since your backend saves category as an array
       featuredPerformer={event.featuredPerformer}
       onClick={() => alert(`Clicked on ${event.name}`)}
     />

      ))}
    </div>
  );
};

export default EventSection;
