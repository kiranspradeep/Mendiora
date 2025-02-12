const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById
} = require('../controllers/eventController');
const multer = require("multer");
const { storage } = require("../config/cloudinaryConfig");
const upload = multer({ storage:storage });
const Auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware'); // Optional for role-based access

const eventRouter = express.Router();

// Public Routes
eventRouter.get('/getAllEvents', getAllEvents);
eventRouter.get('/:id', getEventById);

// Protected Routes
eventRouter.post('/createEvents', Auth, role(['organizer', 'admin']),upload.array("images", 5),createEvent);
eventRouter.put('/:id', Auth, role(['organizer', 'admin']), updateEventById);
eventRouter.delete('/:id', Auth, role(['admin']), deleteEventById);

module.exports = eventRouter