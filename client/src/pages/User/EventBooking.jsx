import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EventBooking.css";
import { jwtDecode } from "jwt-decode";

const EventBooking = ({ event }) => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [premiumAccess, setPremiumAccess] = useState(false);
  const [tickets, setTickets] = useState(1);
  const [totalPrice, setTotalPrice] = useState(event.basePrice || 0);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    calculatePrice();
  }, [selectedAddOns, premiumAccess, tickets]);

  useEffect(() => {
    const loadRazorpayScript = () => {
      if (!window.Razorpay) {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }
    };
    loadRazorpayScript();
  }, []);

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
    setIsBooking(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Unauthorized: Please log in.");
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      // ✅ Make booking request
      const response = await axios.post(
        "http://localhost:3000/eventbooking/create-order",
        {
          eventId: event._id,
          tickets,
          premiumAccess,
          addOnServices: selectedAddOns,
          totalAmount: totalPrice,
          userId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { order } = response.data;

      // ✅ Proceed with Razorpay Payment
      const options = {
        key: "rzp_test_nW4vVqRdlXrom0",
        amount: order.amount,
        currency: order.currency,
        name: "Event Booking",
        description: `Booking for ${event.name}`,
        order_id: order.id,
        handler: async (paymentResponse) => {
          try {
            const verifyResponse = await axios.post(
              "http://localhost:3000/eventbooking/verify-payment",
              {
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                eventId: event._id,
                tickets,
                totalPrice,
                userId,
                premiumAccess,
                addOnServices: selectedAddOns,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (verifyResponse.data.success) {
              alert("✅ Payment successful! Your event booking is confirmed.");
            } else {
              alert("❌ Payment verification failed. Please try again.");
            }
          } catch (error) {
            console.error("❌ Payment Verification Error:", error);
            alert("Error verifying payment. Please contact support.");
          }
          setIsBooking(false);
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("❌ Booking Error:", error);

      if (error.response && error.response.status === 400) {
        alert(error.response.data.error);
      } else {
        alert("Booking failed. Please try again.");
      }

      setIsBooking(false);
    }
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

      <div className="event-ticket">
        <span>Number of Tickets:</span>
        <button className="minus-button" type="button" onClick={() => setTickets(Math.max(1, tickets - 1))}>
          -
        </button>
        <input type="number" value={tickets} min="1" onChange={(e) => setTickets(parseInt(e.target.value, 10))} />
        <button className="plus-button" type="button" onClick={() => setTickets(tickets + 1)}>
          +
        </button>
      </div>

      <h3 className="total-price">Total Price: Rs{totalPrice}</h3>
      <button className="book-now" onClick={handleBooking} disabled={isBooking}>
        {isBooking ? "Processing..." : "Pay & Book Event"}
      </button>
    </div>
  );
};

export default EventBooking;
