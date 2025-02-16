const express = require("express");
const Bookingrouter = express.Router();
const bookingController = require("../controllers/eventBookingController");
const Auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

// Create a booking
Bookingrouter.post("/create-order",Auth, bookingController.createOrder);
Bookingrouter.post("/verify-payment",Auth, bookingController.verifyPayment);

// Get all bookings for a user
Bookingrouter.get("/userEventBooking",Auth, bookingController.getUserBookings);
Bookingrouter.get("/organizerEventOrders",Auth,role(["organizer"]), bookingController.getOrganizerEventOrders);

// Cancel a booking
Bookingrouter.delete("/cancel/:bookingId", bookingController.deleteEventBooking);

module.exports = Bookingrouter;
