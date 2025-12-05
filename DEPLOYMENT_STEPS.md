# Quick Deployment Steps for AURA on Vercel

## Prerequisites Checklist
- [ ] GitHub account
- [ ] Code pushed to GitHub repository
- [ ] Vercel account (sign up at vercel.com)
- [ ] MongoDB Atlas account (sign up at mongodb.com/cloud/atlas)

---

## Part 1: MongoDB Atlas Setup (5 minutes)

1. **Create MongoDB Atlas Account**
   - Visit: https://www.mongodb.com/cloud/atlas
   - Click "Try Free" and sign up

2. **Create Free Cluster**
   - Click "Build a Database"
   - Select "M0 FREE" tier
   - Choose a cloud provider (AWS recommended)
   - Select a region close to you
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" → "Add New Database User"
   - Authentication: Password
   - Username: `aura-admin` (or your choice)
   - Password: Create a strong password (SAVE IT!)
   - Database User Privileges: "Atlas admin"
   - Click "Add User"

4. **Allow Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `aura`
   - Example: `mongodb+srv://aura-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aura?retryWrites=true&w=majority`
   - **SAVE THIS STRING** - You'll need it in Step 3

---

## Part 2: Deploy Backend (10 minutes)

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click "Add New..." → "Project"

2. **Import GitHub Repository**
   - Connect your GitHub account if not already connected
   - Select your AURA repository
   - Click "Import"

3. **Configure Backend Project**
   - **Root Directory**: Select `backend` folder
   - **Framework Preset**: Other
   - **Build Command**: Leave empty (or `npm install`)
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`

4. **Add Environment Variables**
   - Click "Environment Variables"
   - Add these variables:
     ```
     MONGO_URI = mongodb+srv://aura-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aura?retryWrites=true&w=majority
     JWT_SECRET = aura_secret_key_production_2024_change_this
     ```
   - Make sure to select "Production", "Preview", and "Development"
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (2-3 minutes)
   - **Copy the deployment URL** (e.g., `https://aura-backend-xxxxx.vercel.app`)

### Option B: Using Vercel CLI

```bash
cd backend
npm install -g vercel
vercel login
vercel
# Follow prompts, then:
vercel env add MONGO_URI
vercel env add JWT_SECRET
vercel --prod
```

---

## Part 3: Deploy Frontend (10 minutes)

1. **Create New Project in Vercel**
   - In Vercel Dashboard, click "Add New..." → "Project"
   - Select the same GitHub repository
   - Click "Import"

2. **Configure Frontend Project**
   - **Root Directory**: Select `frontend` folder
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build` (should auto-detect)
   - **Output Directory**: `build` (should auto-detect)
   - **Install Command**: `npm install`

3. **Add Environment Variable**
   - Click "Environment Variables"
   - Add:
     ```
     REACT_APP_API_URL = https://aura-backend-xxxxx.vercel.app
     ```
     (Replace with your actual backend URL from Part 2)
   - Select "Production", "Preview", and "Development"
   - Click "Save"

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment (3-5 minutes)
   - **Copy the frontend URL** (e.g., `https://aura-frontend-xxxxx.vercel.app`)

---

## Part 4: Seed Database (5 minutes)

After both deployments are complete:

1. **Option A: Run Seed Script Locally**
   ```bash
   cd backend
   # Set MONGO_URI to your Atlas connection string
   MONGO_URI="mongodb+srv://aura-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/aura?retryWrites=true&w=majority" npm run seed
   ```

2. **Option B: Create Seed API Endpoint** (if Option A doesn't work)
   - We can create a temporary endpoint to seed data
   - Call it once, then remove it

---

## Part 5: Test Your Deployment

1. **Visit Frontend URL**
   - Open your frontend URL in browser
   - Example: `https://aura-frontend-xxxxx.vercel.app`

2. **Test Features**
   - [ ] Register a new user
   - [ ] Login
   - [ ] View dashboard
   - [ ] Create a booking
   - [ ] View calendar
   - [ ] View my bookings

3. **Check Backend Logs**
   - Go to Vercel Dashboard → Your Backend Project → "Deployments" → Click latest deployment → "Functions" tab
   - Check for any errors

---

## Troubleshooting

### Backend Not Connecting to MongoDB
- Verify MongoDB Atlas network access allows 0.0.0.0/0
- Check connection string format (no spaces, correct password)
- Check Vercel environment variables are set correctly
- Redeploy after changing environment variables

### Frontend Can't Reach Backend
- Verify `REACT_APP_API_URL` is set correctly
- Check backend URL is accessible (open in browser)
- Check browser console for CORS errors
- Ensure backend has `app.use(cors())` enabled

### Build Failures
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Check for syntax errors in code

### Environment Variables Not Working
- Redeploy after adding/changing environment variables
- Variable names are case-sensitive
- For React, variables must start with `REACT_APP_`

---

## Quick Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Your Frontend**: (will be provided after deployment)
- **Your Backend**: (will be provided after deployment)

---

## Important Notes

1. **Keep MongoDB Atlas connection string secure** - Don't commit it to GitHub
2. **Backend URL changes** - If you redeploy backend, update frontend's `REACT_APP_API_URL`
3. **Free Tier Limits**:
   - Vercel: 100GB bandwidth/month, serverless functions with 10s timeout
   - MongoDB Atlas: 512MB storage, shared resources

---

## Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database seeded with resources
- [ ] Can register new users
- [ ] Can create bookings
- [ ] All features working

**Once everything works, share your frontend URL with your instructor!** 🎉

