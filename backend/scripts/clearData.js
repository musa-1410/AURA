const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Resource = require('../models/Resource');
const Booking = require('../models/Booking');
const User = require('../models/User');

dotenv.config();

async function clearAllData() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aura';
    
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear all collections while keeping structure
    const resourceResult = await Resource.deleteMany({});
    console.log(`Cleared ${resourceResult.deletedCount} resources`);

    const bookingResult = await Booking.deleteMany({});
    console.log(`Cleared ${bookingResult.deletedCount} bookings`);

    const userResult = await User.deleteMany({});
    console.log(`Cleared ${userResult.deletedCount} users`);

    console.log('All data cleared successfully. Database structure preserved.');

    process.exit(0);
  } catch (error) {
    console.error('Error clearing data:', error);
    process.exit(1);
  }
}

clearAllData();

