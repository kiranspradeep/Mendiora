const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

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
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Update booking status to "confirmed"
    await VenueBooking.findByIdAndUpdate(bookingId, { status: "confirmed" });

    res.status(200).json({ success: true, message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ message: "Error verifying payment", error: error.message });
  }
};

module.exports = { createOrder, verifyPayment };
