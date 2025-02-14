const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();
const mongoose = require("mongoose");
const Venue = require("../models/venueModels");
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

    // console.log("📌 Payment Verification Request:", req.body);

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

    // console.log("🔍 Expected Signature:", expectedSignature);
    // console.log("🔍 Received Signature:", razorpay_signature);

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Payment verification failed: Signature mismatch");
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // console.log("✅ Payment signature verified successfully!");

    // 🔹 Convert `bookingDate` to a Date object
    const bookedDate = new Date(bookingDate);
    bookedDate.setHours(0, 0, 0, 0); // Normalize to avoid time zone issues

    // 🔹 Save Booking to Database
    const newBooking = new VenueBooking({
      venueId: new mongoose.Types.ObjectId(venueId),
      userId: new mongoose.Types.ObjectId(userId),
      bookingDate: bookedDate, // Store normalized date
      capacity,
      totalPrice,
      status: "confirmed",
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: req.body.razorpay_payment_id,
    });

    await newBooking.save();
    // console.log("✅ Booking saved successfully in DB!");

    // 🔹 Add `bookingDate` to Venue's `unavailableDates` array
    const updatedVenue = await Venue.findByIdAndUpdate(
      new mongoose.Types.ObjectId(venueId), // ✅ Convert to ObjectId
      { $addToSet: { unavailableDates: bookedDate } },
      { new: true }
    );

    if (!updatedVenue) {
      console.error("❌ Venue not found or update failed!");
      return res.status(404).json({ success: false, message: "Venue not found" });
    }

    // console.log("✅ Venue updated successfully!", updatedVenue);
    res.status(200).json({ success: true, message: "Payment successful, date added!" });

  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Error verifying payment", error: error.message });
  }
};

//owner to get their bookings
const getVenuePayments = async (req, res) => {
  try {
    const ownerId = req.user.userId; // 👤 Get logged-in owner's ID (assumes authentication)
    console.log("👤 Owner ID:", req.user);
    

    if (!ownerId) {
      return res.status(400).json({ success: false, message: "Owner ID is required" });
    }

    // 🔹 Find venues owned by the user
    const ownedVenues = await Venue.find({ owner: new mongoose.Types.ObjectId(ownerId) }).select("_id name");
    
    if (!ownedVenues.length) {
      return res.status(404).json({ success: false, message: "No venues found for this owner" });
    }

    // Extract venue IDs
    const venueIds = ownedVenues.map(venue => venue._id);

    // 🔹 Get all bookings for these venues
    const bookings = await VenueBooking.find({ venueId: { $in: venueIds } })
  .populate("venueId", "name")
  .populate("userId", "name email") // Ensure `name` is included
  .select("razorpayOrderId razorpayPaymentId totalPrice bookingDate userId venueId");

console.log("📌 Fetched Bookings:", bookings);


    if (!bookings.length) {
      return res.status(404).json({ success: false, message: "No bookings found for your venues" });
    }

    res.status(200).json({ success: true, data: bookings });

  } catch (error) {
    console.error("❌ Error fetching venue payments:", error);
    res.status(500).json({ success: false, message: "Error fetching venue payments", error: error.message });
  }
};



module.exports = { createOrder, verifyPayment,getVenuePayments };
