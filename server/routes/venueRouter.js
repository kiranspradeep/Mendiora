const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venueController");
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const upload = multer({ storage });
const Role = require("../middlewares/roleMiddleware");
const Auth = require("../middlewares/authMiddleware"); // Import role middleware

// private routes
router.post("/createVenue",Auth,Role(["admin", "organizer"]),upload.array("images", 5), // Upload up to 5 images
    venueController.createVenue
  );
router.put("/:id",Auth, Role(["admin", "organizer"]), venueController.updateVenue); // Update a venue (admin or organizer only)
router.delete("/:id",Auth, Role(["admin", "organizer"]), venueController.deleteVenue); // Delete a venue (admin or organizer only)

//public routes
router.get("/", venueController.getAllVenues); // Get all venues (no auth required)
router.get("/:id", venueController.getVenueDetails); // Get a specific venue (no auth required)

module.exports = router;
