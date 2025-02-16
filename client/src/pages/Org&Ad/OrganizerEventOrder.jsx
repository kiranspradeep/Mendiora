import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrganizerOrder.css";

const OrganizerEventOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          setError("Unauthorized: Please log in.");
          setLoading(false);
          return;
        }
  
        // console.log("Sending token:", token); // Debugging
  
        const response = await axios.get("http://localhost:3000/eventbooking/organizerEventOrders", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.data.success) {
          setOrders(response.data.bookings);
        } else {
          setError(response.data.message || "Failed to load orders.");
        }
      } catch (err) {
        console.error("❌ Fetch Orders Error:", err.response?.data || err.message);
        setError("Error fetching orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  

  return (
    <div className="organizer-orders-container">
      <h2 className="organizer-orders-title">Event Orders</h2>

      {loading ? (
        <p className="organizer-orders-loading">Loading orders...</p>
      ) : error ? (
        <p className="organizer-orders-error">{error}</p>
      ) : (
        <table className="organizer-orders-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Event Name</th>
              <th>Add-ons</th>
              <th>Premium Access</th>
              <th>No. of Tickets</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id || index} className={order.default ? "default-placeholder" : ""}>
                <td>{order.default ? "No data" : order.user?.username || "N/A"}</td>
                <td>{order.default ? "No data" : order.user?.email || "N/A"}</td>
                <td>{order.default ? "No event booked" : order.event?.name || "N/A"}</td>
                <td>{order.default ? "No add-ons" : order.addOnServices?.length > 0 ? order.addOnServices.join(", ") : "None"}</td>
                <td>{order.default ? "--" : order.premiumAccess ? "Yes" : "No"}</td>
                <td>{order.default ? "0" : order.tickets}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrganizerEventOrders;
