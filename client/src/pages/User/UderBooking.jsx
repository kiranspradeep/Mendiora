import { useEffect, useState } from "react";
import axios from "axios";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        const response = await axios.get("/api/bookings/user-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data.data);
      } catch (err) {
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Venue</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Total Price</th>
              <th className="border p-2">Payment ID</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="border">
                <td className="border p-2">{booking.venueId.name}</td>
                <td className="border p-2">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td className="border p-2">₹{booking.totalPrice}</td>
                <td className="border p-2">{booking.razorpayPaymentId || "N/A"}</td>
                <td className="border p-2">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserBookings;
