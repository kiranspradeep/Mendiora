const express = require("express");
const Bookingrouter = express.Router();
const bookingController = require("../controllers/eventBookingController");
const Auth = require("../middlewares/authMiddleware");
// const role = require("../middlewares/roleMiddleware");

// Create a booking
Bookingrouter.post("/book",Auth, bookingController.createBooking);

// Get all bookings for a user
Bookingrouter.get("/user/:userId",Auth, bookingController.getUserBookings);

// Cancel a booking
Bookingrouter.delete("/cancel/:bookingId", bookingController.deleteEventBooking);

module.exports = Bookingrouter;
