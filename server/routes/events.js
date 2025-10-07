const express = require('express');
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getMyEvents
} = require('../controllers/eventController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes (but can use auth middleware for additional features)
router.get('/', (req, res, next) => {
  // Optional auth - don't require token but use it if present
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, getAllEvents);

router.get('/:id', (req, res, next) => {
  // Optional auth - don't require token but use it if present
  if (req.headers.authorization) {
    return protect(req, res, next);
  }
  next();
}, getEventById);

// Protected routes
router.post('/', protect, createEvent);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);
router.get('/my-events', protect, getMyEvents);

module.exports = router;