const express = require("express");
const venueRouter = express.Router();
const venueController = require("../controllers/venueController");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const upload = multer({ storage });
const Role = require("../middlewares/roleMiddleware");
const Auth = require("../middlewares/authMiddleware"); // Import role middleware

// private routes
venueRouter.post("/createVenue",Auth,Role(["admin", "organizer"]),upload.array("images", 5), // Upload up to 5 images
    venueController.createVenue
  );
venueRouter.put('/approveVenue',Auth,Role(["admin"]), venueController.approveVenue);  
venueRouter.put('/rejectVenue',Auth,Role(["admin"]), venueController.rejectVenue);  
venueRouter.put("/:id",Auth, Role(["admin", "organizer"]), venueController.updateVenue); // Update a venue (admin or organizer only)
venueRouter.delete("/:id",Auth, Role(["admin", "organizer"]), venueController.deleteVenue); // Delete a venue (admin or organizer only)

//public routes
venueRouter.get("/", venueController.getAllVenues); // Get all venues (no auth required)
venueRouter.get("/:id", venueController.getVenueDetails); // Get a specific venue (no auth required)

module.exports = venueRouter;
