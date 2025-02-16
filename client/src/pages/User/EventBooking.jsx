import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EventBooking.css";

const EventBooking = ({ event }) => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [premiumAccess, setPremiumAccess] = useState(false);
  const [tickets, setTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(event.basePrice || 0);

  useEffect(() => {
    calculatePrice();
  }, [selectedAddOns, premiumAccess, tickets]);

  const handleAddOnChange = (addOn) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOn) ? prev.filter((item) => item !== addOn) : [...prev, addOn]
    );
  };

  const calculatePrice = () => {
    let price = event.basePrice || 0;
    if (premiumAccess) price += 100;
    if (selectedAddOns.includes("catering")) price += 50;
    if (selectedAddOns.includes("parking")) price += 25;
    if (selectedAddOns.includes("Security")) price += 100;
    if (selectedAddOns.includes("Wi-Fi")) price += 20;
    if (event.featuredPerformer) price *= 1.5;

    const dayOfWeek = new Date(event.date).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) price *= 1.2;

    setTotalPrice(parseFloat((price * tickets).toFixed(2)));
  };

  const handleBooking = async () => {
    try {
      await axios.post("http://localhost:3000/booking", {
        eventId: event._id,
        tickets,
        premiumAccess,
        addOnServices: selectedAddOns,
        totalAmount: totalPrice,
      });
      alert("Booking Successful!");
    } catch (error) {
      console.error("Booking Error:", error);
    }
  };

  // Set max tickets based on available capacity
  const maxTickets = event.capacity ? event.capacity - event.ticketsSold : 10;
  console.log("Max Tickets:", maxTickets);
  
  // Function to increase ticket count
const handleIncrement = () => {
  console.log("Max Tickets:", maxTickets);
  setTickets((prev) => {
    const newTickets = prev < maxTickets ? prev + 1 : maxTickets;
    console.log("Incremented Tickets:", newTickets);
    return newTickets;
  });
};

// Function to decrease ticket count
const handleDecrement = () => {
  setTickets((prev) => {
    const newTickets = Math.max(1, prev - 1);
    console.log("Decremented Tickets:", newTickets);
    return newTickets;
  });
};


  return (
    <div>
      <h2 className="evnt-bk-h2">{event.name}</h2>
      <p className="event-price">Base Price: Rs{event.basePrice}</p>

      <label className="event-checkbox">
        <input type="checkbox" checked={premiumAccess} onChange={() => setPremiumAccess(!premiumAccess)} />
        Premium Access (+Rs100)
      </label>

      <label className="event-checkbox">
        <input type="checkbox" checked={selectedAddOns.includes("catering")} onChange={() => handleAddOnChange("catering")} />
        Catering (+Rs50)
      </label>

      <label className="event-checkbox">
        <input type="checkbox" checked={selectedAddOns.includes("parking")} onChange={() => handleAddOnChange("parking")} />
        Parking (+Rs25)
      </label>

      <label className="event-checkbox">
        <input type="checkbox" checked={selectedAddOns.includes("Security")} onChange={() => handleAddOnChange("Security")} />
        Security (+Rs100)
      </label>

      <label className="event-checkbox">
        <input type="checkbox" checked={selectedAddOns.includes("Wi-Fi")} onChange={() => handleAddOnChange("Wi-Fi")} />
        Wi-Fi (+Rs20)
      </label>

      {/* Ticket Counter */}
      <div className="calculation">
      <div className="event-ticket">
        <span>Number of Tickets:</span>
        <button className="minus-button" type="button" onClick={handleDecrement}>
  -
</button>

<input
  type="number"
  value={tickets}
  min="1"
  max={maxTickets}
  onChange={(e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= maxTickets) {
      setTickets(value);
    }
  }}
/>

<button className="plus-button" type="button" onClick={handleIncrement}>
  +
</button>

      </div>
      </div>

      <h3 className="total-price">Total Price: Rs{totalPrice}</h3>
      <button className="book-now" onClick={handleBooking}>
        Book Now
      </button>
    </div>
  );
};

export default EventBooking;
