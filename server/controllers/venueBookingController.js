const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const mongoose = require("mongoose");

const VenueBooking = require("../models/venueBookingModel");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a payment order
const createOrder = async (req, res) =>  {
  try {
    const { amount, currency, bookingId } = req.body;

    if (!amount || !currency || !bookingId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `receipt_${bookingId}`,
    });

    res.json({ order });
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
}
// Verify payment
const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      venueId,
      userId,
      bookingDate,
      capacity,
      totalPrice,
    } = req.body;

    console.log("📌 Payment Verification Request:", req.body);

    // 🔹 Ensure all necessary data is received
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }
    if (!venueId || !userId || !bookingDate || !capacity || !totalPrice) {
      return res.status(400).json({ success: false, message: "Missing booking details" });
    }

    // 🔹 Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    console.log("🔍 Expected Signature:", expectedSignature);
    console.log("🔍 Received Signature:", razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Payment verification failed: Signature mismatch");
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    console.log("✅ Payment signature verified successfully!");

    // 🔹 Save Booking to Database
    const newBooking = new VenueBooking({
      venueId: new mongoose.Types.ObjectId(venueId),
      userId: new mongoose.Types.ObjectId(userId),
      bookingDate,
      capacity,
      totalPrice,
      status: "confirmed",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id
    });

    await newBooking.save();

    console.log("✅ Booking saved successfully in DB!");

    res.status(200).json({ success: true, message: "Payment successful, booking confirmed!" });
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Error verifying payment", error: error.message });
  }
};



module.exports = { createOrder, verifyPayment };
