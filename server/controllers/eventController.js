const Event = require('../models/eventModels');
const { cloudinary } = require('../config/cloudinaryConfig');

const allowedCategories = [
  "Corporate Event",
  "Music Concerts",
  "Fashion shows",
  "Dj Party"
];

const addOnOptions = ["Catering", "Parking", "Security", "Wi-Fi"];

const createEvent = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      state,
      country,
      date,
      capacity,
      basePrice,
      premiumAccess,
      addOnServices,
      featuredPerformer,
      category,
      isApproved,
    } = req.body;

    // Validate category (only one allowed)
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({
        message: `Invalid category value: '${category}'. Allowed categories are: ${allowedCategories.join(', ')}`,
      });
    }

    // Ensure addOnServices is an array
    const parsedAddOnServices = Array.isArray(addOnServices)
      ? addOnServices
      : addOnServices
      ? [addOnServices]
      : [];

    // Validate addOnServices without using filter
    let invalidAddOns = [];
    for (let service of parsedAddOnServices) {
      if (!addOnOptions.includes(service)) {
        invalidAddOns.push(service);
      }
    }

    if (invalidAddOns.length > 0) {
      return res.status(400).json({
        message: `Invalid add-on services: ${invalidAddOns.join(', ')}. Allowed options are: ${addOnOptions.join(', ')}`,
      });
    }

    // Upload images to Cloudinary
    const imageUploads = await Promise.all(
      req.files.map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: 'events',
        })
      )
    );

    const images = imageUploads.map((upload) => upload.secure_url);

    const newEvent = new Event({
      name,
      location: { address, city, state, country },
      date,
      capacity,
      basePrice,
      premiumAccess,
      addOnServices: parsedAddOnServices,
      featuredPerformer,
      categories: [category], // Save as an array with a single category
      images,
      isApproved: isApproved || 'pending',
      owner: req.user.userId, // Ensure this is correctly retrieved
    });

    const existingEvent = await Event.findOne({
      name: newEvent.name,
      "location.address": newEvent.location.address,
      owner: newEvent.owner
    });

    if (existingEvent) {
      return res.status(400).json({
        message: `Event with name '${newEvent.name}' and location '${newEvent.location.address}' already exists. Please choose a different name or location.`,
      });
    }
    
    const event = new Event(newEvent);
    await event.save();

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.log(error);
    
    if (error.code === 11000) {
      return res.status(400).json({ message: "Duplicate event entry detected. An event with the same name, address, and date already exists for this owner." });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllEvents = async (req, res) => {
    try {
      const { category, location, sortBy, page = 1, limit = 10 } = req.query;
  
      const query = { isApproved: "approved" }; // Only fetch approved events
  
      if (category) {
        query.categories = category;
      }
  
      if (location) {
        query.$or = [
          { "location.city": { $regex: location, $options: "i" } },
          { "location.country": { $regex: location, $options: "i" } }
        ];
      }
  
      const skip = (page - 1) * limit;
  
      const sortOptions = {};
      if (sortBy === "date") sortOptions.date = 1;
      if (sortBy === "price") sortOptions.basePrice = 1;
  
      const events = await Event.find(query)
        .populate("owner", "name email")
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit));
  
      const totalEvents = await Event.countDocuments(query);
  
      res.status(200).json({
        events,
        totalEvents,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalEvents / limit),
        pageSize: parseInt(limit)
      });
    } catch (err) {
      res.status(500).json({ message: "Error fetching events", error: err.message });
    }
  };
  
  
//to get all pending events
  const getPendingEvents = async (req, res) => {
    try {
      const events = await Event.find({ isApproved: "pending" }).populate("owner", "name email");
      
      console.log("✅ Events Fetched:", events);
  
      if (events.length === 0) {
        return res.status(200).json({ message: "No pending events found", events: [] });
      }
  
      res.status(200).json({ events });
    } catch (err) {
      console.log("❌hghdthtdtts:", err);
      
      console.error("❌ Error fetching pending events:", err); // This will show the exact error
      res.status(500).json({ message: "Error fetching pending events", error: err.message });
    }
  };
  
  

 
  const approveEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
  
      const event = await Event.findByIdAndUpdate(
        eventId,
        { isApproved: "approved" },
        { new: true } // Return updated document
      );
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event approved successfully", event });
    } catch (err) {
      res.status(500).json({ message: "Error approving event", error: err.message });
    }
  };
  
  const rejectEvent = async (req, res) => {
    try {
      const { eventId } = req.params;
  
      const event = await Event.findByIdAndUpdate(
        eventId,
        { isApproved: "rejected" },
        { new: true } // Return updated document
      );
  
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event rejected successfully", event });
    } catch (err) {
      res.status(500).json({ message: "Error rejecting event", error: err.message });
    }
  };  
  

const getEventById = async (req, res) => {
  console.log("🔍 Fetching event by ID...");
  
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.category && !allowedCategories.includes(updateData.category)) {
      return res.status(400).json({
        message: `Invalid category value: '${updateData.category}'. Allowed categories are: ${allowedCategories.join(', ')}`,
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
  } catch (err) {
    res.status(500).json({ message: "Error updating event", error: err.message });
  }
};

const deleteEventById = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllEvents,
  createEvent,
  getEventById,
  updateEventById,
  deleteEventById,
  getPendingEvents,
  approveEvent, 
  rejectEvent
};