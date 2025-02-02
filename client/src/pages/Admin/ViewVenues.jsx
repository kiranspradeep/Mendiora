import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewVenues.css";

const ViewVenues = () => {
  const [venues, setVenues] = useState([]);

  // Fetch unapproved venues
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const token = localStorage.getItem("token"); // Get auth token
        const response = await axios.get("http://localhost:3000/venue", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVenues(response.data.venues || []); // Set the unapproved venues
      } catch (error) {
        console.error("Error fetching unapproved venues:", error.response?.data || error.message);
      }
    };

    fetchVenues();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // Send PUT request to approve venue
      const response = await axios.put(
        `http://localhost:3000/venue/approveVenue/${id}`, // Use the ID of the venue in the URL
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message); // Show success message from backend
      setVenues(venues.filter((venue) => venue._id !== id)); // Remove from list after approval
    } catch (error) {
      console.error("Error approving venue:", error.response?.data || error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // Send PUT request to reject venue
      const response = await axios.put(
        `http://localhost:3000/venue/rejectVenue/${id}`, // Use the ID of the venue in the URL
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message); // Show success message from backend
      setVenues(venues.filter((venue) => venue._id !== id)); // Remove from list after rejection
    } catch (error) {
      console.error("Error rejecting venue:", error.response?.data || error.message);
    }
  };

  return (
    <div className="venue-table-container">
      <h2>View Unapproved Venues</h2>
      {venues.length > 0 ? (
        <table className="venue-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => (
              <tr key={venue._id}>
                <td>{venue.name}</td>
                <td>{venue.description}</td>
                <td>{venue.location}</td>
                <td>{venue.owner}</td>
                <td>
                  <button className="approve-btn" onClick={() => handleApprove(venue._id)}>
                    Approve
                  </button>
                  <button className="reject-btn" onClick={() => handleReject(venue._id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No unapproved venues available.</p>
      )}
    </div>
  );
};

export default ViewVenues;
