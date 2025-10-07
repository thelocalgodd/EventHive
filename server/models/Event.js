const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  eventType: {
    type: String,
    enum: ['public', 'corporate'],
    default: 'public'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  isVirtual: {
    type: Boolean,
    default: false
  },
  capacity: {
    type: Number,
    required: [true, 'Capacity is required']
  },
  registeredCount: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  },
  tags: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'cancelled', 'completed'],
    default: 'draft'
  },
  accessControl: {
    isPrivate: {
      type: Boolean,
      default: false
    },
    accessCode: {
      type: String
    },
    allowedDomains: [{
      type: String
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create text search index for title and description
eventSchema.index({ 
  title: 'text', 
  description: 'text' 
});

// Index for common queries
eventSchema.index({ status: 1, date: 1 });
eventSchema.index({ organizer: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ eventType: 1 });

module.exports = mongoose.model('Event', eventSchema);