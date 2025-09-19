import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/Card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../../components/Table";
import './venuePayment.css';
import axios from "axios";
import OrganizerNavbar from "../../components/Org/OrganizerNavbar";
import OrganizerFooter from "../../components/Org/OrganizerFooter";


const VenuePayments = () => {
  const [bookings, setBookings] = useState([]); // ✅ Initialize with empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("❌ No token found in localStorage");
          setError("User not authenticated");
          return;
        }

        // console.log("📌 Sending token:", token); // Debugging

        const response = await fetch(
          "http://localhost:3000/venuepayment/bookings",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(
            `HTTP error! Status: ${response.status} - ${errorResponse.message}`
          );
        }

        const data = await response.json();
        setBookings(data.data || []);
      } catch (err) {
        // console.error("❌ Error fetching payments:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading)
    return <p className="text-center text-blue-500 font-medium">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;

  return (
    <>
    <OrganizerNavbar/>
    <Card className="venue-payments-container">
      <CardContent>
        <h2 className="venue-payments-heading">Venue Payments</h2>
        {bookings.length === 0 ? (
          <p className="venue-payments-empty">No bookings found.</p>
        ) : (
          <div className="venue-payments-table-wrapper">
            <Table className="venue-payments-table">
              <TableHeader>
                <TableRow className="venue-table-header">
                  <TableHead className="venue-table-heading">Venue</TableHead>
                  <TableHead className="venue-table-heading">User</TableHead>
                  <TableHead className="venue-table-heading">Booking Date</TableHead>
                  <TableHead className="venue-table-heading">Amount</TableHead>
                  <TableHead className="venue-table-heading">Payment ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking._id} className="venue-row">
                    <TableCell className="venue-table-cell">
                      {booking.venueId?.name || "Not Available"}
                    </TableCell>
                    <TableCell className="venue-table-cell">
                      {booking.userId?.name ||
                        booking.userId?.email ||
                        "Not Available"}
                    </TableCell>
                    <TableCell className="venue-table-cell">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="venue-table-cell amount">
                      ₹{booking.totalPrice}
                    </TableCell>
                    <TableCell className="venue-table-cell payment-id">
                      {booking.razorpayPaymentId || "Not Available"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
    <OrganizerFooter/>
    </>
  );
};

export default VenuePayments;
