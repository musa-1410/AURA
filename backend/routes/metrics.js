const express = require('express');
const Booking = require('../models/Booking');
const User = require('../models/User');

const router = express.Router();

// Get all metrics
router.get('/', async (req, res) => {
  try {
    // Time to Successful Booking (TSB) - Average time in seconds
    const approvedBookings = await Booking.find({ 
      status: 'approved',
      timeToBooking: { $gt: 0 }
    });
    
    const totalTSB = approvedBookings.reduce((sum, booking) => sum + (booking.timeToBooking || 0), 0);
    const avgTSB = approvedBookings.length > 0 ? (totalTSB / approvedBookings.length) : 0;

    // Active Society Engagement (ASE) - Percentage of registered users who submitted at least one booking
    const totalUsers = await User.countDocuments();
    const usersWithBookings = await Booking.distinct('user');
    const ase = totalUsers > 0 ? ((usersWithBookings.length / totalUsers) * 100) : 0;

    // Conflict Rate (CR) - Percentage of requests that failed due to conflicts
    const totalBookings = await Booking.countDocuments();
    const conflictBookings = await Booking.countDocuments({ hasConflict: true });
    const cr = totalBookings > 0 ? ((conflictBookings / totalBookings) * 100) : 0;

    res.json({
      timeToSuccessfulBooking: {
        average: Math.round(avgTSB),
        unit: 'seconds',
        totalBookings: approvedBookings.length
      },
      activeSocietyEngagement: {
        percentage: Math.round(ase * 100) / 100,
        usersWithBookings: usersWithBookings.length,
        totalUsers: totalUsers
      },
      conflictRate: {
        percentage: Math.round(cr * 100) / 100,
        conflictBookings: conflictBookings,
        totalBookings: totalBookings
      }
    });
  } catch (error) {
    console.error('Get metrics error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;







