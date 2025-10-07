const express = require('express');
const {
  registerForEvent,
  cancelRegistration,
  getMyRegistrations,
  getEventAttendees
} = require('../controllers/registrationController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All registration routes are protected
router.post('/:eventId', protect, registerForEvent);
router.delete('/:eventId', protect, cancelRegistration);
router.get('/my-registrations', protect, getMyRegistrations);
router.get('/event/:eventId/attendees', protect, getEventAttendees);

module.exports = router;