import React, { useState, useEffect } from "react";
import "./EventPage.css";
import axios from "axios";
import Navbar from "../../components/User/Navbar";
import Footer from "../../components/Footer";
import EventCard from "../../components/User/EventCard"; 
import pic1 from "../../assets/party1.jpg";
import pic2 from "../../assets/party2.jpg";
import pic3 from "../../assets/party3.jpg";

function EventPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [pic1, pic2, pic3];

  const [events, setEvents] = useState([]); 
  const [sortBy, setSortBy] = useState(""); // Sorting state

  useEffect(() => {
    fetchEvents();
  }, [sortBy]); // Refetch when sorting changes

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/event/getAllEvents?sortBy=${sortBy}`); 
      setEvents(response.data.events); 
      console.log(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); 
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

      {/* Event Sorting & Cards Section */}
      <section className="event-cards-section">
        <h2 className="section-title">Upcoming Events</h2>

        {/* Sorting Dropdown */}
        <div className="sort-container">
          <label>Sort By:</label>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Default</option>
            <option value="date">Date</option>
            <option value="price">Price</option>
          </select>
        </div>

        {/* Event Cards */}
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
