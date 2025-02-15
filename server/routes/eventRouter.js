const express = require("express");
const { 
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  getPendingEvents,
  approveEvent,
  rejectEvent
} = require("../controllers/eventController");

const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const upload = multer({ storage: storage });
const Auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

const eventRouter = express.Router();



// Protected Routes
eventRouter.post("/createEvent", Auth, role(["organizer", "admin"]), upload.array("images", 5), createEvent);
eventRouter.put("/:id", Auth, role(["organizer", "admin"]), updateEventById);
eventRouter.delete("/delete/:id", Auth, role(["organizer"]), deleteEventById);

// Admin Routes
eventRouter.get('/getpendingEvents', Auth, role(['admin']), getPendingEvents);
eventRouter.put("/approveEvent/:eventId", Auth, role(["admin"]), approveEvent);
eventRouter.put("/rejectEvent/:eventId", Auth, role(["admin"]), rejectEvent);


// Public Routes
eventRouter.get("/getAllEvents", getAllEvents);
eventRouter.get("/get/:id", getEventById);

module.exports = eventRouter;
