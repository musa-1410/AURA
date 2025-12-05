# Quick Setup Guide - AURA

## Prerequisites Check
- [ ] Node.js installed (check with `node --version`)
- [ ] MongoDB installed and running (check with `mongod` or MongoDB service)

## Step-by-Step Setup

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (copy from template)
# Windows PowerShell:
Copy-Item env.template .env

# Linux/Mac:
# cp env.template .env

# Edit .env file and ensure MongoDB URI is correct:
# MONGO_URI=mongodb://localhost:27017/aura

# Seed initial resources
node scripts/seedResources.js

# Start backend server
npm run dev
```

**Expected Output:**
```
MongoDB connected successfully
Server running on port 5000
```

### 2. Frontend Setup (Terminal 2 - New Terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend server
npm start
```

**Expected Output:**
```
Compiled successfully!
You can now view aura-frontend in the browser.
  Local:            http://localhost:3000
```

### 3. Access the Application

1. Open browser: `http://localhost:3000`
2. Click "Register" to create an account
3. Fill in: Name, Email, Society, Password
4. You'll be automatically logged in and redirected to Dashboard

### 4. Test the Application

1. **View Calendar**: Click "Calendar" to see all bookings
2. **Create Booking**: Click "New Requisition" to submit a booking
3. **My Bookings**: Click "My Bookings" to see your requests

## Common Issues & Solutions

### Issue: MongoDB not connecting
**Solution**: 
- Ensure MongoDB is running: `mongod` or start MongoDB service
- sudo systemctl start mongod / sudo service mongod start
- Check if port 27017 is available
- Verify MONGO_URI in `.env` file

### Issue: Port 5000 already in use
**Solution**: 
- Change PORT in backend `.env` file
- Update frontend API calls in `src/context/AuthContext.js` and all API files

### Issue: Port 3000 already in use
**Solution**: 
- React will automatically suggest using port 3001
- Accept the prompt or manually set PORT: `set PORT=3001 && npm start`

### Issue: Module not found errors
**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: React Scripts not found
**Solution**:
```bash
cd frontend
npm install react-scripts --save
```

## Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] MongoDB connected successfully
- [ ] Resources seeded (8 resources in database)
- [ ] Can register new user
- [ ] Can login
- [ ] Can view calendar
- [ ] Can create booking
- [ ] Can view my bookings

## Next Steps

Once setup is complete:
1. Register multiple test users
2. Create test bookings
3. Test conflict detection (try booking same resource at same time)
4. View metrics at: `http://localhost:5000/api/metrics`

