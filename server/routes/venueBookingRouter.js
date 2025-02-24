const express = require("express");
const { createOrder, verifyPayment,getVenuePayments,getUserBookings } = require("../controllers/venueBookingController");
const Role = require("../middlewares/roleMiddleware");
const  Auth  = require("../middlewares/authMiddleware");

const venuePaymentRouter = express.Router();

venuePaymentRouter.post("/create-order",Auth, createOrder);
venuePaymentRouter.post("/verify-payment",Auth, verifyPayment);
venuePaymentRouter.get("/bookings",Auth, Role(["admin", "organizer"]), getVenuePayments);
venuePaymentRouter.get("/bookings",Auth, Role(["admin", "organizer"]), getVenuePayments);
venuePaymentRouter.get("/user-bookings", Auth, getUserBookings);

module.exports = venuePaymentRouter;