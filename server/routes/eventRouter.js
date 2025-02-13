const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
  getPendingEvents,
  approveEvent, 
  rejectEvent
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
eventRouter.get('/getpendingEvents', Auth, role(['admin']),getPendingEvents);
eventRouter.get('/approveEvents', Auth, role(['admin']), approveEvent);
eventRouter.get('/rejectEvents', Auth, role(['admin']), rejectEvent);
eventRouter.delete('/:id', Auth, role(['admin']), deleteEventById);

module.exports = eventRouter