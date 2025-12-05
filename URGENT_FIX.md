# 🚨 URGENT FIX - MongoDB Connection Timeout

## The Problem

You're getting this error:
```
Operation `resources.find()` buffering timed out after 10000ms
```

This happens because:
1. **Your connection string is missing the database name** (`/aura`)
2. **Your connection string has wrong parameters** (`?appName=Cluster0`)

## ✅ IMMEDIATE FIX

### Step 1: Fix MongoDB Connection String in Vercel

1. Go to **Vercel Dashboard** → Your **Backend Project**
2. Go to **Settings** → **Environment Variables**
3. Find `MONGO_URI` and click **Edit**

**Current (WRONG):**
```
mongodb+srv://aura-user:Micro69soft@cluster0.nc3c4ep.mongodb.net/?appName=Cluster0
```

**Change to (CORRECT):**
```
mongodb+srv://aura-user:Micro69soft@cluster0.nc3c4ep.mongodb.net/aura?retryWrites=true&w=majority
```

**Important changes:**
- Added `/aura` before the `?` (this is the database name)
- Changed `?appName=Cluster0` to `?retryWrites=true&w=majority`

4. Click **Save**

### Step 2: Redeploy Backend

1. Go to **Deployments** tab
2. Click the **three dots** (...) on the latest deployment
3. Click **Redeploy**
4. Wait 2-3 minutes

### Step 3: Test Again

1. Open: `https://your-backend-url.vercel.app/api/resources`
2. Should now return `[]` (empty array) or resources

---

## Why This Happens

MongoDB needs to know:
1. **Which database to use** - that's the `/aura` part
2. **Connection options** - `retryWrites=true&w=majority` ensures proper connection

Without the database name, MongoDB doesn't know where to store/retrieve data, causing timeouts.

---

## After Fixing

Once you update the connection string and redeploy:

1. **Test backend:** `https://your-backend-url.vercel.app/api/resources`
2. **Should return:** `[]` or array of resources (no timeout error)
3. **Try login** on your frontend

---

## Connection String Format

**Correct format:**
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority
```

**Your correct string:**
```
mongodb+srv://aura-user:Micro69soft@cluster0.nc3c4ep.mongodb.net/aura?retryWrites=true&w=majority
```

**Parts:**
- `aura-user` = your username
- `Micro69soft` = your password
- `cluster0.nc3c4ep.mongodb.net` = your cluster address
- `aura` = database name (IMPORTANT!)
- `?retryWrites=true&w=majority` = connection options

---

## Quick Checklist

- [ ] Updated `MONGO_URI` in Vercel backend environment variables
- [ ] Added `/aura` database name
- [ ] Changed to `?retryWrites=true&w=majority`
- [ ] Saved the environment variable
- [ ] Redeployed backend
- [ ] Tested backend URL - no timeout error

---

**This is the fix! Update the connection string and redeploy.** 🎯

