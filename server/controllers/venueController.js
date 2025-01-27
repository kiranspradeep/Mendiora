const Venue = require("../models/venueModels");

// Create a new venue
const createVenue = async (req, res) => {
    try {
      const {
        name,
        description,
        location,
        capacity,
        minPrice,
        maxPrice,
        images,
        categories,
      } = req.body;
  
      // Check if the venue already exists for this owner
      const existingVenue = await Venue.findOne({
        name,
        "location.address": location.address,
        owner: req.user.id,
      });
  
      if (existingVenue) {
        return res.status(400).json({
          message: "You cannot create a venue with the same name and address.",
        });
      }
  
      // Create a new venue
      const newVenue = new Venue({
        name,
        description,
        location,
        capacity,
        minPrice,
        maxPrice,
        images,
        categories,
        owner: req.user.id, // req.user is set by auth middleware
      });
  
      const savedVenue = await newVenue.save();
  
      res.status(201).json({
        message: "Venue created successfully",
        venue: savedVenue,
      });
    } catch (error) {
      // Handle duplicate key error from the database (if any)
      if (error.code === 11000) {
        return res.status(400).json({
          message: "Duplicate venue name and address for this owner.",
        });
      }
      res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };
  

// Get all venues
const getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.find().sort({ createdAt: -1 }).populate("owner", "name email");
    res.status(200).json({ venues });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a single venue by ID
const getVenueDetails = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).populate("owner", "name email");
    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.status(200).json({ venue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update a venue
const updateVenue = async (req, res) => { 
  try {
    const id  = req.params.id;
        
    const updatedVenue = await Venue.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.status(200).json({ message: "Venue updated successfully", venue: updatedVenue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a venue
const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVenue = await Venue.findByIdAndDelete(id);
    if (!deletedVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }
    res.status(200).json({ message: "Venue deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createVenue,
  getAllVenues,
  getVenueDetails,
  updateVenue,
  deleteVenue,
};
