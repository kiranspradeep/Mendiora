const express = require("express");
const { createOrder, verifyPayment,getVenuePayments } = require("../controllers/venueBookingController");
const Role = require("../middlewares/roleMiddleware");
const  Auth  = require("../middlewares/authMiddleware");

const venuePaymentRouter = express.Router();

venuePaymentRouter.post("/create-order",Auth, createOrder);
venuePaymentRouter.post("/verify-payment",Auth, verifyPayment);
venuePaymentRouter.get("/bookings",Auth, Role(["admin", "organizer"]), getVenuePayments);

module.exports = venuePaymentRouter;