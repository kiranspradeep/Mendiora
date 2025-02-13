const mongoose = require("mongoose");

const VenueBookingSchema = new mongoose.Schema({
  venueId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Venue",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  capacity: {
    type: String,
    enum: ["half", "full"],
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("VenueBooking", VenueBookingSchema);
