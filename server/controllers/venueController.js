const Venue = require("../models/venueModels");

// Create a new venue
const {cloudinary} = require('../config/cloudinaryConfig')
// Ensure your Venue model is imported


const createVenue = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      city,
      state,
      country,
      capacity,
      minPrice,
      maxPrice,
      categories,
      unavailableDates,
      isApproved,
    } = req.body;
// console.log(req.files)
// // console.log(req.file)
    // Upload images to Cloudinary
    const imageUploads = await Promise.all(
      req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: 'venues', // Optional: Store images in a "venues" folder
        })
      )
    );
// console.log("imageUploads",imageUploads)
    // Extract secure URLs from uploaded files
    const images = imageUploads.map((upload) => upload.secure_url);

    // Prepare venue data
    const venueData = {
      name,
      description,
      location: { address, city, state, country },
      capacity,
      minPrice,
      maxPrice,
      categories: categories.split(",").map((category) => category.trim()),
      owner: req.user.userId,
      images,
      unavailableDates,
      isApproved: isApproved || 'pending',
    };

    // Check for duplicate venue
    const existingVenue = await Venue.findOne({
      name: venueData.name,
      "location.address": venueData.location.address,
      owner: venueData.owner,
    });

    if (existingVenue) {
      return res.status(400).json({
        message: "Venue with the same name and address already exists for this owner",
      });
    }

    const venue = new Venue(venueData);
    await venue.save();

    res.status(201).json({ message: "Venue created successfully", venue });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate venue entry detected." });
    }
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

// Approve a venue
const approveVenue = async (req, res) => {
  try {
    const venueId = req.params.id;

    // Find the venue by ID and update the 'isApproved' field to 'approved'
    const venue = await Venue.findByIdAndUpdate(
      venueId,
      { isApproved: 'approved' },
      { new: true } // Return the updated venue
    );

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json({ message: "Venue approved successfully", venue });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Reject a venue
const rejectVenue = async (req, res) => {
  try {
    const venueId = req.params.id;

    // Find the venue by ID and update the 'isApproved' field to 'rejected'
    const venue = await Venue.findByIdAndUpdate(
      venueId,
      { isApproved: 'rejected' },
      { new: true } // Return the updated venue
    );

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.status(200).json({ message: "Venue rejected successfully", venue });
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
    const id = req.params.id;
    const { isApproved } = req.body; // Extract isApproved from the request body if available

    // Ensure the isApproved field, if provided, is a valid value
    if (isApproved && !['pending', 'approved', 'rejected'].includes(isApproved)) {
      return res.status(400).json({ message: "Invalid approval status" });
    }

    // Update the venue with the new data
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
  approveVenue,
  rejectVenue
};

