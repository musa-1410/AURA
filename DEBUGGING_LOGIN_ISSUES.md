# Debugging Login Issues on Vercel

## Common Issues and Solutions

### Issue 1: MongoDB Connection String Missing Database Name

**Problem:** Your connection string is:
```
mongodb+srv://aura-user:Micro69soft@cluster0.nc3c4ep.mongodb.net/?appName=Cluster0
```

**Solution:** It should be:
```
mongodb+srv://aura-user:Micro69soft@cluster0.nc3c4ep.mongodb.net/aura?retryWrites=true&w=majority
```

**Fix:**
1. Go to Vercel Dashboard → Your Backend Project
2. Go to Settings → Environment Variables
3. Edit `MONGO_URI`
4. Change to: `mongodb+srv://aura-user:Micro69soft@cluster0.nc3c4ep.mongodb.net/aura?retryWrites=true&w=majority`
5. Click "Save"
6. **Redeploy** the backend project

---

### Issue 2: Frontend Not Pointing to Backend

**Check:**
1. Go to Vercel Dashboard → Your Frontend Project
2. Go to Settings → Environment Variables
3. Verify `REACT_APP_API_URL` is set to your backend URL
4. Example: `https://aura-backend-xxxxx.vercel.app` (no trailing slash)
5. If missing or wrong, add/update it and **Redeploy**

---

### Issue 3: Check Browser Console

1. Open your frontend URL in browser
2. Press F12 to open Developer Tools
3. Go to "Console" tab
4. Try to login
5. Look for errors - they will tell you what's wrong

**Common errors:**
- `Network Error` or `Failed to fetch` → Backend URL is wrong or backend is down
- `401 Unauthorized` → User doesn't exist or password is wrong
- `CORS error` → Backend CORS not configured properly
- `500 Internal Server Error` → Backend error (check Vercel logs)

---

### Issue 4: Check Backend Logs

1. Go to Vercel Dashboard → Your Backend Project
2. Click on "Deployments" tab
3. Click on the latest deployment
4. Click on "Functions" tab
5. Look for any errors in the logs

**Common errors:**
- `MongoDB connection error` → Connection string is wrong
- `JWT_SECRET is undefined` → Environment variable not set
- `User not found` → User doesn't exist in database

---

### Issue 5: Test Backend Directly

Test if your backend is working:

1. **Test if backend is accessible:**
   - Open: `https://your-backend-url.vercel.app/api/resources`
   - Should return JSON with resources or empty array

2. **Test login endpoint:**
   - Use Postman or curl:
   ```bash
   curl -X POST https://your-backend-url.vercel.app/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"test123"}'
   ```

3. **If backend doesn't respond:**
   - Check deployment status
   - Check environment variables
   - Redeploy backend

---

### Issue 6: User Doesn't Exist

If you haven't registered a user yet:

1. Try registering first (Register button on login page)
2. Then try logging in with those credentials

---

## Step-by-Step Fix

### Step 1: Fix MongoDB Connection String

1. Go to Vercel → Backend Project → Settings → Environment Variables
2. Update `MONGO_URI` to:
   ```
   mongodb+srv://aura-user:Micro69soft@cluster0.nc3c4ep.mongodb.net/aura?retryWrites=true&w=majority
   ```
3. Click "Save"
4. Go to "Deployments" → Click "..." on latest deployment → "Redeploy"

### Step 2: Verify Frontend Environment Variable

1. Go to Vercel → Frontend Project → Settings → Environment Variables
2. Check `REACT_APP_API_URL` is set to your backend URL
3. Example: `https://aura-backend-xxxxx.vercel.app`
4. If wrong, update and redeploy frontend

### Step 3: Verify JWT_SECRET is Set

1. Go to Vercel → Backend Project → Settings → Environment Variables
2. Verify `JWT_SECRET` exists
3. If not, add it: `aura_secret_key_production_2024`
4. Redeploy backend

### Step 4: Test Again

1. Clear browser cache (Ctrl+Shift+Delete)
2. Open frontend URL
3. Try registering a new user first
4. Then try logging in

---

## Quick Test Commands

### Test Backend Connection:
```bash
curl https://your-backend-url.vercel.app/api/resources
```

### Test Login:
```bash
curl -X POST https://your-backend-url.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","password":"your-password"}'
```

---

## Most Likely Issue

Based on your connection string, **Issue 1** is most likely:
- Your MongoDB connection string is missing `/aura` database name
- Fix it in Vercel environment variables
- Redeploy backend
- Try again

