const express = require('express');
const Booking = require('../models/Booking');
const Resource = require('../models/Resource');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all bookings (for calendar view)
router.get('/all', async (req, res) => {
  try {
    const bookings = await Booking.find({ status: 'approved' })
      .populate('resource', 'name type location')
      .populate('user', 'name email society')
      .sort({ startDateTime: 1 });
    
    res.json(bookings);
  } catch (error) {
    console.error('Get all bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('resource', 'name type location')
      .sort({ startDateTime: -1 });
    
    res.json(bookings);
  } catch (error) {
    console.error('Get my bookings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new booking (with auto-approval)
router.post('/', auth, async (req, res) => {
  try {
    const startTime = Date.now(); // Track TSB metric
    
    const { resourceId, eventName, expectedAttendance, startDateTime, endDateTime } = req.body;

    // Validation
    if (!resourceId || !eventName || !expectedAttendance || !startDateTime || !endDateTime) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if resource exists
    const resource = await Resource.findById(resourceId);
    if (!resource || !resource.isActive) {
      return res.status(404).json({ message: 'Resource not found or inactive' });
    }

    // Validate attendance doesn't exceed capacity
    if (expectedAttendance > resource.capacity) {
      return res.status(400).json({ 
        message: `Expected attendance (${expectedAttendance}) exceeds resource capacity (${resource.capacity})` 
      });
    }

    // Validate dates
    // Parse dates - if they come as ISO strings, they're already in UTC
    // If they come as datetime-local strings (YYYY-MM-DDTHH:mm), treat as local time
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const now = new Date();
    
    // Ensure dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    if (start >= end) {
      return res.status(400).json({ message: 'End date must be after start date' });
    }

    if (start < now) {
      return res.status(400).json({ message: 'Cannot book in the past' });
    }

    // Check for conflicts
    const conflictingBookings = await Booking.find({
      resource: resourceId,
      status: 'approved',
      $or: [
        {
          startDateTime: { $lt: end },
          endDateTime: { $gt: start }
        }
      ]
    });

    const hasConflict = conflictingBookings.length > 0;
    const endTime = Date.now();
    const timeToBooking = Math.round((endTime - startTime) / 1000); // in seconds

    if (hasConflict) {
      // Create booking with rejected status for conflict tracking
      const booking = new Booking({
        user: req.user._id,
        resource: resourceId,
        eventName,
        society: req.user.society,
        expectedAttendance,
        startDateTime: start,
        endDateTime: end,
        status: 'rejected',
        hasConflict: true,
        timeToBooking
      });

      await booking.save();

      return res.status(409).json({
        message: 'Booking conflict detected',
        conflict: true,
        conflictingBookings: conflictingBookings.map(b => ({
          startDateTime: b.startDateTime,
          endDateTime: b.endDateTime,
          eventName: b.eventName,
          society: b.society
        }))
      });
    }

    // Create approved booking
    const booking = new Booking({
      user: req.user._id,
      resource: resourceId,
      eventName,
      society: req.user.society,
      expectedAttendance,
      startDateTime: start,
      endDateTime: end,
      status: 'approved',
      hasConflict: false,
      submissionTimestamp: new Date(),
      approvalTimestamp: new Date(),
      timeToBooking
    });

    await booking.save();

    // Populate and return
    await booking.populate('resource', 'name type location');
    await booking.populate('user', 'name email society');

    res.status(201).json({
      message: 'Booking created and approved successfully',
      booking
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get booking by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('resource', 'name type location')
      .populate('user', 'name email society');
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;




