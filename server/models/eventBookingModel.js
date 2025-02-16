const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tickets: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
