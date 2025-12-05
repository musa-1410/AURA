# AURA - Campus Requisition Management System

A comprehensive MERN stack application for digitalizing campus resource requisition management at GIKI. This MVP focuses on providing visibility into resource bookings and streamlining the requisition process with auto-approval functionality.

## Project Overview

AURA solves the manual, paper-based process of ground booking and lecture hall requisition by providing:
- **Real-time Calendar View**: See all existing bookings across all resources
- **Online Requisition System**: Submit booking requests instantly
- **Auto-Approval Logic**: Automatic conflict checking and approval
- **My Bookings Dashboard**: Track all your booking requests

## Tech Stack

- **Frontend**: React 18, React Router, Axios, React Calendar
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## Project Structure

```
AURA/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Resource.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── bookings.js
│   │   ├── resources.js
│   │   └── metrics.js
│   ├── middleware/
│   │   └── auth.js
│   ├── scripts/
│   │   └── seedResources.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **MongoDB** (v4.4 or higher) - Make sure MongoDB is running on your system

## Installation & Setup

### Step 1: Clone/Download the Project

Navigate to the AURA directory:
```bash
cd AURA
```

### Step 2: Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
# On Windows (PowerShell)
Copy-Item env.template .env

# On Linux/Mac
cp env.template .env
```

4. Edit the `.env` file with your MongoDB connection string:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/aura
JWT_SECRET=aura_secret_key_change_in_production
```

**Note**: If your MongoDB is running on a different port or requires authentication, update the `MONGO_URI` accordingly.

### Step 3: Seed Initial Resources

Run the seed script to populate the database with initial resources:
```bash
node scripts/seedResources.js
```

You should see:
```
Connected to MongoDB
Cleared existing resources
Successfully seeded 8 resources
```

### Step 4: Start the Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

The backend server will start on `http://localhost:5000`

### Step 5: Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

**Note**: If you encounter issues with `react-scripts`, you may need to install it explicitly:
```bash
npm install react-scripts --save
```

### Step 6: Start the Frontend Development Server

```bash
npm start
```

The frontend will start on `http://localhost:3000` and should automatically open in your browser.

## Running the Application

### Start Both Servers

You need to run both the backend and frontend servers simultaneously:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

### Access the Application

1. Open your browser and navigate to: `http://localhost:3000`
2. You'll be redirected to the login page
3. Register a new account or login with existing credentials

## Features

### 1. Authentication
- User registration with name, email, password, and society
- Secure login with JWT tokens
- Protected routes requiring authentication

### 2. Resource Calendar View
- View all approved bookings across all resources
- Filter bookings by resource type
- Visual calendar with booking indicators
- Detailed booking information for selected dates

### 3. New Requisition Form
- Select from available resources (grounds/lecture halls)
- Choose date and time slots
- Enter event details (name, expected attendance)
- Automatic conflict detection
- Instant auto-approval if no conflicts

### 4. My Bookings Dashboard
- View all your booking requests
- Filter by status (approved, pending, rejected)
- View booking statistics
- Detailed booking information

### 5. Metrics Tracking
The system tracks three key metrics:
- **Time to Successful Booking (TSB)**: Average time from login to approved submission
- **Active Society Engagement (ASE)**: Percentage of registered users who submitted bookings
- **Conflict Rate (CR)**: Percentage of requests that failed due to conflicts

Access metrics at: `http://localhost:5000/api/metrics`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/:id` - Get single resource

### Bookings
- `GET /api/bookings/all` - Get all approved bookings (for calendar)
- `GET /api/bookings/my-bookings` - Get user's bookings (protected)
- `POST /api/bookings` - Create new booking (protected)
- `GET /api/bookings/:id` - Get single booking (protected)

### Metrics
- `GET /api/metrics` - Get all metrics (TSB, ASE, CR)

## Database Schema

### User Model
- name, email, password, society, role, registrationDate

### Resource Model
- name, type (ground/lecture_hall), capacity, location, description, isActive

### Booking Model
- user, resource, eventName, society, expectedAttendance
- startDateTime, endDateTime, status
- submissionTimestamp, approvalTimestamp, timeToBooking, hasConflict

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check MongoDB service
- Verify connection string in `.env` file
- Check if MongoDB is running on the default port (27017)

### Port Already in Use
- Backend: Change `PORT` in `.env` file
- Frontend: React will prompt to use a different port (usually 3001)

### CORS Errors
- Ensure backend is running on port 5000
- Check that `cors` middleware is enabled in `server.js`

### Module Not Found Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### React Scripts Issues
```bash
cd frontend
npm install react-scripts --save
```

## Development Notes

- The MVP uses auto-approval for all bookings (no admin panel)
- Conflict detection prevents double-booking of resources
- All bookings are immediately visible in the calendar after approval
- Metrics are calculated in real-time from the database

## Future Enhancements

- Admin dashboard for manual approval/rejection
- Email/SMS notifications
- Resource management (add/edit/delete resources)
- Integration with GIKI's official authentication system
- Advanced filtering and search capabilities
- Booking cancellation functionality

## Team

**Agency Team**
- Mohammad Musa Ali
- Muhammad Umer
- Muhammad

## License

This project is developed for CS391 Complex Computing Problem at GIKI.

---

**For any issues or questions, please refer to the project documentation or contact the development team.**

