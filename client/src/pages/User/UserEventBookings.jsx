import React, { useEffect, useState } from "react";
import axios from "axios";
import "./UserBookings.css";

const UserEventBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Unauthorized: Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:3000/eventbooking/userEventBooking", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setBookings(response.data.bookings);
        } else {
          setError(response.data.message || "Failed to load bookings.");
        }
      } catch (err) {
        console.error("❌ Fetch Bookings Error:", err);
        setError("Error fetching bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  console.log(bookings);

  return (
    <div className="user-event-bookings-container">
      <h2 className="user-event-bookings-title">My Bookings</h2>

      {loading ? (
        <p className="user-event-bookings-loading">Loading bookings...</p>
      ) : error ? (
        <p className="user-event-bookings-error">{error}</p>
      ) : bookings.length === 0 ? (
        <p className="user-event-bookings-empty">No bookings found.</p>
      ) : (
        <table className="user-event-bookings-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Tickets</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Order ID</th>
            </tr>
          </thead>
          <tbody>
  {bookings.map((booking) => (
    <tr key={booking._id}>
      <td data-label="Event Name">{booking.event?.name || "N/A"}</td>
      <td data-label="Date">
        {booking.event?.date ? new Date(booking.event.date).toLocaleDateString() : "N/A"}
      </td>
      <td data-label="Tickets">{booking.tickets}</td>
      <td data-label="Total Amount">₹{booking.totalAmount.toFixed(2)}</td>
      <td 
        data-label="Payment Status" 
        className={booking.paymentStatus === "paid" ? "paid-status" : "pending-status"}
      >
        {booking.paymentStatus}
      </td>
      <td data-label="Order ID">{booking.razorpayOrderId || "N/A"}</td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
};

export default UserEventBookings;
