const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/metrics', require('./routes/metrics'));
app.use('/api/seed', require('./routes/seed'));

// Database connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aura';

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
  // Only listen on port if not in Vercel serverless environment
  if (process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  if (process.env.VERCEL !== '1') {
    process.exit(1);
  }
});

// Export for Vercel serverless
module.exports = app;

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});




