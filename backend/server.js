const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'AURA Backend API is running' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/metrics', require('./routes/metrics'));
app.use('/api/seed', require('./routes/seed'));

// Database connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/aura';

// Cache MongoDB connection for serverless (Vercel)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Connect to MongoDB
if (process.env.VERCEL !== '1') {
  // For local development, connect immediately
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });
} else {
  // For Vercel serverless, connect on first request
  app.use(async (req, res, next) => {
    try {
      await connectDB();
      next();
    } catch (error) {
      console.error('MongoDB connection error:', error);
      res.status(500).json({ 
        message: 'Database connection failed', 
        error: error.message,
        hint: 'Check MONGO_URI environment variable and MongoDB Atlas network access'
      });
    }
  });
}

// Error handling middleware (must be after routes)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Export for Vercel serverless (must be last)
module.exports = app;




