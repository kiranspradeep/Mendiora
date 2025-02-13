import React, { useState, useEffect } from "react";
import "./VenueCard.css";


const VenueCard = ({ venue }) => {
  const { address, city, state, country } = venue.location || {};
  const venueImage = venue.images?.length > 0 ? venue.images[0] : "default-image.jpg";

  const minPrice = venue.priceRange?.minPrice ?? 0;
  const maxPrice = venue.priceRange?.maxPrice ?? 0;
  const totalCapacity = venue.capacity ?? 0;
  const halfCapacity = Math.ceil(totalCapacity / 2);

  const [readMore, setReadMore] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState("full");
  const [selectedDate, setSelectedDate] = useState("");

  const unavailableDates = venue.unavailableDates || [];

  useEffect(() => {
    const loadRazorpayScript = async () => {
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay script loaded.");
        script.onerror = () => console.error("Failed to load Razorpay script.");
        document.body.appendChild(script);
      }
    };
    loadRazorpayScript();
  }, []);

  const isDateUnavailable = (date) => {
    return unavailableDates.some(
      (unavailableDate) => new Date(unavailableDate).toISOString().split("T")[0] === date
    );
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleCapacityChange = (event) => {
    setSelectedCapacity(event.target.value);
  };

  ///booking

  const handleBookVenue = async () => {
    if (!selectedDate) {
      alert("Please select a date before booking.");
      return;
    }
  
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of the day
  
    const selectedDateObj = new Date(selectedDate);
    selectedDateObj.setHours(0, 0, 0, 0); // Normalize selected date
  
    if (selectedDateObj <= today) {
      alert("Please select a future date for booking.");
      return;
    }
  
    if (isDateUnavailable(selectedDate)) {
      alert(`Sorry, the venue is unavailable on ${selectedDate}.`);
      return;
    }
  
    setIsBooking(true);
  
    try {
      const token = localStorage.getItem("token"); // 🔹 Get token from storage
      if (!token) {
        throw new Error("Unauthorized: No token found. Please log in again.");
      }
  
      const amountInINR = selectedCapacity === "half" ? minPrice : maxPrice;
      const amountInPaise = amountInINR * 100; // Convert INR to paise
  
      console.log("📌 Booking Details:", { venueId: venue.id, amountInPaise, selectedDate });
  
      const response = await fetch("http://localhost:3000/venuepayment/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // 🔹 Add the token here
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          bookingId: venue.id,
          date: selectedDate,
        }),
      });
  
      const data = await response.json();
      console.log("📌 Order Response:", data);
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to create Razorpay order.");
      }
  
      // **Proceed with Razorpay Payment**
      const options = {
        key: "rzp_test_nW4vVqRdlXrom0",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Venue Booking",
        description: `Booking for ${venue.name}`,
        order_id: data.order.id,
        handler: async (paymentResponse) => {
          console.log("📌 Payment Response:", paymentResponse);
  
          const verifyResponse = await fetch("http://localhost:3000/venuepayment/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`, // 🔹 Add token for verification too
            },
            body: JSON.stringify({
              razorpay_order_id: paymentResponse.razorpay_order_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
              bookingId: venue.id,
            }),
          });
  
          const verificationResult = await verifyResponse.json();
          console.log("📌 Verification Result:", verificationResult);
  
          if (verificationResult.success) {
            alert(`✅ Payment successful! Venue "${venue.name}" booked for ${selectedDate}.`);
          } else {
            alert("❌ Payment verification failed. Please try again.");
          }
  
          setIsBooking(false);
        },
        theme: { color: "#3399cc" },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("❌ Order Error:", error);
      alert(error.message);
      setIsBooking(false);
    }
  };
  
  
  
  

  return (
    <div className="venue-card">
      <div className="venue-card-image-wrapper">
        <img src={venueImage} alt={venue.name || "Venue"} className="venue-card-image" />
      </div>
      <div className="venue-card-content">
        <h3>{venue.name || "Unknown Venue"}</h3>
        <p>
          <strong>Description:</strong>{" "}
          {readMore ? venue.description : `${venue.description.slice(0, 150)}...`}
          {venue.description.length > 150 && (
            <span className="venue-read-more-toggle" onClick={() => setReadMore(!readMore)}>
              {readMore ? " Show Less" : " Read More"}
            </span>
          )}
        </p>

        <div className="venue-details">
          <p><strong>Address:</strong> {address || "N/A"}</p>
          <p><strong>City:</strong> {city || "N/A"}</p>
          <p><strong>State:</strong> {state || "N/A"}</p>
          <p><strong>Country:</strong> {country || "N/A"}</p>
        </div>

        <div className="venue-date-selection">
          <strong>Select a Date:</strong>
          <input type="date" value={selectedDate} onChange={handleDateChange} />
          {selectedDate && isDateUnavailable(selectedDate) && (
            <p style={{ color: "red" }}>This date is unavailable.</p>
          )}
        </div>

        <div className="venue-capacity-selection">
          <strong>Capacity:</strong>
          <label>
            <input
              type="radio"
              value="half"
              checked={selectedCapacity === "half"}
              onChange={handleCapacityChange}
              disabled={totalCapacity === 0}
            />{" "}
            {halfCapacity} guests
          </label>
          <label>
            <input
              type="radio"
              value="full"
              checked={selectedCapacity === "full"}
              onChange={handleCapacityChange}
              disabled={totalCapacity === 0}
            />{" "}
            {totalCapacity} guests
          </label>
        </div>

        <p><strong>Price:</strong> ₹{selectedCapacity === "half" ? `${minPrice}` : `${maxPrice}`}</p>

        <button 
          className="venue-book-button"
          onClick={handleBookVenue}
          disabled={isBooking || totalCapacity === 0 || isDateUnavailable(selectedDate)}
        >
          {isBooking ? "Booking..." : "Pay & Book Venue"}
        </button>
      </div>
    </div>
  );
};

export default VenueCard;
