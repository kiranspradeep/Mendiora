// models/Venue.js
const mongoose = require("mongoose");

const VenueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  capacity: { type: Number, required: true },
  minPrice: { 
    type: Number, 
    required: true, 
    min: [0, "Price cannot be negative"] // Validation for non-negative price
  },
  maxPrice: { 
    type: Number, 
    required: true
  },
  images: [String], // Store image URLs
  categories: {
    type: [String], // Allow multiple categories per venue
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "OrganizerAdmin", required: true },
  unavailableDates: [{ type: Date }],
  createdAt: { type: Date, default: Date.now },
  isapproved:{
    type:Boolean,
    default:false
  }
});


// Unique index to prevent the same owner from posting the same venue name at the same address
VenueSchema.index({ name: 1, "location.address": 1, owner: 1 }, { unique: true });


const Venue = mongoose.model('venue',VenueSchema)
module.exports=Venue