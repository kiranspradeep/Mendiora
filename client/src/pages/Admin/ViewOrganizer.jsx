import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewOrganizers = () => {
  const [organizers, setOrganizers] = useState([]);

  
  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get auth token
        const response = await axios.get("http://localhost:3000/getOrganizers", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrganizers(response.data || []);
      } catch (error) {
        console.error("Error fetching organizers:", error.response?.data || error.message);
      }
    };

    fetchOrganizers();
  }, []);


  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3000/approveOrg",
        { id }, // Sending ID in request body
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrganizers(organizers.filter((org) => org._id !== id)); // Remove from list after approval
    } catch (error) {
      console.error("Error approving organizer:", error.response?.data || error.message);
    }
  };
  
  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "http://localhost:3000/rejectOrg",
        { id }, // Sending ID in request body
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrganizers(organizers.filter((org) => org._id !== id)); // Remove from list after rejection
    } catch (error) {
      console.error("Error rejecting organizer:", error.response?.data || error.message);
    }
  };

  return (
    <div className="organizer-table-container">
      <h2>View Organizers</h2>
      {organizers.length > 0 ? (
        <table className="organizer-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizers.map((organizer) => (
              <tr key={organizer._id}>
                <td>{organizer.username}</td>
                <td>{organizer.name}</td>
                <td>{organizer.email}</td>
                <td>
                  <button className="approve-btn" onClick={() => handleApprove(organizer._id)}>
                    Approve
                  </button>
                  <button className="reject-btn" onClick={() => handleReject(organizer._id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No organizers available.</p>
      )}
    </div>
  );
};

export default ViewOrganizers;
