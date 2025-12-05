# Vercel Deployment Guide for AURA

This guide will walk you through deploying your AURA project on Vercel.

## Prerequisites

1. **GitHub Account** - Your code should be in a GitHub repository
2. **Vercel Account** - Sign up at [vercel.com](https://vercel.com) (free tier is sufficient)
3. **MongoDB Atlas Account** - We'll use cloud MongoDB instead of local

---

## Step 1: Set Up MongoDB Atlas (Cloud Database)

Since local MongoDB won't be accessible from Vercel, we need to use MongoDB Atlas:

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account (M0 Free Tier)

2. **Create a Cluster**
   - Click "Create" → Choose "M0 FREE" → Select a cloud provider and region → Click "Create Cluster"
   - Wait for cluster to be created (2-3 minutes)

3. **Set Up Database Access**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and password (save these!)
   - Set privileges to "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `aura` (or your preferred database name)
   - Example: `mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/aura?retryWrites=true&w=majority`
   - **Save this connection string!** You'll need it for Vercel environment variables

6. **Seed Your Database**
   - You can run the seed script locally pointing to Atlas, or we'll create a script to seed after deployment

---

## Step 2: Prepare Your Code for Deployment

### 2.1 Update Backend for Vercel Serverless

The backend needs to export the Express app for Vercel's serverless functions. Update `backend/server.js`:

```javascript
// At the end of server.js, export the app instead of listening
module.exports = app;
```

### 2.2 Create .gitignore (if not exists)

Make sure `.env` files are ignored:
```
.env
.env.local
node_modules/
```

---

## Step 3: Deploy Backend to Vercel

1. **Install Vercel CLI** (optional, but recommended)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   cd backend
   vercel login
   ```

3. **Deploy Backend**
   ```bash
   cd backend
   vercel
   ```
   - Follow the prompts:
     - Set up and deploy? **Yes**
     - Which scope? **Your account**
     - Link to existing project? **No**
     - Project name? **aura-backend** (or your choice)
     - Directory? **./** (current directory)
     - Override settings? **No**

4. **Set Environment Variables**
   - After first deployment, go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your backend project
   - Go to "Settings" → "Environment Variables"
   - Add these variables:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Any random secret string (e.g., `aura_secret_key_production_2024`)
   - **Redeploy** after adding environment variables

5. **Get Backend URL**
   - After deployment, Vercel will give you a URL like: `https://aura-backend.vercel.app`
   - Copy this URL - you'll need it for the frontend

---

## Step 4: Deploy Frontend to Vercel

1. **Deploy Frontend**
   ```bash
   cd frontend
   vercel
   ```
   - Follow the prompts:
     - Set up and deploy? **Yes**
     - Which scope? **Your account**
     - Link to existing project? **No**
     - Project name? **aura-frontend** (or your choice)
     - Directory? **./** (current directory)
     - Override settings? **No**

2. **Set Environment Variables**
   - Go to your frontend project in Vercel dashboard
   - Go to "Settings" → "Environment Variables"
   - Add:
     - `REACT_APP_API_URL`: Your backend URL (e.g., `https://aura-backend.vercel.app`)
   - **Redeploy** after adding environment variables

3. **Update Build Settings** (if needed)
   - Go to "Settings" → "General"
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

---

## Step 5: Seed the Database

After deployment, you need to seed resources:

1. **Option A: Update seed script to use environment variable**
   - The seed script should already work with `MONGO_URI` from environment
   - Run locally: `MONGO_URI="your-atlas-connection-string" npm run seed` (in backend folder)

2. **Option B: Create a seed API endpoint** (recommended)
   - Create a one-time endpoint to seed data
   - Call it once after deployment

---

## Step 6: Test Your Deployment

1. Visit your frontend URL (e.g., `https://aura-frontend.vercel.app`)
2. Try registering a new user
3. Test creating a booking
4. Verify all features work

---

## Troubleshooting

### Backend Issues

- **MongoDB Connection Errors**: 
  - Verify MongoDB Atlas network access allows all IPs (0.0.0.0/0)
  - Check connection string format
  - Ensure password is URL-encoded if it contains special characters

- **CORS Errors**:
  - Make sure CORS is enabled in backend (`app.use(cors())`)
  - Check that frontend URL is allowed

- **Environment Variables Not Working**:
  - Redeploy after adding environment variables
  - Check variable names match exactly (case-sensitive)

### Frontend Issues

- **API Calls Failing**:
  - Verify `REACT_APP_API_URL` is set correctly
  - Check browser console for errors
  - Ensure backend URL is accessible

- **Build Failures**:
  - Check build logs in Vercel dashboard
  - Ensure all dependencies are in `package.json`
  - Check for TypeScript/ESLint errors

---

## Quick Reference

### Backend Environment Variables:
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: Secret key for JWT tokens

### Frontend Environment Variables:
- `REACT_APP_API_URL`: Backend deployment URL

### Important URLs:
- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com

---

## Next Steps After Deployment

1. **Set up custom domains** (optional)
2. **Enable analytics** in Vercel dashboard
3. **Set up monitoring** for errors
4. **Seed initial resources** using the seed script
5. **Test all features** thoroughly

---

## Notes

- Vercel free tier includes:
  - Unlimited deployments
  - 100GB bandwidth/month
  - Serverless functions with 10s timeout (may need to optimize for long operations)
  
- MongoDB Atlas free tier includes:
  - 512MB storage
  - Shared RAM and vCPU
  - Perfect for development/testing

Good luck with your deployment! 🚀

