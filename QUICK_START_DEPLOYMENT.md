# 🚀 Quick Start: Deploy AURA to Vercel

## Overview
This guide will help you deploy your AURA project to Vercel in about 30 minutes. You'll get a live URL that you can share with your instructor.

---

## ✅ What You Need

1. **GitHub Account** - Your code should be in a GitHub repo
2. **Vercel Account** - Free at [vercel.com](https://vercel.com)
3. **MongoDB Atlas Account** - Free at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)

---

## 📋 Step-by-Step Instructions

### STEP 1: Set Up MongoDB Atlas (5 min)

1. Go to https://www.mongodb.com/cloud/atlas → Click "Try Free"
2. Create account and verify email
3. **Create Cluster:**
   - Click "Build a Database"
   - Choose "M0 FREE" tier
   - Select AWS as provider
   - Choose closest region
   - Click "Create" (wait 2-3 minutes)

4. **Create Database User:**
   - Go to "Database Access" → "Add New Database User"
   - Username: `aura-user`
   - Password: Create strong password (SAVE IT!)
   - Privileges: "Atlas admin"
   - Click "Add User"

5. **Allow Network Access:**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

6. **Get Connection String:**
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `aura`
   - **Example:** `mongodb+srv://aura-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aura?retryWrites=true&w=majority`
   - **SAVE THIS!** You'll need it next.

---

### STEP 2: Deploy Backend (10 min)

1. **Go to Vercel Dashboard:**
   - Visit https://vercel.com/dashboard
   - Sign up/login (use GitHub to sign up)

2. **Create New Project:**
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Click "Import"

3. **Configure Project:**
   - **Root Directory:** Click "Edit" → Select `backend` folder
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)
   - **Install Command:** `npm install`

4. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add these TWO variables:
   
   **Variable 1:**
   - Name: `MONGO_URI`
   - Value: Your MongoDB Atlas connection string from Step 1
   - Environments: ✅ Production ✅ Preview ✅ Development
   
   **Variable 2:**
   - Name: `JWT_SECRET`
   - Value: `aura_secret_key_production_2024` (or any random string)
   - Environments: ✅ Production ✅ Preview ✅ Development
   
   - Click "Save" after each variable

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - **Copy the URL** (e.g., `https://aura-backend-xxxxx.vercel.app`)
   - **SAVE THIS URL!** You'll need it for frontend.

---

### STEP 3: Deploy Frontend (10 min)

1. **Create Another Project:**
   - In Vercel Dashboard, click "Add New..." → "Project"
   - Select the same GitHub repository
   - Click "Import"

2. **Configure Project:**
   - **Root Directory:** Click "Edit" → Select `frontend` folder
   - **Framework Preset:** Create React App (should auto-detect)
   - **Build Command:** `npm run build` (should auto-detect)
   - **Output Directory:** `build` (should auto-detect)

3. **Add Environment Variable:**
   - Click "Environment Variables"
   - Add:
   
   **Variable:**
   - Name: `REACT_APP_API_URL`
   - Value: Your backend URL from Step 2 (e.g., `https://aura-backend-xxxxx.vercel.app`)
   - Environments: ✅ Production ✅ Preview ✅ Development
   
   - Click "Save"

4. **Deploy:**
   - Click "Deploy"
   - Wait 3-5 minutes
   - **Copy the frontend URL** (e.g., `https://aura-frontend-xxxxx.vercel.app`)
   - **THIS IS YOUR LIVE APP URL!** 🎉

---

### STEP 4: Seed Database (5 min)

After both deployments are complete, seed the database with resources:

**Option A: Using Seed Script (Recommended)**

1. Open terminal/command prompt
2. Navigate to backend folder:
   ```bash
   cd backend
   ```
3. Run seed script with your MongoDB connection string:
   ```bash
   MONGO_URI="mongodb+srv://aura-user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aura?retryWrites=true&w=majority" npm run seed
   ```
   (Replace with your actual connection string)

**Option B: Using Seed API Endpoint**

1. Add `SEED_SECRET` environment variable in Vercel backend:
   - Go to backend project → Settings → Environment Variables
   - Add: `SEED_SECRET` = `your-secret-key-here`
   - Redeploy backend

2. Call the seed endpoint:
   ```bash
   curl -X POST https://your-backend-url.vercel.app/api/seed/resources \
     -H "Content-Type: application/json" \
     -d '{"secret":"your-secret-key-here"}'
   ```

---

### STEP 5: Test Everything (5 min)

1. **Visit your frontend URL** (from Step 3)
2. **Test these features:**
   - ✅ Register a new user
   - ✅ Login
   - ✅ View Dashboard
   - ✅ Create a new booking
   - ✅ View Calendar
   - ✅ View My Bookings
   - ✅ View History

3. **If something doesn't work:**
   - Check browser console (F12) for errors
   - Check Vercel deployment logs
   - See Troubleshooting section below

---

## 🔧 Troubleshooting

### Backend Issues

**Problem:** MongoDB connection errors
- ✅ Check MongoDB Atlas network access allows 0.0.0.0/0
- ✅ Verify connection string format (no spaces)
- ✅ Ensure password in connection string is correct
- ✅ Redeploy backend after fixing

**Problem:** CORS errors
- ✅ Backend already has CORS enabled
- ✅ Check that frontend URL is correct in `REACT_APP_API_URL`

**Problem:** Environment variables not working
- ✅ Redeploy after adding/changing environment variables
- ✅ Variable names are case-sensitive
- ✅ Check all environments (Production, Preview, Development) are selected

### Frontend Issues

**Problem:** API calls failing
- ✅ Verify `REACT_APP_API_URL` matches your backend URL exactly
- ✅ Check backend URL is accessible (open in browser)
- ✅ Ensure backend is deployed and working
- ✅ Check browser console for specific error messages

**Problem:** Build fails
- ✅ Check build logs in Vercel dashboard
- ✅ Ensure all dependencies are in package.json
- ✅ Check for syntax errors

---

## 📝 Important Notes

1. **Environment Variables:**
   - Always redeploy after adding/changing environment variables
   - Backend URL might change if you redeploy - update frontend's `REACT_APP_API_URL` if needed

2. **MongoDB Atlas:**
   - Free tier: 512MB storage (enough for testing)
   - Keep connection string secure - don't share publicly

3. **Vercel:**
   - Free tier: 100GB bandwidth/month
   - Serverless functions have 10s timeout limit
   - Unlimited deployments

4. **After Deployment:**
   - Your frontend URL is your live app
   - Share this URL with your instructor
   - Both frontend and backend URLs are permanent (unless you delete projects)

---

## ✅ Success Checklist

- [ ] MongoDB Atlas cluster created and accessible
- [ ] Backend deployed to Vercel
- [ ] Frontend deployed to Vercel
- [ ] Database seeded with resources
- [ ] Can register new users
- [ ] Can create bookings
- [ ] All features working correctly
- [ ] Frontend URL shared with instructor

---

## 🎯 Your URLs

After deployment, you'll have:

- **Frontend URL:** `https://aura-frontend-xxxxx.vercel.app` ← **Share this with instructor**
- **Backend URL:** `https://aura-backend-xxxxx.vercel.app`
- **MongoDB Atlas:** https://cloud.mongodb.com

---

## 🆘 Need Help?

1. Check Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure MongoDB Atlas is accessible
5. Make sure both deployments completed successfully

---

## 🎉 You're Done!

Once everything is working, your frontend URL is ready to share. The app is live and accessible from anywhere!

**Good luck with your project!** 🚀

