import React, { useState, useEffect } from "react";
import "./EventPage.css";
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
  const events = [
    {
      name: "Music Concert",
      image: pic1,
      location: "Kochi, Kerala",
      date: "March 25, 2025",
      tickets: 120,
      basePrice: 500,
      category: "Music Concerts",
    },
    {
      name: "Corporate Meetup",
      image: pic2,
      location: "Trivandrum, Kerala",
      date: "April 10, 2025",
      tickets: 200,
      basePrice: 1500,
      category: "Corporate Event",
    },
    {
      name: "Fashion Show",
      image: pic3,
      location: "Kozhikode, Kerala",
      date: "May 5, 2025",
      tickets: 100,
      basePrice: 1000,
      category: "Fashion shows",
    },
  ];

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
