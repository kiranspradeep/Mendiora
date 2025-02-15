const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  date: { type: Date, required: true },
  capacity: { type: Number, required: true },
  categories: { type: [String], required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "OrganizerAdmin", required: true },
  ticketsSold: { type: Number, default: 0 },
  basePrice: { type: Number, required: true },
  premiumAccess: { type: Boolean, default: false },
  addOnServices: { type: [String], default: [] },
  featuredPerformer: { type: String },
  images: { type: [String], default: [] },
  isApproved: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

// Unique index to prevent the same owner from posting the same event name at the same address on the same date
eventSchema.index(
  { name: 1, "location.address": 1, date: 1, owner: 1 },
  { unique: true }
);

eventSchema.methods.calculateDynamicPrice = function () {
  let price = this.basePrice;

  if (this.premiumAccess) price += 100;
  if (this.addOnServices.includes("catering")) price += 50;
  if (this.addOnServices.includes("parking")) price += 25;
  if (this.featuredPerformer === "Top Artist") price *= 1.5;

  const dayOfWeek = new Date(this.date).getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) price *= 1.2;

  return parseFloat(price.toFixed(2));
};


const Event = mongoose.model("Event", eventSchema);
module.exports = Event;