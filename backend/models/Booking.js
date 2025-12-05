const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  resource: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resource',
    required: true
  },
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  society: {
    type: String,
    required: true,
    trim: true
  },
  expectedAttendance: {
    type: Number,
    required: true,
    min: 1
  },
  startDateTime: {
    type: Date,
    required: true
  },
  endDateTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'approved' // Auto-approved for MVP
  },
  // Metrics tracking
  submissionTimestamp: {
    type: Date,
    default: Date.now
  },
  approvalTimestamp: {
    type: Date,
    default: Date.now
  },
  timeToBooking: {
    type: Number, // in seconds
    default: 0
  },
  hasConflict: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient conflict checking
bookingSchema.index({ resource: 1, startDateTime: 1, endDateTime: 1 });
bookingSchema.index({ user: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);




