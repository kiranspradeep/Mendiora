import React, { useEffect, useState } from "react";
import axios from "axios";
import './ViewEvents.css';
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminPage from "./AdminPage";
import AdminFooter from "../../components/Admin/AdminFooter";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://mendiora-2.onrender.com/event/getpendingEvents", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // console.log("✅ API Response:", response.data);
      setEvents(response.data.events || []);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching events:", error.response?.data || error.message);
      setError("Failed to fetch events.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingEvents();
  }, []);

  const handleApprove = async (Id) => {
    try {
      const token = localStorage.getItem("token"); // Get auth token
      await axios.put(`https://mendiora-2.onrender.com/event/approveEvent/${Id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingEvents();
    } catch (err) {
      console.error("❌ Error approving event:", err.response?.data || err.message);
      alert("Error approving event.");
    }
  };
  
  const handleReject = async (Id) => {
    try {
      const token = localStorage.getItem("token"); // Get auth token
      await axios.put(`https://mendiora-2.onrender.com/event/rejectEvent/${Id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPendingEvents();
    } catch (err) {
      console.error("❌ Error rejecting event:", err.response?.data || err.message);
      alert("Error rejecting event.");
    }
  };
  
  return (
    <>
    <AdminPage/>
    <div className="view-events-container">
      <h1 className="view-events-title">All Events</h1>
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading events...</p>
        </div>
      ) : error ? (
        <p className="view-events-error">{error}</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="view-events-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Category</th>
                <th className="owner-column">Owner</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.name}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{`${event.location?.city || "N/A"}, ${event.location?.country || "N/A"}`}</td>
                  <td>{event.categories?.join(", ") || "N/A"}</td>
                  <td className="owner-column">
                     {event.owner?.email || "UNAVAILABLE"} 
                  </td>
                  <td>
                    {event.isApproved === "approved" ? "Approved" : 
                     event.isApproved === "rejected" ? "Rejected" : 
                     "Pending"}
                  </td>
                  <td>
                    {event.isApproved === "pending" && (
                      <>
                        <button
                          className="view-events-approve-btn"
                          onClick={() => handleApprove(event._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="view-events-reject-btn"
                          onClick={() => handleReject(event._id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <br></br><br></br>
    <AdminFooter/>
    </>
  );
};

export default ViewEvents;
