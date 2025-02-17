const Venue = require("../models/venueModels");

// Create a new venue
const {cloudinary} = require('../config/cloudinaryConfig')
// Ensure your Venue model is imported


const allowedCategories = [
  "Corporate Event Management",
  "Wedding Planners & Management",
  "Entertainment & Show Management",
  "Birthday Party & Venue Management"
];

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

    // Ensure categories is an array
    let categoryList = [];

    if (Array.isArray(categories)) {
      categoryList = categories.map((category) => category.trim());
    } else if (typeof categories === "string") {
      categoryList = categories.split(",").map((category) => category.trim());
    } else {
      return res.status(400).json({ message: "Invalid category format" });
    }

    // Validate categories
    const invalidCategories = categoryList.filter(category => !allowedCategories.includes(category));

    if (invalidCategories.length > 0) {
      return res.status(400).json({
        message: `Invalid category values: ${invalidCategories.join(', ')}`,
      });
    }

    // Upload images to Cloudinary
    const imageUploads = await Promise.all(
      req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: 'venues',
        })
      )
    );

    const images = imageUploads.map((upload) => upload.secure_url);

    const venueData = {
      name,
      description,
      location: { address, city, state, country },
      capacity,
      minPrice,
      maxPrice,
      categories: categoryList,
      owner: req.user.userId,
      images,
      unavailableDates,
      isApproved: isApproved || 'pending',
    };

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
    console.error(error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate venue entry detected." });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//get venues based on categories
const getVenueCategory = async (req, res) => { 
  const { category } = req.query; // Get the category from the query string

  try {
    // Build the filter dynamically if category is provided and check for approved venues
    const filter = {
      ...(category ? { categories: category } : {}),
      isApproved: "approved", // Ensure only approved venues are fetched
    };

    const venues = await Venue.find(filter)
      .sort({ createdAt: -1 })
      .populate("owner", "name email");

    const detailedVenues = venues.map(venue => ({
      id: venue._id,
      name: venue.name,
      description: venue.description,
      location: {
        address: venue.location.address,
        city: venue.location.city,
        state: venue.location.state,
        country: venue.location.country,
      },
      capacity: venue.capacity,
      priceRange: {
        minPrice: venue.minPrice,
        maxPrice: venue.maxPrice,
      },
      images: venue.images,
      categories: venue.categories,
      owner: venue.owner,
      unavailableDates:venue.unavailableDates,
    }));

    res.status(200).json({ venues: detailedVenues });
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
  rejectVenue,
  getVenueCategory
};

