const Razorpay = require("razorpay");
const crypto = require("crypto");
const EventBooking = require("../models/eventBookingModel");
const Event = require("../models/eventModels");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    const { eventId, tickets, premiumAccess, addOnServices, totalAmount } = req.body;
    const userId = req.user.userId; // Get userId from Auth middleware

    if (!totalAmount || isNaN(totalAmount)) {
      return res.status(400).json({ success: false, error: "Invalid total amount" });
    }

    // ✅ Fetch Event Details
    const event = await Event.findById(eventId);
    

    if (!event) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    // ✅ Check Ticket Availability
    const availableTickets = event.capacity - event.ticketsSold;

    if (tickets > availableTickets) {
      return res.status(400).json({
        success: false,
        error: `Only ${availableTickets} tickets are available`,
      });
    }

    // ✅ Ensure totalAmount is in paise for Razorpay
    const amountInPaise = Math.round(totalAmount * 100);

    // 🔥 Create Razorpay Order
    const razorpayOrder = await razorpay.orders.create({
      amount: amountInPaise, // Amount in paise
      currency: "INR",
      payment_capture: 1,
    });

    if (!razorpayOrder) {
      return res.status(500).json({ success: false, error: "Failed to create Razorpay order" });
    }

    console.log("✅ Razorpay Order Created:", razorpayOrder);

    // ✅ Save order details in MongoDB
    const newBooking = new EventBooking({
      event: eventId,
      user: userId,
      tickets,
      premiumAccess,
      addOnServices,
      totalAmount, // Store the original amount in INR
      razorpayOrderId: razorpayOrder.id, // ✅ Corrected reference
      paymentStatus: "pending", // ✅ Ensure lowercase
    });

    await newBooking.save(); // ✅ Store the order in the database

    res.json({ success: true, order: razorpayOrder });

  } catch (error) {
    console.error("❌ Error Creating Order:", error);
    res.status(500).json({ success: false, error: "Error creating order" });
  }
};


const verifyPayment = async (req, res) => {
  try {
    console.log("📌 Payment Verification Request:", req.body);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      console.error("❌ Missing Payment Details:", req.body);
      return res.status(400).json({ success: false, message: "Missing payment details" });
    }

    // 🔍 Find the order in EventBooking
    const order = await EventBooking.findOne({ razorpayOrderId: razorpay_order_id });
    // console.log("📌 Found Order:", order);
    

    if (!order) {
      console.error("❌ Order Not Found:", razorpay_order_id);
      return res.status(400).json({ success: false, message: "Order not found" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Signature Mismatch:", expectedSignature, "!==", razorpay_signature);
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }

    // ✅ Update EventBooking Order Status
    order.isPaid = true;
    order.paymentStatus = "paid"; // ✅ Mark the payment as completed
    order.paymentId = razorpay_payment_id;

    await order.save(); // Save the updated order

    // ✅ Update ticketsSold in the Event Model
    const event = await Event.findById(order.event);

    if (event) {
      event.ticketsSold += order.tickets; // ✅ Increment ticketsSold by the booked tickets
      await event.save();
    } else {
      console.error("❌ Event Not Found:", order.eventId);
      return res.status(400).json({ success: false, message: "Associated event not found" });
    }

    console.log("✅ Payment Verified & Tickets Updated Successfully!");
    res.json({ success: true, message: "Payment verified & tickets updated" });

  } catch (error) {
    console.error("❌ Payment Verification Error:", error);
    res.status(500).json({ success: false, message: "Server error verifying payment" });
  }
};



const getUserBookings = async (req, res) => {
  try {
    const userId = req.user.userId; // Ensure correct field from Auth middleware

    // ✅ Fetch user bookings and populate event details
    const bookings = await EventBooking.find({ user: userId })
      .populate("event", "name date") // Populate only required fields from event
      .select("event tickets totalAmount paymentStatus razorpayOrderId paymentId createdAt"); // Select only necessary fields

    if (!bookings.length) {
      return res.status(404).json({ success: false, message: "No bookings found" });
    }

    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error("❌ Error fetching user bookings:", error);
    res.status(500).json({ success: false, message: "Error fetching bookings", error: error.message });
  }
};


const deleteEventBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    await EventBooking.findByIdAndDelete(bookingId);
    res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error });
  }
};

module.exports = {
  createOrder,
  getUserBookings,
  deleteEventBooking,
  verifyPayment
};