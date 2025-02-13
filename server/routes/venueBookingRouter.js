const express = require("express");
const { createOrder, verifyPayment } = require("../controllers/venueBookingController");
//import auth
const  Auth  = require("../middlewares/authMiddleware");

const venuePaymentRouter = express.Router();

venuePaymentRouter.post("/create-order",Auth, createOrder);
venuePaymentRouter.post("/verify-payment",Auth, verifyPayment);

module.exports = venuePaymentRouter;