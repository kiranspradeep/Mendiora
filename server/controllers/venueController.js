const Venue = require("../models/venueModels");

// Create a new venue
const createVenue = async (req, res) => {
  try {
    const { name, description, location, capacity, minPrice, maxPrice, categories } = req.body;

    // Extract secure URLs from uploaded files
    const images = req.files.map(file => file.path);

    const venue = new Venue({
      name,
      description,
      location: JSON.parse(location),
      capacity,
      minPrice,
      maxPrice,
      categories,
      owner: req.user._id,
      images,
    });

    await venue.save();
    res.status(201).json({ message: "Venue created successfully", venue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
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
