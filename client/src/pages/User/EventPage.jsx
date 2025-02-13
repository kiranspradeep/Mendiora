import React, { useState, useEffect } from "react";
import "./EventPage.css";
import axios from "axios";
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/Footer";
import EventCard from "../../components/User/EventCard"; // Import EventCard
import pic1 from "../../assets/party1.jpg";
import pic2 from "../../assets/party2.jpg";
import pic3 from "../../assets/party3.jpg";


function EventPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [pic1, pic2, pic3];

  // Sample event data
  const [events, setEvents] = useState([]); // State to hold events

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/event/getAllEvents'); // Fetch events from API
        setEvents(response.data.events); // Set events state
        console.log(response.data.events);
        
      } catch (error) {
        console.log(error);
        
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents(); // Call the fetch function
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <Navbar />
      {/* Hero Section */}
      <div className="event-hero" style={{ backgroundImage: `url(${images[currentIndex]})` }}>
        <div className="event-hero-overlay"></div>
        <div className="event-hero-content">
          <h1>Welcome to Medioraa Event Page</h1>
          <p>Discover Unforgettable Moments</p>
        </div>
      </div>

      {/* Event Cards Section */}
      <section className="event-cards-section">
        <h2 className="section-title">Upcoming Events</h2>
        <div className="event-cards-container">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default EventPage;
