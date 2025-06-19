import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ApprovedOrganizers.css"; // Import CSS file
import AdminPage from "./AdminPage";
import AdminFooter from "../../components/Admin/AdminFooter";

const ApprovedOrganizers = () => {
  const [organizers, setOrganizers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrganizers();
  }, [search]);

  const fetchOrganizers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await axios.get(
        `https://mendiora-2.onrender.com/getAprovedOrg?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrganizers(response.data.users || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching organizers:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleBlockStatus = async (organizerId, isBlocked) => {
    
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User not authenticated");
      }

      const url = `https://mendiora-2.onrender.com/${
        isBlocked ? "unblock" : "block"
      }/${organizerId}`;

      await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // Update state optimistically
      setOrganizers((prevOrganizers) =>
        prevOrganizers.map((organizer) =>
          organizer._id === organizerId
            ? { ...organizer, isBlocked: !isBlocked }
            : organizer
        )
      );
    } catch (err) {
        console.log(err);
        
      console.error("Error toggling block status:", err);
      alert("Failed to update block status");
    }
  };

  return (
    <>
    <AdminPage/>
    <div className="approved-organizers-container">
      <h2 className="approved-organizers-heading">Approved Organizers</h2>

      <input
        type="text"
        placeholder="Search by username or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">Error: {error}</p>}

      {organizers.length === 0 && !loading && !error ? (
        <p className="no-data-text">No approved organizers found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="approved-organizers-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {organizers.map((organizer) => (
                <tr key={organizer._id}>
                  <td>{organizer.username || "N/A"}</td>
                  <td>{organizer.email || "N/A"}</td>
                  <td className={organizer.isBlocked ? "status-blocked" : "status-approved"}>
                    {organizer.isBlocked ? "Blocked" : "Approved"}
                  </td>
                  <td>
                    <button
                      className={`block-btn ${organizer.isBlocked ? "unblock" : "block"}`}
                      onClick={() => toggleBlockStatus(organizer._id, organizer.isBlocked)}
                    >
                      {organizer.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    <AdminFooter/>
    </>
  );
};

export default ApprovedOrganizers;
