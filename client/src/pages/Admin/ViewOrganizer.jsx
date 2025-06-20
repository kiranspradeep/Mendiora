import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewOrganizer.css"
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminPage from "./AdminPage";
import AdminFooter from "../../components/Admin/AdminFooter";

const ViewOrganizer = () => {
  const [organizers, setOrganizers] = useState([]);

  // Fetch unapproved organizers
  useEffect(() => {
    const fetchOrganizers = async () => {
      try {
        const token = localStorage.getItem("token"); // Get auth token
        const response = await axios.get("https://mendiora-2.onrender.com/getunapprovedOrg", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrganizers(response.data.users || []); // Set the unapproved organizers
      } catch (error) {
        console.error("Error fetching unapproved organizers:", error.response?.data || error.message);
      }
    };

    fetchOrganizers();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // Send PUT request to approve organizer
      const response = await axios.put(
        `https://mendiora-2.onrender.com/approveOrg/${id}`, // Use the ID of the organizer in the URL
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message); // Show success message from backend
      setOrganizers(organizers.filter((org) => org._id !== id)); // Remove from list after approval
    } catch (error) {
      console.error("Error approving organizer:", error.response?.data || error.message);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // Send PUT request to reject organizer
      const response = await axios.put(
        `https://mendiora-2.onrender.com/rejectOrg/${id}`, // Use the ID of the organizer in the URL
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message); // Show success message from backend
      setOrganizers(organizers.filter((org) => org._id !== id)); // Remove from list after rejection
    } catch (error) {
      console.error("Error rejecting organizer:", error.response?.data || error.message);
    }
  };

  return (
    <>
    <AdminPage/>
    <div className="organizer-table-container">
      <h2>View Unapproved Organizers</h2>
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
                <td>{organizer.Name}</td>
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
        <p>No unapproved organizers available.</p>
      )}
    </div>
    <AdminFooter/>
    </>
  );
};

export default ViewOrganizer;
