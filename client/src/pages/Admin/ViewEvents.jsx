import React, { useEffect, useState } from "react";
import axios from "axios";
import './ViewEvents.css'

const ViewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/event/getAllEvents");
      setEvents(response.data.events || []);
      setLoading(false);
    } catch (err) {
      setError(`Error fetching events: ${err.message}`);
      console.error("Error fetching events:", err);
      setLoading(false);
    }
  };

  const handleApprove = async (Id) => {
    try {
      await axios.patch(`http://localhost:3000/event/approveEvents/${Id}`);
      fetchAllEvents();
    } catch (err) {
      alert("Error approving event.");
    }
  };

  const handleReject = async (Id) => {
    try {
      await axios.patch(`http://localhost:3000/event/rejectEvents/${Id}`);
      fetchAllEvents();
    } catch (err) {
      alert("Error rejecting event.");
    }
  };

  return (
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
                <th>Owner</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>{event.name}</td>
                  <td>{new Date(event.date).toLocaleDateString()}</td>
                  <td>{`${event.location.city}, ${event.location.country}`}</td>
                  <td>{event.categories.join(", ")}</td>
                  <td>
                    {event.owner?.name} ({event.owner?.email})
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
  );
};

export default ViewEvents;
