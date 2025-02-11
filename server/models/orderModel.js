const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  venue: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Venue", 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true 
  },
  totalAmount: { 
    type: Number, 
    required: true, 
    min: [0, "Total amount cannot be negative"] 
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending"
  },
  orderStatus: {
    type: String,
    enum: ["confirmed", "cancelled", "completed"],
    default: "confirmed"
  },
  razorpayOrderId: {
    type: String
  },
  razorpayPaymentId: {
    type: String
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Ensure a user cannot book the same venue for overlapping dates
OrderSchema.index(
  { venue: 1, startDate: 1, endDate: 1 },
  { unique: true, partialFilterExpression: { orderStatus: { $ne: "cancelled" } } }
);

// Validation to ensure endDate is not before startDate
OrderSchema.pre("validate", function (next) {
  if (this.endDate < this.startDate) {
    return next(new Error("End date must be the same or after the start date."));
  }
  next();
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
