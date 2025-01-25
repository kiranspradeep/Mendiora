const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventDetails,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const Auth = require('../middlewares/authMiddleware');
const role = require('../middlewares/roleMiddleware'); // Optional for role-based access

const eventRouter = express.Router();

// Public Routes
eventRouter.get('/getAllEvents', getAllEvents);
eventRouter.get('/:id', getEventDetails);

// Protected Routes
eventRouter.post('/create', Auth, role(['organizer', 'admin']), createEvent);
eventRouter.put('/:id', Auth, role(['organizer', 'admin']), updateEvent);
eventRouter.delete('/:id', Auth, role(['admin']), deleteEvent);

module.exports = eventRouter
